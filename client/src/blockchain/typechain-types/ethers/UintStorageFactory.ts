/* Generated by ts-generator ver. 0.0.8 */
/* tslint:disable */

import { Signer } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import { Contract, ContractFactory, Overrides } from "@ethersproject/contracts";

import { UintStorage } from "./UintStorage";

export class UintStorageFactory extends ContractFactory {
  constructor(signer?: Signer) {
    super(_abi, _bytecode, signer);
  }

  deploy(overrides?: Overrides): Promise<UintStorage> {
    return super.deploy(overrides || {}) as Promise<UintStorage>;
  }
  getDeployTransaction(overrides?: Overrides): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  attach(address: string): UintStorage {
    return super.attach(address) as UintStorage;
  }
  connect(signer: Signer): UintStorageFactory {
    return super.connect(signer) as UintStorageFactory;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): UintStorage {
    return new Contract(address, _abi, signerOrProvider) as UintStorage;
  }
}

const _abi = [
  {
    constant: true,
    inputs: [
      {
        internalType: "bytes32",
        name: "_key",
        type: "bytes32"
      }
    ],
    name: "getUint",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256"
      }
    ],
    payable: false,
    stateMutability: "view",
    type: "function"
  }
];

const _bytecode =
  "0x6080604052348015600f57600080fd5b5060bd8061001e6000396000f3fe6080604052348015600f57600080fd5b506004361060285760003560e01c8063bd02d0f514602d575b600080fd5b605660048036036020811015604157600080fd5b8101908080359060200190929190505050606c565b6040518082815260200191505060405180910390f35b600080600083815260200190815260200160002054905091905056fea265627a7a723158209880cd983e57baac3255e21e6043819ae57ad7cac9f8c6fbbda8381cb7bd60c764736f6c63430005100032";
