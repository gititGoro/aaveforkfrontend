/* Generated by ts-generator ver. 0.0.8 */
/* tslint:disable */

import { Signer, BigNumberish } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import { Contract, ContractFactory, Overrides } from "@ethersproject/contracts";

import { DefaultReserveInterestRateStrategy } from "./DefaultReserveInterestRateStrategy";

export class DefaultReserveInterestRateStrategyFactory extends ContractFactory {
  constructor(signer?: Signer) {
    super(_abi, _bytecode, signer);
  }

  deploy(
    _reserve: string,
    _provider: string,
    _baseVariableBorrowRate: BigNumberish,
    _variableRateSlope1: BigNumberish,
    _variableRateSlope2: BigNumberish,
    _stableRateSlope1: BigNumberish,
    _stableRateSlope2: BigNumberish,
    overrides?: Overrides
  ): Promise<DefaultReserveInterestRateStrategy> {
    return super.deploy(
      _reserve,
      _provider,
      _baseVariableBorrowRate,
      _variableRateSlope1,
      _variableRateSlope2,
      _stableRateSlope1,
      _stableRateSlope2,
      overrides || {}
    ) as Promise<DefaultReserveInterestRateStrategy>;
  }
  getDeployTransaction(
    _reserve: string,
    _provider: string,
    _baseVariableBorrowRate: BigNumberish,
    _variableRateSlope1: BigNumberish,
    _variableRateSlope2: BigNumberish,
    _stableRateSlope1: BigNumberish,
    _stableRateSlope2: BigNumberish,
    overrides?: Overrides
  ): TransactionRequest {
    return super.getDeployTransaction(
      _reserve,
      _provider,
      _baseVariableBorrowRate,
      _variableRateSlope1,
      _variableRateSlope2,
      _stableRateSlope1,
      _stableRateSlope2,
      overrides || {}
    );
  }
  attach(address: string): DefaultReserveInterestRateStrategy {
    return super.attach(address) as DefaultReserveInterestRateStrategy;
  }
  connect(signer: Signer): DefaultReserveInterestRateStrategyFactory {
    return super.connect(signer) as DefaultReserveInterestRateStrategyFactory;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): DefaultReserveInterestRateStrategy {
    return new Contract(
      address,
      _abi,
      signerOrProvider
    ) as DefaultReserveInterestRateStrategy;
  }
}

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "_reserve",
        type: "address"
      },
      {
        internalType: "contract LendingPoolAddressesProvider",
        name: "_provider",
        type: "address"
      },
      {
        internalType: "uint256",
        name: "_baseVariableBorrowRate",
        type: "uint256"
      },
      {
        internalType: "uint256",
        name: "_variableRateSlope1",
        type: "uint256"
      },
      {
        internalType: "uint256",
        name: "_variableRateSlope2",
        type: "uint256"
      },
      {
        internalType: "uint256",
        name: "_stableRateSlope1",
        type: "uint256"
      },
      {
        internalType: "uint256",
        name: "_stableRateSlope2",
        type: "uint256"
      }
    ],
    payable: false,
    stateMutability: "nonpayable",
    type: "constructor"
  },
  {
    constant: true,
    inputs: [],
    name: "EXCESS_UTILIZATION_RATE",
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
  },
  {
    constant: true,
    inputs: [],
    name: "OPTIMAL_UTILIZATION_RATE",
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
  },
  {
    constant: true,
    inputs: [],
    name: "addressesProvider",
    outputs: [
      {
        internalType: "contract LendingPoolAddressesProvider",
        name: "",
        type: "address"
      }
    ],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    constant: true,
    inputs: [],
    name: "baseVariableBorrowRate",
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
  },
  {
    constant: true,
    inputs: [],
    name: "reserve",
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
  },
  {
    constant: true,
    inputs: [],
    name: "stableRateSlope1",
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
  },
  {
    constant: true,
    inputs: [],
    name: "stableRateSlope2",
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
  },
  {
    constant: true,
    inputs: [],
    name: "variableRateSlope1",
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
  },
  {
    constant: true,
    inputs: [],
    name: "variableRateSlope2",
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
  },
  {
    constant: true,
    inputs: [],
    name: "getBaseVariableBorrowRate",
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
  },
  {
    constant: true,
    inputs: [],
    name: "getVariableRateSlope1",
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
  },
  {
    constant: true,
    inputs: [],
    name: "getVariableRateSlope2",
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
  },
  {
    constant: true,
    inputs: [],
    name: "getStableRateSlope1",
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
  },
  {
    constant: true,
    inputs: [],
    name: "getStableRateSlope2",
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
  },
  {
    constant: true,
    inputs: [
      {
        internalType: "address",
        name: "_reserve",
        type: "address"
      },
      {
        internalType: "uint256",
        name: "_availableLiquidity",
        type: "uint256"
      },
      {
        internalType: "uint256",
        name: "_totalBorrowsStable",
        type: "uint256"
      },
      {
        internalType: "uint256",
        name: "_totalBorrowsVariable",
        type: "uint256"
      },
      {
        internalType: "uint256",
        name: "_averageStableBorrowRate",
        type: "uint256"
      }
    ],
    name: "calculateInterestRates",
    outputs: [
      {
        internalType: "uint256",
        name: "currentLiquidityRate",
        type: "uint256"
      },
      {
        internalType: "uint256",
        name: "currentStableBorrowRate",
        type: "uint256"
      },
      {
        internalType: "uint256",
        name: "currentVariableBorrowRate",
        type: "uint256"
      }
    ],
    payable: false,
    stateMutability: "view",
    type: "function"
  }
];

const _bytecode =
  "0x608060405234801561001057600080fd5b50604051610dcd380380610dcd833981810160405260e081101561003357600080fd5b8101908080519060200190929190805190602001909291908051906020019092919080519060200190929190805190602001909291908051906020019092919080519060200190929190505050856000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550846001819055508360028190555082600381905550816004819055508060058190555086600660006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555050505050505050610c938061013a6000396000f3fe608060405234801561001057600080fd5b50600436106100f55760003560e01c80637b832f5811610097578063ccab01a311610066578063ccab01a3146102e0578063cd3293de146102fe578063d5cd739114610348578063f420240914610366576100f5565b80637b832f581461023c578063a15f30ac1461025a578063b258954414610278578063c72c4d1014610296576100f5565b806317319873116100d3578063173198731461015457806334762ca51461017257806357e37af01461019057806365614f811461021e576100f5565b80630b3429a2146100fa5780630bdf953f1461011857806314e32da414610136575b600080fd5b610102610384565b6040518082815260200191505060405180910390f35b61012061038e565b6040518082815260200191505060405180910390f35b61013e610394565b6040518082815260200191505060405180910390f35b61015c61039e565b6040518082815260200191505060405180910390f35b61017a6103ad565b6040518082815260200191505060405180910390f35b6101fa600480360360a08110156101a657600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190803590602001909291908035906020019092919080359060200190929190803590602001909291905050506103b7565b60405180848152602001838152602001828152602001935050505060405180910390f35b610226610705565b6040518082815260200191505060405180910390f35b61024461070b565b6040518082815260200191505060405180910390f35b610262610711565b6040518082815260200191505060405180910390f35b610280610721565b6040518082815260200191505060405180910390f35b61029e610727565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b6102e861074c565b6040518082815260200191505060405180910390f35b610306610752565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b610350610778565b6040518082815260200191505060405180910390f35b61036e610782565b6040518082815260200191505060405180910390f35b6000600254905090565b60045481565b6000600554905090565b6aa56fa5b99019a5c800000081565b6000600154905090565b6000806000806103d0868861078c90919063ffffffff16565b9050600080821480156103e35750600089145b6104115761040c6103fd838b61078c90919063ffffffff16565b8361081490919063ffffffff16565b610414565b60005b90506000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16633618abba6040518163ffffffff1660e01b815260040160206040518083038186803b15801561047d57600080fd5b505afa158015610491573d6000803e3d6000fd5b505050506040513d60208110156104a757600080fd5b810190808051906020019092919050505073ffffffffffffffffffffffffffffffffffffffff1663bb85c0bb8b6040518263ffffffff1660e01b8152600401808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060206040518083038186803b15801561053457600080fd5b505afa158015610548573d6000803e3d6000fd5b505050506040513d602081101561055e57600080fd5b810190808051906020019092919050505093506b0295be96e6406697200000008111156106475760006105c36aa56fa5b99019a5c80000006105b56b0295be96e6406697200000008561087090919063ffffffff16565b61081490919063ffffffff16565b90506106006105dd826005546108ba90919063ffffffff16565b6105f26004548861078c90919063ffffffff16565b61078c90919063ffffffff16565b945061063f61061a826003546108ba90919063ffffffff16565b61063160025460015461078c90919063ffffffff16565b61078c90919063ffffffff16565b9350506106d8565b61068c61067d61066c6b0295be96e6406697200000008461081490919063ffffffff16565b6004546108ba90919063ffffffff16565b8561078c90919063ffffffff16565b93506106d56106c46002546106b66b0295be96e6406697200000008561081490919063ffffffff16565b6108ba90919063ffffffff16565b60015461078c90919063ffffffff16565b92505b6106f6816106e88a8a878b61091d565b6108ba90919063ffffffff16565b94505050955095509592505050565b60035481565b60025481565b6b0295be96e64066972000000081565b60015481565b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b60055481565b600660009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b6000600454905090565b6000600354905090565b60008082840190508381101561080a576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252601b8152602001807f536166654d6174683a206164646974696f6e206f766572666c6f77000000000081525060200191505060405180910390fd5b8091505092915050565b6000806002838161082157fe5b0490506108678361085961084a6b033b2e3c9fd0803ce8000000886109c790919063ffffffff16565b8461078c90919063ffffffff16565b610a4d90919063ffffffff16565b91505092915050565b60006108b283836040518060400160405280601e81526020017f536166654d6174683a207375627472616374696f6e206f766572666c6f770000815250610a97565b905092915050565b60006109156b033b2e3c9fd0803ce80000006109076108e285876109c790919063ffffffff16565b60026b033b2e3c9fd0803ce8000000816108f857fe5b0461078c90919063ffffffff16565b610a4d90919063ffffffff16565b905092915050565b600080610933858761078c90919063ffffffff16565b905060008114156109485760009150506109bf565b60006109658561095788610b57565b6108ba90919063ffffffff16565b90506000610984856109768a610b57565b6108ba90919063ffffffff16565b905060006109b561099485610b57565b6109a7848661078c90919063ffffffff16565b61081490919063ffffffff16565b9050809450505050505b949350505050565b6000808314156109da5760009050610a47565b60008284029050828482816109eb57fe5b0414610a42576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401808060200182810382526021815260200180610c3e6021913960400191505060405180910390fd5b809150505b92915050565b6000610a8f83836040518060400160405280601a81526020017f536166654d6174683a206469766973696f6e206279207a65726f000000000000815250610b77565b905092915050565b6000838311158290610b44576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825283818151815260200191508051906020019080838360005b83811015610b09578082015181840152602081019050610aee565b50505050905090810190601f168015610b365780820380516001836020036101000a031916815260200191505b509250505060405180910390fd5b5060008385039050809150509392505050565b6000610b70633b9aca00836109c790919063ffffffff16565b9050919050565b60008083118290610c23576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825283818151815260200191508051906020019080838360005b83811015610be8578082015181840152602081019050610bcd565b50505050905090810190601f168015610c155780820380516001836020036101000a031916815260200191505b509250505060405180910390fd5b506000838581610c2f57fe5b04905080915050939250505056fe536166654d6174683a206d756c7469706c69636174696f6e206f766572666c6f77a265627a7a72315820595fab1c7342218a7bd97be77c820dea5faf36c0c4709349e58429081bca547164736f6c63430005100032";
