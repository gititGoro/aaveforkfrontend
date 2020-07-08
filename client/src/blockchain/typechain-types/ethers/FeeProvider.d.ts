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

interface FeeProviderInterface extends ethers.utils.Interface {
  functions: {
    "FEE_PROVIDER_REVISION()": FunctionFragment;
    "originationFeePercentage()": FunctionFragment;
    "initialize(address)": FunctionFragment;
    "calculateLoanOriginationFee(address,uint256)": FunctionFragment;
    "getLoanOriginationFeePercentage()": FunctionFragment;
  };

  encodeFunctionData(
    functionFragment: "FEE_PROVIDER_REVISION",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "originationFeePercentage",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "initialize", values: [string]): string;
  encodeFunctionData(
    functionFragment: "calculateLoanOriginationFee",
    values: [string, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "getLoanOriginationFeePercentage",
    values?: undefined
  ): string;

  decodeFunctionResult(
    functionFragment: "FEE_PROVIDER_REVISION",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "originationFeePercentage",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "initialize", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "calculateLoanOriginationFee",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getLoanOriginationFeePercentage",
    data: BytesLike
  ): Result;

  events: {};
}

export class FeeProvider extends Contract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  on(event: EventFilter | string, listener: Listener): this;
  once(event: EventFilter | string, listener: Listener): this;
  addListener(eventName: EventFilter | string, listener: Listener): this;
  removeAllListeners(eventName: EventFilter | string): this;
  removeListener(eventName: any, listener: Listener): this;

  interface: FeeProviderInterface;

  functions: {
    FEE_PROVIDER_REVISION(
      overrides?: CallOverrides
    ): Promise<{
      0: BigNumber;
    }>;

    originationFeePercentage(
      overrides?: CallOverrides
    ): Promise<{
      0: BigNumber;
    }>;

    /**
     * initializes the FeeProvider after it's added to the proxy
     * @param _addressesProvider the address of the LendingPoolAddressesProvider
     */
    initialize(
      _addressesProvider: string,
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    /**
     * calculates the origination fee for every loan executed on the platform.
     * @param _amount the amount of the loan*
     * @param _user can be used in the future to apply discount to the origination fee based on the _user account (eg. stake AAVE tokens in the lending pool, or deposit > 1M USD etc.)
     */
    calculateLoanOriginationFee(
      _user: string,
      _amount: BigNumberish,
      overrides?: CallOverrides
    ): Promise<{
      0: BigNumber;
    }>;

    /**
     * returns the origination fee percentage*
     */
    getLoanOriginationFeePercentage(
      overrides?: CallOverrides
    ): Promise<{
      0: BigNumber;
    }>;
  };

  FEE_PROVIDER_REVISION(overrides?: CallOverrides): Promise<BigNumber>;

  originationFeePercentage(overrides?: CallOverrides): Promise<BigNumber>;

  /**
   * initializes the FeeProvider after it's added to the proxy
   * @param _addressesProvider the address of the LendingPoolAddressesProvider
   */
  initialize(
    _addressesProvider: string,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  /**
   * calculates the origination fee for every loan executed on the platform.
   * @param _amount the amount of the loan*
   * @param _user can be used in the future to apply discount to the origination fee based on the _user account (eg. stake AAVE tokens in the lending pool, or deposit > 1M USD etc.)
   */
  calculateLoanOriginationFee(
    _user: string,
    _amount: BigNumberish,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  /**
   * returns the origination fee percentage*
   */
  getLoanOriginationFeePercentage(
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  callStatic: {
    FEE_PROVIDER_REVISION(overrides?: CallOverrides): Promise<BigNumber>;

    originationFeePercentage(overrides?: CallOverrides): Promise<BigNumber>;

    /**
     * initializes the FeeProvider after it's added to the proxy
     * @param _addressesProvider the address of the LendingPoolAddressesProvider
     */
    initialize(
      _addressesProvider: string,
      overrides?: Overrides
    ): Promise<void>;

    /**
     * calculates the origination fee for every loan executed on the platform.
     * @param _amount the amount of the loan*
     * @param _user can be used in the future to apply discount to the origination fee based on the _user account (eg. stake AAVE tokens in the lending pool, or deposit > 1M USD etc.)
     */
    calculateLoanOriginationFee(
      _user: string,
      _amount: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    /**
     * returns the origination fee percentage*
     */
    getLoanOriginationFeePercentage(
      overrides?: CallOverrides
    ): Promise<BigNumber>;
  };

  filters: {};

  estimateGas: {
    FEE_PROVIDER_REVISION(): Promise<BigNumber>;
    originationFeePercentage(): Promise<BigNumber>;
    initialize(_addressesProvider: string): Promise<BigNumber>;
    calculateLoanOriginationFee(
      _user: string,
      _amount: BigNumberish
    ): Promise<BigNumber>;
    getLoanOriginationFeePercentage(): Promise<BigNumber>;
  };

  populateTransaction: {
    FEE_PROVIDER_REVISION(): Promise<PopulatedTransaction>;
    originationFeePercentage(): Promise<PopulatedTransaction>;
    initialize(_addressesProvider: string): Promise<PopulatedTransaction>;
    calculateLoanOriginationFee(
      _user: string,
      _amount: BigNumberish
    ): Promise<PopulatedTransaction>;
    getLoanOriginationFeePercentage(): Promise<PopulatedTransaction>;
  };
}
