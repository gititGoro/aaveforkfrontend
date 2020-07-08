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
  CallOverrides
} from "@ethersproject/contracts";
import { BytesLike } from "@ethersproject/bytes";
import { Listener, Provider } from "@ethersproject/providers";
import { FunctionFragment, EventFragment, Result } from "@ethersproject/abi";

interface IReserveInterestRateStrategyInterface extends ethers.utils.Interface {
  functions: {
    "getBaseVariableBorrowRate()": FunctionFragment;
    "calculateInterestRates(address,uint256,uint256,uint256,uint256)": FunctionFragment;
  };

  encodeFunctionData(
    functionFragment: "getBaseVariableBorrowRate",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "calculateInterestRates",
    values: [string, BigNumberish, BigNumberish, BigNumberish, BigNumberish]
  ): string;

  decodeFunctionResult(
    functionFragment: "getBaseVariableBorrowRate",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "calculateInterestRates",
    data: BytesLike
  ): Result;

  events: {};
}

export class IReserveInterestRateStrategy extends Contract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  on(event: EventFilter | string, listener: Listener): this;
  once(event: EventFilter | string, listener: Listener): this;
  addListener(eventName: EventFilter | string, listener: Listener): this;
  removeAllListeners(eventName: EventFilter | string): this;
  removeListener(eventName: any, listener: Listener): this;

  interface: IReserveInterestRateStrategyInterface;

  functions: {
    /**
     * returns the base variable borrow rate, in rays
     */
    getBaseVariableBorrowRate(
      overrides?: CallOverrides
    ): Promise<{
      0: BigNumber;
    }>;

    /**
     * calculates the liquidity, stable, and variable rates depending on the current utilization rate     and the base parameters
     */
    calculateInterestRates(
      _reserve: string,
      _utilizationRate: BigNumberish,
      _totalBorrowsStable: BigNumberish,
      _totalBorrowsVariable: BigNumberish,
      _averageStableBorrowRate: BigNumberish,
      overrides?: CallOverrides
    ): Promise<{
      liquidityRate: BigNumber;
      stableBorrowRate: BigNumber;
      variableBorrowRate: BigNumber;
      0: BigNumber;
      1: BigNumber;
      2: BigNumber;
    }>;
  };

  /**
   * returns the base variable borrow rate, in rays
   */
  getBaseVariableBorrowRate(overrides?: CallOverrides): Promise<BigNumber>;

  /**
   * calculates the liquidity, stable, and variable rates depending on the current utilization rate     and the base parameters
   */
  calculateInterestRates(
    _reserve: string,
    _utilizationRate: BigNumberish,
    _totalBorrowsStable: BigNumberish,
    _totalBorrowsVariable: BigNumberish,
    _averageStableBorrowRate: BigNumberish,
    overrides?: CallOverrides
  ): Promise<{
    liquidityRate: BigNumber;
    stableBorrowRate: BigNumber;
    variableBorrowRate: BigNumber;
    0: BigNumber;
    1: BigNumber;
    2: BigNumber;
  }>;

  callStatic: {
    /**
     * returns the base variable borrow rate, in rays
     */
    getBaseVariableBorrowRate(overrides?: CallOverrides): Promise<BigNumber>;

    /**
     * calculates the liquidity, stable, and variable rates depending on the current utilization rate     and the base parameters
     */
    calculateInterestRates(
      _reserve: string,
      _utilizationRate: BigNumberish,
      _totalBorrowsStable: BigNumberish,
      _totalBorrowsVariable: BigNumberish,
      _averageStableBorrowRate: BigNumberish,
      overrides?: CallOverrides
    ): Promise<{
      liquidityRate: BigNumber;
      stableBorrowRate: BigNumber;
      variableBorrowRate: BigNumber;
      0: BigNumber;
      1: BigNumber;
      2: BigNumber;
    }>;
  };

  filters: {};

  estimateGas: {
    getBaseVariableBorrowRate(): Promise<BigNumber>;
    calculateInterestRates(
      _reserve: string,
      _utilizationRate: BigNumberish,
      _totalBorrowsStable: BigNumberish,
      _totalBorrowsVariable: BigNumberish,
      _averageStableBorrowRate: BigNumberish
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    getBaseVariableBorrowRate(): Promise<PopulatedTransaction>;
    calculateInterestRates(
      _reserve: string,
      _utilizationRate: BigNumberish,
      _totalBorrowsStable: BigNumberish,
      _totalBorrowsVariable: BigNumberish,
      _averageStableBorrowRate: BigNumberish
    ): Promise<PopulatedTransaction>;
  };
}
