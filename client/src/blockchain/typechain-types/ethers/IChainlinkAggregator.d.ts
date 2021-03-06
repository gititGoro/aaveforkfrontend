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

interface IChainlinkAggregatorInterface extends ethers.utils.Interface {
  functions: {
    "latestAnswer()": FunctionFragment;
    "latestTimestamp()": FunctionFragment;
    "latestRound()": FunctionFragment;
    "getAnswer(uint256)": FunctionFragment;
    "getTimestamp(uint256)": FunctionFragment;
  };

  encodeFunctionData(
    functionFragment: "latestAnswer",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "latestTimestamp",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "latestRound",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "getAnswer",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "getTimestamp",
    values: [BigNumberish]
  ): string;

  decodeFunctionResult(
    functionFragment: "latestAnswer",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "latestTimestamp",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "latestRound",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "getAnswer", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "getTimestamp",
    data: BytesLike
  ): Result;

  events: {
    "AnswerUpdated(int256,uint256,uint256)": EventFragment;
    "NewRound(uint256,address)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "AnswerUpdated"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "NewRound"): EventFragment;
}

export class IChainlinkAggregator extends Contract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  on(event: EventFilter | string, listener: Listener): this;
  once(event: EventFilter | string, listener: Listener): this;
  addListener(eventName: EventFilter | string, listener: Listener): this;
  removeAllListeners(eventName: EventFilter | string): this;
  removeListener(eventName: any, listener: Listener): this;

  interface: IChainlinkAggregatorInterface;

  functions: {
    latestAnswer(
      overrides?: CallOverrides
    ): Promise<{
      0: BigNumber;
    }>;

    latestTimestamp(
      overrides?: CallOverrides
    ): Promise<{
      0: BigNumber;
    }>;

    latestRound(
      overrides?: CallOverrides
    ): Promise<{
      0: BigNumber;
    }>;

    getAnswer(
      roundId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<{
      0: BigNumber;
    }>;

    getTimestamp(
      roundId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<{
      0: BigNumber;
    }>;
  };

  latestAnswer(overrides?: CallOverrides): Promise<BigNumber>;

  latestTimestamp(overrides?: CallOverrides): Promise<BigNumber>;

  latestRound(overrides?: CallOverrides): Promise<BigNumber>;

  getAnswer(
    roundId: BigNumberish,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  getTimestamp(
    roundId: BigNumberish,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  callStatic: {
    latestAnswer(overrides?: CallOverrides): Promise<BigNumber>;

    latestTimestamp(overrides?: CallOverrides): Promise<BigNumber>;

    latestRound(overrides?: CallOverrides): Promise<BigNumber>;

    getAnswer(
      roundId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getTimestamp(
      roundId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;
  };

  filters: {
    AnswerUpdated(
      current: BigNumberish | null,
      roundId: BigNumberish | null,
      timestamp: null
    ): EventFilter;

    NewRound(
      roundId: BigNumberish | null,
      startedBy: string | null
    ): EventFilter;
  };

  estimateGas: {
    latestAnswer(): Promise<BigNumber>;
    latestTimestamp(): Promise<BigNumber>;
    latestRound(): Promise<BigNumber>;
    getAnswer(roundId: BigNumberish): Promise<BigNumber>;
    getTimestamp(roundId: BigNumberish): Promise<BigNumber>;
  };

  populateTransaction: {
    latestAnswer(): Promise<PopulatedTransaction>;
    latestTimestamp(): Promise<PopulatedTransaction>;
    latestRound(): Promise<PopulatedTransaction>;
    getAnswer(roundId: BigNumberish): Promise<PopulatedTransaction>;
    getTimestamp(roundId: BigNumberish): Promise<PopulatedTransaction>;
  };
}
