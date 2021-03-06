/* Generated by ts-generator ver. 0.0.8 */
/* tslint:disable */

import {
  ethers,
  EventFilter,
  Signer,
  BigNumber,
  BigNumberish,
  PopulatedTransaction
} from "ethers";
import {
  Contract,
  ContractTransaction,
  Overrides,
  CallOverrides
} from "@ethersproject/contracts";
import { BytesLike } from "@ethersproject/bytes";
import { Listener, Provider } from "@ethersproject/providers";
import { FunctionFragment, EventFragment, Result } from "@ethersproject/abi";

interface LendingPoolDataProviderInterface extends ethers.utils.Interface {
  functions: {
    "DATA_PROVIDER_REVISION()": FunctionFragment;
    "HEALTH_FACTOR_LIQUIDATION_THRESHOLD()": FunctionFragment;
    "addressesProvider()": FunctionFragment;
    "core()": FunctionFragment;
    "initialize(address)": FunctionFragment;
    "calculateUserGlobalData(address)": FunctionFragment;
    "balanceDecreaseAllowed(address,address,uint256)": FunctionFragment;
    "calculateCollateralNeededInETH(address,uint256,uint256,uint256,uint256,uint256)": FunctionFragment;
    "getHealthFactorLiquidationThreshold()": FunctionFragment;
    "getReserveConfigurationData(address)": FunctionFragment;
    "getReserveData(address)": FunctionFragment;
    "getUserAccountData(address)": FunctionFragment;
    "getUserReserveData(address,address)": FunctionFragment;
  };

  encodeFunctionData(
    functionFragment: "DATA_PROVIDER_REVISION",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "HEALTH_FACTOR_LIQUIDATION_THRESHOLD",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "addressesProvider",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "core", values?: undefined): string;
  encodeFunctionData(functionFragment: "initialize", values: [string]): string;
  encodeFunctionData(
    functionFragment: "calculateUserGlobalData",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "balanceDecreaseAllowed",
    values: [string, string, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "calculateCollateralNeededInETH",
    values: [
      string,
      BigNumberish,
      BigNumberish,
      BigNumberish,
      BigNumberish,
      BigNumberish
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "getHealthFactorLiquidationThreshold",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "getReserveConfigurationData",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "getReserveData",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "getUserAccountData",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "getUserReserveData",
    values: [string, string]
  ): string;

  decodeFunctionResult(
    functionFragment: "DATA_PROVIDER_REVISION",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "HEALTH_FACTOR_LIQUIDATION_THRESHOLD",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "addressesProvider",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "core", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "initialize", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "calculateUserGlobalData",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "balanceDecreaseAllowed",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "calculateCollateralNeededInETH",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getHealthFactorLiquidationThreshold",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getReserveConfigurationData",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getReserveData",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getUserAccountData",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getUserReserveData",
    data: BytesLike
  ): Result;

  events: {};
}

export class LendingPoolDataProvider extends Contract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  on(event: EventFilter | string, listener: Listener): this;
  once(event: EventFilter | string, listener: Listener): this;
  addListener(eventName: EventFilter | string, listener: Listener): this;
  removeAllListeners(eventName: EventFilter | string): this;
  removeListener(eventName: any, listener: Listener): this;

  interface: LendingPoolDataProviderInterface;

  functions: {
    DATA_PROVIDER_REVISION(
      overrides?: CallOverrides
    ): Promise<{
      0: BigNumber;
    }>;

    HEALTH_FACTOR_LIQUIDATION_THRESHOLD(
      overrides?: CallOverrides
    ): Promise<{
      0: BigNumber;
    }>;

    addressesProvider(
      overrides?: CallOverrides
    ): Promise<{
      0: string;
    }>;

    core(
      overrides?: CallOverrides
    ): Promise<{
      0: string;
    }>;

    initialize(
      _addressesProvider: string,
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    /**
     * calculates the user data across the reserves. this includes the total liquidity/collateral/borrow balances in ETH, the average Loan To Value, the average Liquidation Ratio, and the Health factor.
     * @param _user the address of the user
     * @returns the total liquidity, total collateral, total borrow balances of the user in ETH. also the average Ltv, liquidation threshold, and the health factor*
     */
    calculateUserGlobalData(
      _user: string,
      overrides?: CallOverrides
    ): Promise<{
      totalLiquidityBalanceETH: BigNumber;
      totalCollateralBalanceETH: BigNumber;
      totalBorrowBalanceETH: BigNumber;
      totalFeesETH: BigNumber;
      currentLtv: BigNumber;
      currentLiquidationThreshold: BigNumber;
      healthFactor: BigNumber;
      healthFactorBelowThreshold: boolean;
      0: BigNumber;
      1: BigNumber;
      2: BigNumber;
      3: BigNumber;
      4: BigNumber;
      5: BigNumber;
      6: BigNumber;
      7: boolean;
    }>;

    /**
     * check if a specific balance decrease is allowed (i.e. doesn't bring the user borrow position health factor under 1e18)
     * @param _amount the amount to decrease
     * @param _reserve the address of the reserve
     * @param _user the address of the user
     * @returns true if the decrease of the balance is allowed*
     */
    balanceDecreaseAllowed(
      _reserve: string,
      _user: string,
      _amount: BigNumberish,
      overrides?: CallOverrides
    ): Promise<{
      0: boolean;
    }>;

    /**
     * calculates the amount of collateral needed in ETH to cover a new borrow.
     * @param _amount the amount the user wants to borrow
     * @param _fee the fee for the amount that the user needs to cover
     * @param _reserve the reserve from which the user wants to borrow
     * @param _userCurrentBorrowBalanceTH the current borrow balance of the user (before the borrow)
     * @param _userCurrentLtv the average ltv of the user given his current collateral
     * @returns the total amount of collateral in ETH to cover the current borrow balance + the new amount + fee*
     */
    calculateCollateralNeededInETH(
      _reserve: string,
      _amount: BigNumberish,
      _fee: BigNumberish,
      _userCurrentBorrowBalanceTH: BigNumberish,
      _userCurrentFeesETH: BigNumberish,
      _userCurrentLtv: BigNumberish,
      overrides?: CallOverrides
    ): Promise<{
      0: BigNumber;
    }>;

    /**
     * returns the health factor liquidation threshold*
     */
    getHealthFactorLiquidationThreshold(
      overrides?: CallOverrides
    ): Promise<{
      0: BigNumber;
    }>;

    /**
     * accessory functions to fetch data from the lendingPoolCore*
     */
    getReserveConfigurationData(
      _reserve: string,
      overrides?: CallOverrides
    ): Promise<{
      ltv: BigNumber;
      liquidationThreshold: BigNumber;
      liquidationBonus: BigNumber;
      rateStrategyAddress: string;
      usageAsCollateralEnabled: boolean;
      borrowingEnabled: boolean;
      stableBorrowRateEnabled: boolean;
      isActive: boolean;
      0: BigNumber;
      1: BigNumber;
      2: BigNumber;
      3: string;
      4: boolean;
      5: boolean;
      6: boolean;
      7: boolean;
    }>;

    getReserveData(
      _reserve: string,
      overrides?: CallOverrides
    ): Promise<{
      totalLiquidity: BigNumber;
      availableLiquidity: BigNumber;
      totalBorrowsStable: BigNumber;
      totalBorrowsVariable: BigNumber;
      liquidityRate: BigNumber;
      variableBorrowRate: BigNumber;
      stableBorrowRate: BigNumber;
      averageStableBorrowRate: BigNumber;
      utilizationRate: BigNumber;
      liquidityIndex: BigNumber;
      variableBorrowIndex: BigNumber;
      aTokenAddress: string;
      lastUpdateTimestamp: number;
      0: BigNumber;
      1: BigNumber;
      2: BigNumber;
      3: BigNumber;
      4: BigNumber;
      5: BigNumber;
      6: BigNumber;
      7: BigNumber;
      8: BigNumber;
      9: BigNumber;
      10: BigNumber;
      11: string;
      12: number;
    }>;

    getUserAccountData(
      _user: string,
      overrides?: CallOverrides
    ): Promise<{
      totalLiquidityETH: BigNumber;
      totalCollateralETH: BigNumber;
      totalBorrowsETH: BigNumber;
      totalFeesETH: BigNumber;
      availableBorrowsETH: BigNumber;
      currentLiquidationThreshold: BigNumber;
      ltv: BigNumber;
      healthFactor: BigNumber;
      0: BigNumber;
      1: BigNumber;
      2: BigNumber;
      3: BigNumber;
      4: BigNumber;
      5: BigNumber;
      6: BigNumber;
      7: BigNumber;
    }>;

    getUserReserveData(
      _reserve: string,
      _user: string,
      overrides?: CallOverrides
    ): Promise<{
      currentATokenBalance: BigNumber;
      currentBorrowBalance: BigNumber;
      principalBorrowBalance: BigNumber;
      borrowRateMode: BigNumber;
      borrowRate: BigNumber;
      liquidityRate: BigNumber;
      originationFee: BigNumber;
      variableBorrowIndex: BigNumber;
      lastUpdateTimestamp: BigNumber;
      usageAsCollateralEnabled: boolean;
      0: BigNumber;
      1: BigNumber;
      2: BigNumber;
      3: BigNumber;
      4: BigNumber;
      5: BigNumber;
      6: BigNumber;
      7: BigNumber;
      8: BigNumber;
      9: boolean;
    }>;
  };

  DATA_PROVIDER_REVISION(overrides?: CallOverrides): Promise<BigNumber>;

  HEALTH_FACTOR_LIQUIDATION_THRESHOLD(
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  addressesProvider(overrides?: CallOverrides): Promise<string>;

  core(overrides?: CallOverrides): Promise<string>;

  initialize(
    _addressesProvider: string,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  /**
   * calculates the user data across the reserves. this includes the total liquidity/collateral/borrow balances in ETH, the average Loan To Value, the average Liquidation Ratio, and the Health factor.
   * @param _user the address of the user
   * @returns the total liquidity, total collateral, total borrow balances of the user in ETH. also the average Ltv, liquidation threshold, and the health factor*
   */
  calculateUserGlobalData(
    _user: string,
    overrides?: CallOverrides
  ): Promise<{
    totalLiquidityBalanceETH: BigNumber;
    totalCollateralBalanceETH: BigNumber;
    totalBorrowBalanceETH: BigNumber;
    totalFeesETH: BigNumber;
    currentLtv: BigNumber;
    currentLiquidationThreshold: BigNumber;
    healthFactor: BigNumber;
    healthFactorBelowThreshold: boolean;
    0: BigNumber;
    1: BigNumber;
    2: BigNumber;
    3: BigNumber;
    4: BigNumber;
    5: BigNumber;
    6: BigNumber;
    7: boolean;
  }>;

  /**
   * check if a specific balance decrease is allowed (i.e. doesn't bring the user borrow position health factor under 1e18)
   * @param _amount the amount to decrease
   * @param _reserve the address of the reserve
   * @param _user the address of the user
   * @returns true if the decrease of the balance is allowed*
   */
  balanceDecreaseAllowed(
    _reserve: string,
    _user: string,
    _amount: BigNumberish,
    overrides?: CallOverrides
  ): Promise<boolean>;

  /**
   * calculates the amount of collateral needed in ETH to cover a new borrow.
   * @param _amount the amount the user wants to borrow
   * @param _fee the fee for the amount that the user needs to cover
   * @param _reserve the reserve from which the user wants to borrow
   * @param _userCurrentBorrowBalanceTH the current borrow balance of the user (before the borrow)
   * @param _userCurrentLtv the average ltv of the user given his current collateral
   * @returns the total amount of collateral in ETH to cover the current borrow balance + the new amount + fee*
   */
  calculateCollateralNeededInETH(
    _reserve: string,
    _amount: BigNumberish,
    _fee: BigNumberish,
    _userCurrentBorrowBalanceTH: BigNumberish,
    _userCurrentFeesETH: BigNumberish,
    _userCurrentLtv: BigNumberish,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  /**
   * returns the health factor liquidation threshold*
   */
  getHealthFactorLiquidationThreshold(
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  /**
   * accessory functions to fetch data from the lendingPoolCore*
   */
  getReserveConfigurationData(
    _reserve: string,
    overrides?: CallOverrides
  ): Promise<{
    ltv: BigNumber;
    liquidationThreshold: BigNumber;
    liquidationBonus: BigNumber;
    rateStrategyAddress: string;
    usageAsCollateralEnabled: boolean;
    borrowingEnabled: boolean;
    stableBorrowRateEnabled: boolean;
    isActive: boolean;
    0: BigNumber;
    1: BigNumber;
    2: BigNumber;
    3: string;
    4: boolean;
    5: boolean;
    6: boolean;
    7: boolean;
  }>;

  getReserveData(
    _reserve: string,
    overrides?: CallOverrides
  ): Promise<{
    totalLiquidity: BigNumber;
    availableLiquidity: BigNumber;
    totalBorrowsStable: BigNumber;
    totalBorrowsVariable: BigNumber;
    liquidityRate: BigNumber;
    variableBorrowRate: BigNumber;
    stableBorrowRate: BigNumber;
    averageStableBorrowRate: BigNumber;
    utilizationRate: BigNumber;
    liquidityIndex: BigNumber;
    variableBorrowIndex: BigNumber;
    aTokenAddress: string;
    lastUpdateTimestamp: number;
    0: BigNumber;
    1: BigNumber;
    2: BigNumber;
    3: BigNumber;
    4: BigNumber;
    5: BigNumber;
    6: BigNumber;
    7: BigNumber;
    8: BigNumber;
    9: BigNumber;
    10: BigNumber;
    11: string;
    12: number;
  }>;

  getUserAccountData(
    _user: string,
    overrides?: CallOverrides
  ): Promise<{
    totalLiquidityETH: BigNumber;
    totalCollateralETH: BigNumber;
    totalBorrowsETH: BigNumber;
    totalFeesETH: BigNumber;
    availableBorrowsETH: BigNumber;
    currentLiquidationThreshold: BigNumber;
    ltv: BigNumber;
    healthFactor: BigNumber;
    0: BigNumber;
    1: BigNumber;
    2: BigNumber;
    3: BigNumber;
    4: BigNumber;
    5: BigNumber;
    6: BigNumber;
    7: BigNumber;
  }>;

  getUserReserveData(
    _reserve: string,
    _user: string,
    overrides?: CallOverrides
  ): Promise<{
    currentATokenBalance: BigNumber;
    currentBorrowBalance: BigNumber;
    principalBorrowBalance: BigNumber;
    borrowRateMode: BigNumber;
    borrowRate: BigNumber;
    liquidityRate: BigNumber;
    originationFee: BigNumber;
    variableBorrowIndex: BigNumber;
    lastUpdateTimestamp: BigNumber;
    usageAsCollateralEnabled: boolean;
    0: BigNumber;
    1: BigNumber;
    2: BigNumber;
    3: BigNumber;
    4: BigNumber;
    5: BigNumber;
    6: BigNumber;
    7: BigNumber;
    8: BigNumber;
    9: boolean;
  }>;

  callStatic: {
    DATA_PROVIDER_REVISION(overrides?: CallOverrides): Promise<BigNumber>;

    HEALTH_FACTOR_LIQUIDATION_THRESHOLD(
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    addressesProvider(overrides?: CallOverrides): Promise<string>;

    core(overrides?: CallOverrides): Promise<string>;

    initialize(
      _addressesProvider: string,
      overrides?: Overrides
    ): Promise<void>;

    /**
     * calculates the user data across the reserves. this includes the total liquidity/collateral/borrow balances in ETH, the average Loan To Value, the average Liquidation Ratio, and the Health factor.
     * @param _user the address of the user
     * @returns the total liquidity, total collateral, total borrow balances of the user in ETH. also the average Ltv, liquidation threshold, and the health factor*
     */
    calculateUserGlobalData(
      _user: string,
      overrides?: CallOverrides
    ): Promise<{
      totalLiquidityBalanceETH: BigNumber;
      totalCollateralBalanceETH: BigNumber;
      totalBorrowBalanceETH: BigNumber;
      totalFeesETH: BigNumber;
      currentLtv: BigNumber;
      currentLiquidationThreshold: BigNumber;
      healthFactor: BigNumber;
      healthFactorBelowThreshold: boolean;
      0: BigNumber;
      1: BigNumber;
      2: BigNumber;
      3: BigNumber;
      4: BigNumber;
      5: BigNumber;
      6: BigNumber;
      7: boolean;
    }>;

    /**
     * check if a specific balance decrease is allowed (i.e. doesn't bring the user borrow position health factor under 1e18)
     * @param _amount the amount to decrease
     * @param _reserve the address of the reserve
     * @param _user the address of the user
     * @returns true if the decrease of the balance is allowed*
     */
    balanceDecreaseAllowed(
      _reserve: string,
      _user: string,
      _amount: BigNumberish,
      overrides?: CallOverrides
    ): Promise<boolean>;

    /**
     * calculates the amount of collateral needed in ETH to cover a new borrow.
     * @param _amount the amount the user wants to borrow
     * @param _fee the fee for the amount that the user needs to cover
     * @param _reserve the reserve from which the user wants to borrow
     * @param _userCurrentBorrowBalanceTH the current borrow balance of the user (before the borrow)
     * @param _userCurrentLtv the average ltv of the user given his current collateral
     * @returns the total amount of collateral in ETH to cover the current borrow balance + the new amount + fee*
     */
    calculateCollateralNeededInETH(
      _reserve: string,
      _amount: BigNumberish,
      _fee: BigNumberish,
      _userCurrentBorrowBalanceTH: BigNumberish,
      _userCurrentFeesETH: BigNumberish,
      _userCurrentLtv: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    /**
     * returns the health factor liquidation threshold*
     */
    getHealthFactorLiquidationThreshold(
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    /**
     * accessory functions to fetch data from the lendingPoolCore*
     */
    getReserveConfigurationData(
      _reserve: string,
      overrides?: CallOverrides
    ): Promise<{
      ltv: BigNumber;
      liquidationThreshold: BigNumber;
      liquidationBonus: BigNumber;
      rateStrategyAddress: string;
      usageAsCollateralEnabled: boolean;
      borrowingEnabled: boolean;
      stableBorrowRateEnabled: boolean;
      isActive: boolean;
      0: BigNumber;
      1: BigNumber;
      2: BigNumber;
      3: string;
      4: boolean;
      5: boolean;
      6: boolean;
      7: boolean;
    }>;

    getReserveData(
      _reserve: string,
      overrides?: CallOverrides
    ): Promise<{
      totalLiquidity: BigNumber;
      availableLiquidity: BigNumber;
      totalBorrowsStable: BigNumber;
      totalBorrowsVariable: BigNumber;
      liquidityRate: BigNumber;
      variableBorrowRate: BigNumber;
      stableBorrowRate: BigNumber;
      averageStableBorrowRate: BigNumber;
      utilizationRate: BigNumber;
      liquidityIndex: BigNumber;
      variableBorrowIndex: BigNumber;
      aTokenAddress: string;
      lastUpdateTimestamp: number;
      0: BigNumber;
      1: BigNumber;
      2: BigNumber;
      3: BigNumber;
      4: BigNumber;
      5: BigNumber;
      6: BigNumber;
      7: BigNumber;
      8: BigNumber;
      9: BigNumber;
      10: BigNumber;
      11: string;
      12: number;
    }>;

    getUserAccountData(
      _user: string,
      overrides?: CallOverrides
    ): Promise<{
      totalLiquidityETH: BigNumber;
      totalCollateralETH: BigNumber;
      totalBorrowsETH: BigNumber;
      totalFeesETH: BigNumber;
      availableBorrowsETH: BigNumber;
      currentLiquidationThreshold: BigNumber;
      ltv: BigNumber;
      healthFactor: BigNumber;
      0: BigNumber;
      1: BigNumber;
      2: BigNumber;
      3: BigNumber;
      4: BigNumber;
      5: BigNumber;
      6: BigNumber;
      7: BigNumber;
    }>;

    getUserReserveData(
      _reserve: string,
      _user: string,
      overrides?: CallOverrides
    ): Promise<{
      currentATokenBalance: BigNumber;
      currentBorrowBalance: BigNumber;
      principalBorrowBalance: BigNumber;
      borrowRateMode: BigNumber;
      borrowRate: BigNumber;
      liquidityRate: BigNumber;
      originationFee: BigNumber;
      variableBorrowIndex: BigNumber;
      lastUpdateTimestamp: BigNumber;
      usageAsCollateralEnabled: boolean;
      0: BigNumber;
      1: BigNumber;
      2: BigNumber;
      3: BigNumber;
      4: BigNumber;
      5: BigNumber;
      6: BigNumber;
      7: BigNumber;
      8: BigNumber;
      9: boolean;
    }>;
  };

  filters: {};

  estimateGas: {
    DATA_PROVIDER_REVISION(): Promise<BigNumber>;
    HEALTH_FACTOR_LIQUIDATION_THRESHOLD(): Promise<BigNumber>;
    addressesProvider(): Promise<BigNumber>;
    core(): Promise<BigNumber>;
    initialize(_addressesProvider: string): Promise<BigNumber>;
    calculateUserGlobalData(_user: string): Promise<BigNumber>;
    balanceDecreaseAllowed(
      _reserve: string,
      _user: string,
      _amount: BigNumberish
    ): Promise<BigNumber>;
    calculateCollateralNeededInETH(
      _reserve: string,
      _amount: BigNumberish,
      _fee: BigNumberish,
      _userCurrentBorrowBalanceTH: BigNumberish,
      _userCurrentFeesETH: BigNumberish,
      _userCurrentLtv: BigNumberish
    ): Promise<BigNumber>;
    getHealthFactorLiquidationThreshold(): Promise<BigNumber>;
    getReserveConfigurationData(_reserve: string): Promise<BigNumber>;
    getReserveData(_reserve: string): Promise<BigNumber>;
    getUserAccountData(_user: string): Promise<BigNumber>;
    getUserReserveData(_reserve: string, _user: string): Promise<BigNumber>;
  };

  populateTransaction: {
    DATA_PROVIDER_REVISION(): Promise<PopulatedTransaction>;
    HEALTH_FACTOR_LIQUIDATION_THRESHOLD(): Promise<PopulatedTransaction>;
    addressesProvider(): Promise<PopulatedTransaction>;
    core(): Promise<PopulatedTransaction>;
    initialize(_addressesProvider: string): Promise<PopulatedTransaction>;
    calculateUserGlobalData(_user: string): Promise<PopulatedTransaction>;
    balanceDecreaseAllowed(
      _reserve: string,
      _user: string,
      _amount: BigNumberish
    ): Promise<PopulatedTransaction>;
    calculateCollateralNeededInETH(
      _reserve: string,
      _amount: BigNumberish,
      _fee: BigNumberish,
      _userCurrentBorrowBalanceTH: BigNumberish,
      _userCurrentFeesETH: BigNumberish,
      _userCurrentLtv: BigNumberish
    ): Promise<PopulatedTransaction>;
    getHealthFactorLiquidationThreshold(): Promise<PopulatedTransaction>;
    getReserveConfigurationData(
      _reserve: string
    ): Promise<PopulatedTransaction>;
    getReserveData(_reserve: string): Promise<PopulatedTransaction>;
    getUserAccountData(_user: string): Promise<PopulatedTransaction>;
    getUserReserveData(
      _reserve: string,
      _user: string
    ): Promise<PopulatedTransaction>;
  };
}
