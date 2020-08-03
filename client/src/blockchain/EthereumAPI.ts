import { ethers, BigNumber as ethersBigNumber } from "ethers"
import ContractInstances, { ERC20 } from "./ContractInstances"
import *  as contracts from './typechain-types/ethers'
import addresses from './deployedAddresses.json'
import { LendingPoolCoreLibraryAddresses } from './typechain-types/ethers/LendingPoolCoreFactory'
import BigNumber from "bignumber.js"
import { AToken } from './typechain-types/ethers/AToken'
import { PriceOracle } from './typechain-types/ethers/PriceOracle'
import { Ierc20DetailedBytes } from './typechain-types/ethers/Ierc20DetailedBytes'

const RAY = new BigNumber(10).pow(27)
const WAD = new BigNumber(10).pow(18)
const RAYstring = RAY.toString()
const WADstring = WAD.toString()
const UINTMAX = '115792089237316195423570985008687907853269984665640564039457584007913129639934'

declare global {
    interface String {
        fromRAY(): string
        fromWAD(): string
        asPercentage(): string
        truncBig(): string
        dropDecimals(): string
    }
}

function fixedPoint(precisionString: string) {
    return function () {
        //@ts-ignore
        const big = new BigNumber(this.toString())

        if (big.isNaN())
            return ""

        return big.div(precisionString).toString();
    }
}

String.prototype.fromRAY = fixedPoint(RAYstring)
String.prototype.fromWAD = fixedPoint(WADstring)
String.prototype.asPercentage = function () {
    const big = new BigNumber(this.toString())
    if (big.isNaN())
        throw "percentages only apply to numbers"

    return `${big.times(100)}%`
}
String.prototype.truncBig = function (): string {
    const big = new BigNumber(this.toString())
    return big.isNaN() ? this.toString() : big.decimalPlaces(4).toString()
}
String.prototype.dropDecimals = function (): string {
    if (this.indexOf('.'))
        return this.substring(0, this.indexOf('.'))
    return this.toString()
}

export const hexToNumString = (hex: string) => new BigNumber(hex).toString()
export const numToHex = (num: string) => ethers.utils.hexValue(num)
export const isHex = (value: string) => ethers.utils.isHexString(value)
export const weiToEth = (value: string) => ethers.utils.formatEther(value.toString())
export const ethToWei = (value: string): string => (
    new BigNumber(value)
        .times(WAD)
        .decimalPlaces(0)
        .toPrecision(value.length, BigNumber.ROUND_DOWN)
        .toString()
        .dropDecimals()
)
export const weiToEthString = (value: ethersBigNumber | string) => weiToEth(value.toString()).toString()
export const WadMul = (lhs: ethersBigNumber, rhs: ethersBigNumber) => {
    return lhs.mul(rhs).div(WAD.toString())
}
export interface ethersMetamask {
    provider: ethers.providers.Web3Provider,
    signer: ethers.Signer
}

type ethereumSendArguments = 'eth_accounts' | 'eth_chainId' | 'eth_requestAccounts' | 'disconnect'
type ethereumOnArguments = 'accountsChanged' | 'chainChanged'

interface requestParams {
    method: ethereumSendArguments
}

export interface injectedEthereum {
    send: (args: ethereumSendArguments) => Promise<any>
    on: (args: ethereumOnArguments, callback: (response: any) => any) => void
    isMetaMask: boolean
    request: (arg: requestParams) => Promise<any>
    enable: () => Promise<void>
}

type ethereumResult = 'Ethereum not injected into browser' | 'Metamask not present' | 'Ethereum found'

interface fetchEthereumResult {
    message: ethereumResult
    ethereum?: injectedEthereum
}

export function GetEthereum(window: any): fetchEthereumResult {
    let result: fetchEthereumResult = {
        message: 'Ethereum not injected into browser'
    }

    if (!window.ethereum)
        return result

    if (!window.ethereum.isMetaMask) {
        result.message = 'Metamask not present'
        return result;
    }

    result.message = 'Ethereum found'
    result.ethereum = window.ethereum
    return result
}

export function GetEthers(ethereum: injectedEthereum): ethersMetamask {
    const provider = new ethers.providers.Web3Provider(ethereum as any)
    const signer = provider.getSigner()
    return {
        provider, signer
    }
}

export function LoadERC20(address: string, signer: ethers.Signer): ERC20 {
    return new contracts.Erc20Factory(signer).attach(address)

}

export function LoadERC20Detailed(address: string, signer: ethers.Signer): Ierc20DetailedBytes {
    return new contracts.Ierc20DetailedBytesFactory(signer).attach(address)
}


export function LoadAToken(address: string, signer: ethers.Signer): AToken {
    return new contracts.ATokenFactory(signer).attach(address)
}

export async function GetPriceOracle(contractIntances: ContractInstances, signer: ethers.Signer): Promise<PriceOracle> {
    const priceOracleAddress = await contractIntances.LendingPoolAddressesProvider.getPriceOracle()
    return new contracts.PriceOracleFactory(signer).attach(priceOracleAddress)
}

export async function LendingPoolCoreApproved(tokenId: string, contractIntances: ContractInstances, signer: ethers.Signer): Promise<boolean> {
    if (tokenId === contractIntances.EthAddress)
        return true
    const token = LoadERC20(tokenId, signer)
    const userAddress = await signer.getAddress()
    const userBalance = await token.balanceOf(userAddress)
    const allowance = await token.allowance(userAddress, contractIntances.LendingPoolCore.address)
    return allowance.gte(userBalance)
}

export async function ApproveLendingPoolCore(tokenId: string, contractIntances: ContractInstances, signer: ethers.Signer): Promise<ethers.ContractTransaction | false> {
    if (tokenId === contractIntances.EthAddress)
        return false
    const token = LoadERC20(tokenId, signer)
    return token.approve(contractIntances.LendingPoolCore.address, UINTMAX)
}

export async function TokenAPY(reserveAddress: string, contracts: ContractInstances): Promise<string> {
    return (await contracts.LendingPoolCore.getReserveCurrentLiquidityRate(reserveAddress))
        .toString()
        .fromRAY()
        .asPercentage()
}

export async function getAvailableBorrows(reserveAddress: string, contracts: ContractInstances, wallet: ethersMetamask): Promise<string> {

    const oracle = await GetPriceOracle(contracts, wallet.signer)
    const account = await wallet.signer.getAddress()
    const userData = await contracts.LendingPoolDataProvider.getUserAccountData(account)
    const availableEthBorrows = userData.availableBorrowsETH.mul(WADstring)
    const ethPriceOfToken = await oracle?.getAssetPrice(reserveAddress)
    if (!ethPriceOfToken)
        return "price not set"
    if (ethPriceOfToken.isZero())
        return "price not set"

    const theoreticalTotalAvailable = availableEthBorrows.div(ethPriceOfToken)
    const reserveData = (await contracts.LendingPoolDataProvider.getReserveData(reserveAddress))
    const availableLiquidity = reserveData.availableLiquidity.toString()
    if (theoreticalTotalAvailable.gt(availableLiquidity)) {
        return availableLiquidity.fromWAD()
    }
    return theoreticalTotalAvailable
        .toString()
        .fromWAD()
}

export async function GetContracts(signer: ethers.Signer, network: string): Promise<ContractInstances | undefined> {
    if (Object.keys(addresses).filter(key => key === network).length === 0)
        return

    const lendingPoolAddressProvider = new contracts.LendingPoolAddressesProviderFactory(signer).attach(addresses[network]["LendingPoolAddressesProvider"])
    //an ethers oddity that is necessary
    const libraryAddress: LendingPoolCoreLibraryAddresses = {
        ["__CoreLibrary___________________________"]: "0x98Bc70e12eCd10Bf7dd52c27003703A6F96bBFF5"
    }
    let LendingPoolConfigurator = new contracts.LendingPoolConfiguratorFactory(signer).attach(await lendingPoolAddressProvider.getLendingPoolConfigurator())
    let MockFlashLoadnReceiver = new contracts.MockFlashLoanReceiverFactory(signer).attach(addresses[network]["MockFlashLoadnReceiver"])
    let MockAggregatorBat = new contracts.MockAggregatorBatFactory(signer).attach(addresses[network]["MockAggregatorBat"])
    let MockAggregatorDai = new contracts.MockAggregatorDaiFactory(signer).attach(addresses[network]["MockAggregatorDai"])
    let MockAggregatorKnc = new contracts.MockAggregatorKncFactory(signer).attach(addresses[network]["MockAggregatorKnc"])
    let MockAggregatorLend = new contracts.MockAggregatorLendFactory(signer).attach(addresses[network]["MockAggregatorLend"])
    let MockAggregatorLink = new contracts.MockAggregatorLinkFactory(signer).attach(addresses[network]["MockAggregatorLink"])
    let MockAggregatorMana = new contracts.MockAggregatorManaFactory(signer).attach(addresses[network]["MockAggregatorMana"])
    let MockAggregatorMkr = new contracts.MockAggregatorMkrFactory(signer).attach(addresses[network]["MockAggregatorMkr"])
    let MockAggregatorRep = new contracts.MockAggregatorRepFactory(signer).attach(addresses[network]["MockAggregatorRep"])
    let MockAggregatorSusd = new contracts.MockAggregatorSusdFactory(signer).attach(addresses[network]["MockAggregatorSusd"])
    let MockAggregatorTusd = new contracts.MockAggregatorTusdFactory(signer).attach(addresses[network]["MockAggregatorTusd"])
    let MockAggregatorUsdc = new contracts.MockAggregatorUsdcFactory(signer).attach(addresses[network]["MockAggregatorUsdc"])
    let MockAggregatorUsdt = new contracts.MockAggregatorUsdtFactory(signer).attach(addresses[network]["MockAggregatorUsdt"])
    let MockAggregatorWbtc = new contracts.MockAggregatorWbtcFactory(signer).attach(addresses[network]["MockAggregatorWbtc"])
    let MockAggregatorZrx = new contracts.MockAggregatorZrxFactory(signer).attach(addresses[network]["MockAggregatorZrx"])
    let PriceOracle = new contracts.PriceOracleFactory(signer).attach(await lendingPoolAddressProvider.getPriceOracle())
    let LendingRateOracle = new contracts.LendingRateOracleFactory(signer).attach(await lendingPoolAddressProvider.getLendingRateOracle())
    let LendingPool = new contracts.LendingPoolFactory(signer).attach(await lendingPoolAddressProvider.getLendingPool())

    let LendingPoolCore = new contracts.LendingPoolCoreFactory(libraryAddress, signer).attach(await lendingPoolAddressProvider.getLendingPoolCore())
    let LendingPoolDataProvider = new contracts.LendingPoolDataProviderFactory(signer).attach(await lendingPoolAddressProvider.getLendingPoolDataProvider())
    let LendingPoolLiquidationManager = new contracts.LendingPoolLiquidationManagerFactory(signer).attach(await lendingPoolAddressProvider.getLendingPoolLiquidationManager())
    let FeeProvider = new contracts.FeeProviderFactory(signer).attach(await lendingPoolAddressProvider.getFeeProvider())
    let TokenDistributor = new contracts.TokenDistributorFactory(signer).attach(await lendingPoolAddressProvider.getTokenDistributor())
    let LendingPoolParametersProvider = new contracts.LendingPoolParametersProviderFactory(signer).attach(await lendingPoolAddressProvider.getLendingPoolParametersProvider())

    return {
        LendingPoolAddressesProvider: lendingPoolAddressProvider,
        LendingPoolConfigurator,
        MockFlashLoadnReceiver,
        MockAggregatorBat,
        MockAggregatorDai,
        MockAggregatorKnc,
        MockAggregatorLend,
        MockAggregatorLink,
        MockAggregatorMana,
        MockAggregatorMkr,
        MockAggregatorRep,
        MockAggregatorSusd,
        MockAggregatorTusd,
        MockAggregatorUsdc,
        MockAggregatorUsdt,
        MockAggregatorWbtc,
        MockAggregatorZrx,
        PriceOracle,
        LendingRateOracle,
        LendingPool,
        LendingPoolCore,
        LendingPoolDataProvider,
        LendingPoolLiquidationManager,
        FeeProvider,
        TokenDistributor,
        LendingPoolParametersProvider,
        EthAddress: '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE'
    }
}

export enum Role {
    addressesProviderOwner,
    lendingPoolManager,
    superAdmin,
    user
}

export const GetRole = async (address: string, contracts: ContractInstances): Promise<Role> => {
    const isOwner = await contracts.LendingPoolAddressesProvider.isOwner({ from: address })
    const isLendingPoolManager = (await contracts.LendingPoolAddressesProvider.getLendingPoolManager()).toLowerCase() === address.toLowerCase()

    return isOwner && isLendingPoolManager ?
        Role.superAdmin :
        (!isOwner && !isLendingPoolManager ?
            Role.user :
            (!isOwner ? Role.lendingPoolManager : Role.addressesProviderOwner))
}

export type BlockchainTransaction = ethers.ContractTransaction
export type BlockchainReceipt = ethers.ContractReceipt