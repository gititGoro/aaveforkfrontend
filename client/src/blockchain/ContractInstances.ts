import { MockFlashLoanReceiver } from './typechain-types/ethers/MockFlashLoanReceiver'
import { MockAggregatorBat } from './typechain-types/ethers/MockAggregatorBat'
import { MockAggregatorDai } from './typechain-types/ethers/MockAggregatorDai'
import { MockAggregatorKnc } from './typechain-types/ethers/MockAggregatorKnc'
import { MockAggregatorLend } from './typechain-types/ethers/MockAggregatorLend'
import { MockAggregatorLink } from './typechain-types/ethers/MockAggregatorLink'
import { MockAggregatorMana } from './typechain-types/ethers/MockAggregatorMana'
import { MockAggregatorMkr } from './typechain-types/ethers/MockAggregatorMkr'
import { MockAggregatorRep } from './typechain-types/ethers/MockAggregatorRep'
import { MockAggregatorSusd } from './typechain-types/ethers/MockAggregatorSusd'
import { MockAggregatorTusd } from './typechain-types/ethers/MockAggregatorTusd'
import { MockAggregatorUsdc } from './typechain-types/ethers/MockAggregatorUsdc'
import { MockAggregatorUsdt } from './typechain-types/ethers/MockAggregatorUsdt'
import { MockAggregatorWbtc } from './typechain-types/ethers/MockAggregatorWbtc'
import { MockAggregatorZrx } from './typechain-types/ethers/MockAggregatorZrx'
import { PriceOracle } from './typechain-types/ethers/PriceOracle'
import {LendingRateOracle} from './typechain-types/ethers/LendingRateOracle'
import {LendingPool} from './typechain-types/ethers/LendingPool'
import {LendingPoolConfigurator} from './typechain-types/ethers/LendingPoolConfigurator'
import {LendingPoolCore} from './typechain-types/ethers/LendingPoolCore'
import {LendingPoolDataProvider} from './typechain-types/ethers/LendingPoolDataProvider'
import {LendingPoolLiquidationManager} from './typechain-types/ethers/LendingPoolLiquidationManager'
import {FeeProvider} from './typechain-types/ethers/FeeProvider'
import {TokenDistributor} from './typechain-types/ethers/TokenDistributor'
import {LendingPoolParametersProvider} from './typechain-types/ethers/LendingPoolParametersProvider'
import {LendingPoolAddressesProvider} from './typechain-types/ethers/LendingPoolAddressesProvider'
import {Erc20} from './typechain-types/ethers/Erc20'

export default interface Contracts {
    MockFlashLoadnReceiver: MockFlashLoanReceiver
    MockAggregatorBat:MockAggregatorBat
    MockAggregatorDai:MockAggregatorDai
    MockAggregatorKnc: MockAggregatorKnc
    MockAggregatorLend: MockAggregatorLend
    MockAggregatorLink: MockAggregatorLink
    MockAggregatorMana: MockAggregatorMana
    MockAggregatorMkr: MockAggregatorMkr
    MockAggregatorRep: MockAggregatorRep
    MockAggregatorSusd: MockAggregatorSusd
    MockAggregatorTusd: MockAggregatorTusd
    MockAggregatorUsdc: MockAggregatorUsdc
    MockAggregatorUsdt: MockAggregatorUsdt
    MockAggregatorWbtc: MockAggregatorWbtc
    MockAggregatorZrx: MockAggregatorZrx
    PriceOracle:PriceOracle
    LendingRateOracle:LendingRateOracle
    // DefaultReserveInterestRateStrategy:DefaultReserveInterestRateStrategy -- deploy for each reserve
    LendingPool:LendingPool
    LendingPoolConfigurator:LendingPoolConfigurator
    LendingPoolCore:LendingPoolCore
    LendingPoolDataProvider:LendingPoolDataProvider
    LendingPoolLiquidationManager:LendingPoolLiquidationManager
    FeeProvider:FeeProvider
    TokenDistributor:TokenDistributor
    LendingPoolParametersProvider:LendingPoolParametersProvider
    LendingPoolAddressesProvider:LendingPoolAddressesProvider
}

export type ERC20 = Erc20