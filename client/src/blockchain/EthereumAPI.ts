import { ethers } from "ethers"
import ContractInstances from "./ContractInstances"
import *  as contracts from './typechain-types/ethers'
import addresses from './deployedAddresses.json'
import { LendingPoolCoreLibraryAddresses } from './typechain-types/ethers/LendingPoolCoreFactory'

export interface ethersMetamask {
    provider: ethers.providers.Web3Provider,
    signer: ethers.Signer
}

interface ethersResult {
    metamask?: ethersMetamask
    success: boolean
    error: '' | 'Metamask not present' | 'No Ethereum wallet detected'
}

export function GetEthers(window: any): ethersResult {
    let result: ethersResult = {
        success: false,
        error: 'No Ethereum wallet detected'
    }

    if (!window.ethereum)
        return result

    if (!window.isMetaMask) {
        result.error = 'Metamask not present'
        return result
    }
    result.success = true

    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const signer = provider.getSigner()
    result.metamask = {
        provider, signer
    }
    return result
}

export async function GetContracts(signer:ethers.Signer, network:string):Promise<ContractInstances>{
    const lendingPoolAddressProvider = new contracts.LendingPoolAddressesProviderFactory(signer).attach(addresses[network]["LendingPoolAddressProvider"])
   
    //an ethers oddity that is necessary
    const libraryAddress:LendingPoolCoreLibraryAddresses = {
        ["__CoreLibrary___________________________"]:"0x98Bc70e12eCd10Bf7dd52c27003703A6F96bBFF5"
    }

    return {
        LendingPoolAddressesProvider:lendingPoolAddressProvider,
        LendingPoolConfigurator : new contracts.LendingPoolConfiguratorFactory(signer).attach(await lendingPoolAddressProvider.getLendingPoolConfigurator()),
        MockFlashLoadnReceiver : new contracts.MockFlashLoanReceiverFactory(signer).attach(addresses[network]["MockFlashLoadnReceiver"]),
    MockAggregatorBat: new contracts.MockAggregatorBatFactory(signer).attach(addresses[network]["MockAggregatorBat"]),
    MockAggregatorDai: new contracts.MockAggregatorDaiFactory(signer).attach(addresses[network]["MockAggregatorDai"]),
    MockAggregatorKnc: new contracts.MockAggregatorKncFactory(signer).attach(addresses[network]["MockAggregatorKnc"]),
    MockAggregatorLend:new contracts.MockAggregatorLendFactory(signer).attach(addresses[network]["MockAggregatorLend"]),
    MockAggregatorLink: new contracts.MockAggregatorLinkFactory(signer).attach(addresses[network]["MockAggregatorLink"]),
    MockAggregatorMana: new contracts.MockAggregatorManaFactory(signer).attach(addresses[network]["MockAggregatorMana"]),
    MockAggregatorMkr:new contracts.MockAggregatorMkrFactory(signer).attach(addresses[network]["MockAggregatorMkr"]),
    MockAggregatorRep: new contracts.MockAggregatorRepFactory(signer).attach(addresses[network]["MockAggregatorRep"]),
    MockAggregatorSusd: new contracts.MockAggregatorSusdFactory(signer).attach(addresses[network]["MockAggregatorSusd"]),
    MockAggregatorTusd: new contracts.MockAggregatorTusdFactory(signer).attach(addresses[network]["MockAggregatorTusd"]),
    MockAggregatorUsdc: new contracts.MockAggregatorUsdcFactory(signer).attach(addresses[network]["MockAggregatorUsdc"]),
    MockAggregatorUsdt: new contracts.MockAggregatorUsdtFactory(signer).attach(addresses[network]["MockAggregatorUsdt"]),
    MockAggregatorWbtc: new contracts.MockAggregatorWbtcFactory(signer).attach(addresses[network]["MockAggregatorWbtc"]),
    MockAggregatorZrx: new contracts.MockAggregatorZrxFactory(signer).attach(addresses[network]["MockAggregatorZrx"]),
    PriceOracle:new contracts.PriceOracleFactory(signer).attach(await lendingPoolAddressProvider.getPriceOracle()),
    LendingRateOracle:new contracts.LendingRateOracleFactory(signer).attach(await lendingPoolAddressProvider.getLendingRateOracle()),
    LendingPool:new contracts.LendingPoolFactory(signer).attach(await lendingPoolAddressProvider.getLendingPool()),
   
    LendingPoolCore:new contracts.LendingPoolCoreFactory(libraryAddress,signer).attach(await lendingPoolAddressProvider.getLendingPoolCore()),
    LendingPoolDataProvider :new contracts.LendingPoolDataProviderFactory(signer).attach(await lendingPoolAddressProvider.getLendingPoolDataProvider()),
    LendingPoolLiquidationManager:new contracts.LendingPoolLiquidationManagerFactory(signer).attach(await lendingPoolAddressProvider.getLendingPoolLiquidationManager()),
    FeeProvider :new contracts.FeeProviderFactory(signer).attach(await lendingPoolAddressProvider.getFeeProvider()),
    TokenDistributor :new contracts.TokenDistributorFactory(signer).attach(await lendingPoolAddressProvider.getTokenDistributor()),
    LendingPoolParametersProvider :new contracts.LendingPoolParametersProviderFactory(signer).attach(await lendingPoolAddressProvider.getLendingPoolParametersProvider())
    }
}

