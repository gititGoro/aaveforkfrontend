/* Generated by ts-generator ver. 0.0.8 */
/* tslint:disable */

import { Signer } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import { Contract, ContractFactory, Overrides } from "@ethersproject/contracts";

import { AddressStorage } from "./AddressStorage";

export class AddressStorageFactory extends ContractFactory {
  constructor(signer?: Signer) {
    super(_abi, _bytecode, signer);
  }

  deploy(overrides?: Overrides): Promise<AddressStorage> {
    return super.deploy(overrides || {}) as Promise<AddressStorage>;
  }
  getDeployTransaction(overrides?: Overrides): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  attach(address: string): AddressStorage {
    return super.attach(address) as AddressStorage;
  }
  connect(signer: Signer): AddressStorageFactory {
    return super.connect(signer) as AddressStorageFactory;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): AddressStorage {
    return new Contract(address, _abi, signerOrProvider) as AddressStorage;
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
    name: "getAddress",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address"
      }
    ],
    payable: false,
    stateMutability: "view",
    type: "function"
  }
];

const _bytecode =
  "0x608060405234801561001057600080fd5b50610109806100206000396000f3fe6080604052348015600f57600080fd5b506004361060285760003560e01c806321f8a72114602d575b600080fd5b605660048036036020811015604157600080fd5b81019080803590602001909291905050506098565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b600080600083815260200190815260200160002060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905091905056fea265627a7a723158203905d01bdf153d0fdbd0aff98bffb351fa08c491d8034c4eaf9efb9a7be503fe64736f6c63430005100032";
