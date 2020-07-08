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

interface LendingRateOracleInterface extends ethers.utils.Interface {
  functions: {
    "getMarketBorrowRate(address)": FunctionFragment;
    "setMarketBorrowRate(address,uint256)": FunctionFragment;
    "getMarketLiquidityRate(address)": FunctionFragment;
    "setMarketLiquidityRate(address,uint256)": FunctionFragment;
  };

  encodeFunctionData(
    functionFragment: "getMarketBorrowRate",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "setMarketBorrowRate",
    values: [string, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "getMarketLiquidityRate",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "setMarketLiquidityRate",
    values: [string, BigNumberish]
  ): string;

  decodeFunctionResult(
    functionFragment: "getMarketBorrowRate",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "setMarketBorrowRate",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getMarketLiquidityRate",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "setMarketLiquidityRate",
    data: BytesLike
  ): Result;

  events: {};
}

export class LendingRateOracle extends Contract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  on(event: EventFilter | string, listener: Listener): this;
  once(event: EventFilter | string, listener: Listener): this;
  addListener(eventName: EventFilter | string, listener: Listener): this;
  removeAllListeners(eventName: EventFilter | string): this;
  removeListener(eventName: any, listener: Listener): this;

  interface: LendingRateOracleInterface;

  functions: {
    getMarketBorrowRate(
      _asset: string,
      overrides?: CallOverrides
    ): Promise<{
      0: BigNumber;
    }>;

    setMarketBorrowRate(
      _asset: string,
      _rate: BigNumberish,
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    getMarketLiquidityRate(
      _asset: string,
      overrides?: CallOverrides
    ): Promise<{
      0: BigNumber;
    }>;

    setMarketLiquidityRate(
      _asset: string,
      _rate: BigNumberish,
      overrides?: Overrides
    ): Promise<ContractTransaction>;
  };

  getMarketBorrowRate(
    _asset: string,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  setMarketBorrowRate(
    _asset: string,
    _rate: BigNumberish,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  getMarketLiquidityRate(
    _asset: string,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  setMarketLiquidityRate(
    _asset: string,
    _rate: BigNumberish,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  callStatic: {
    getMarketBorrowRate(
      _asset: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    setMarketBorrowRate(
      _asset: string,
      _rate: BigNumberish,
      overrides?: Overrides
    ): Promise<void>;

    getMarketLiquidityRate(
      _asset: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    setMarketLiquidityRate(
      _asset: string,
      _rate: BigNumberish,
      overrides?: Overrides
    ): Promise<void>;
  };

  filters: {};

  estimateGas: {
    getMarketBorrowRate(_asset: string): Promise<BigNumber>;
    setMarketBorrowRate(
      _asset: string,
      _rate: BigNumberish
    ): Promise<BigNumber>;
    getMarketLiquidityRate(_asset: string): Promise<BigNumber>;
    setMarketLiquidityRate(
      _asset: string,
      _rate: BigNumberish
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    getMarketBorrowRate(_asset: string): Promise<PopulatedTransaction>;
    setMarketBorrowRate(
      _asset: string,
      _rate: BigNumberish
    ): Promise<PopulatedTransaction>;
    getMarketLiquidityRate(_asset: string): Promise<PopulatedTransaction>;
    setMarketLiquidityRate(
      _asset: string,
      _rate: BigNumberish
    ): Promise<PopulatedTransaction>;
  };
}
