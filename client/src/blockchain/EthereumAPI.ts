import { ethers } from "ethers"
import ContractInstances from "./ContractInstances"
import *  as contracts from './typechain-types/ethers'
import addresses from './deployedAddresses.json'
import { LendingPoolCoreLibraryAddresses } from './typechain-types/ethers/LendingPoolCoreFactory'
import BigNumber from "bignumber.js"

export const hexToNumString = (hex: string) => new BigNumber(hex).toString()
export const numToHex = (num: string) => ethers.utils.hexValue(num)
export const isHex = (value: string) => ethers.utils.isHexString(value)
export const weiToEth = (value: string) => ethers.utils.parseEther(value)

export interface ethersMetamask {
    provider: ethers.providers.Web3Provider,
    signer: ethers.Signer
}

type ethereumSendArguments = 'eth_accounts' | 'eth_chainId' | 'eth_requestAccounts'
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

export async function GetContracts(signer: ethers.Signer, network: string): Promise<ContractInstances> {
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
        LendingPoolParametersProvider
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
