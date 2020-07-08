/* Generated by ts-generator ver. 0.0.8 */
/* tslint:disable */

import { Signer } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import { Contract, ContractFactory, Overrides } from "@ethersproject/contracts";

import { TokenDistributor } from "./TokenDistributor";

export class TokenDistributorFactory extends ContractFactory {
  constructor(signer?: Signer) {
    super(_abi, _bytecode, signer);
  }

  deploy(overrides?: Overrides): Promise<TokenDistributor> {
    return super.deploy(overrides || {}) as Promise<TokenDistributor>;
  }
  getDeployTransaction(overrides?: Overrides): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  attach(address: string): TokenDistributor {
    return super.attach(address) as TokenDistributor;
  }
  connect(signer: Signer): TokenDistributorFactory {
    return super.connect(signer) as TokenDistributorFactory;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): TokenDistributor {
    return new Contract(address, _abi, signerOrProvider) as TokenDistributor;
  }
}

const _abi = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256"
      }
    ],
    name: "Burn",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "receiver",
        type: "address"
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "percentage",
        type: "uint256"
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256"
      }
    ],
    name: "Distributed",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address[]",
        name: "receivers",
        type: "address[]"
      },
      {
        indexed: false,
        internalType: "uint256[]",
        name: "percentages",
        type: "uint256[]"
      }
    ],
    name: "DistributionUpdated",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "tokenToBurn",
        type: "address"
      },
      {
        indexed: false,
        internalType: "address",
        name: "kyberProxy",
        type: "address"
      },
      {
        indexed: false,
        internalType: "address",
        name: "_recipientBurn",
        type: "address"
      }
    ],
    name: "Setup",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "from",
        type: "address"
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "fromAmount",
        type: "uint256"
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "toAmount",
        type: "uint256"
      }
    ],
    name: "Trade",
    type: "event"
  },
  {
    payable: true,
    stateMutability: "payable",
    type: "fallback"
  },
  {
    constant: true,
    inputs: [],
    name: "DISTRIBUTION_BASE",
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
    name: "IMPLEMENTATION_REVISION",
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
    name: "KYBER_ETH_MOCK_ADDRESS",
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
    name: "MAX_UINT",
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
    name: "MAX_UINT_MINUS_ONE",
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
    name: "MIN_CONVERSION_RATE",
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
    name: "kyberProxy",
    outputs: [
      {
        internalType: "contract IKyberNetworkProxyInterface",
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
    name: "recipientBurn",
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
    name: "tokenToBurn",
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
    constant: false,
    inputs: [
      {
        internalType: "address",
        name: "_recipientBurn",
        type: "address"
      },
      {
        internalType: "address",
        name: "_tokenToBurn",
        type: "address"
      },
      {
        internalType: "address",
        name: "_kyberProxy",
        type: "address"
      },
      {
        internalType: "address[]",
        name: "_receivers",
        type: "address[]"
      },
      {
        internalType: "uint256[]",
        name: "_percentages",
        type: "uint256[]"
      },
      {
        internalType: "contract IERC20[]",
        name: "_tokens",
        type: "address[]"
      }
    ],
    name: "initialize",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    constant: false,
    inputs: [
      {
        internalType: "contract IERC20[]",
        name: "_tokens",
        type: "address[]"
      }
    ],
    name: "distribute",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    constant: false,
    inputs: [
      {
        internalType: "contract IERC20[]",
        name: "_tokens",
        type: "address[]"
      }
    ],
    name: "approveKyber",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    constant: true,
    inputs: [],
    name: "getDistribution",
    outputs: [
      {
        internalType: "address[]",
        name: "receivers",
        type: "address[]"
      },
      {
        internalType: "uint256[]",
        name: "percentages",
        type: "uint256[]"
      }
    ],
    payable: false,
    stateMutability: "view",
    type: "function"
  }
];

const _bytecode =
  "0x60806040526000805534801561001457600080fd5b50612259806100246000396000f3fe6080604052600436106100c25760003560e01c80634f1b86eb1161007f5780637623bac5116100595780637623bac51461045c5780638c0c9a25146106a9578063e5b5019a14610700578063f0eeed811461072b576100c2565b80634f1b86eb1461027b5780634fbea8ea146102d25780636138889b14610397576100c2565b8063043c41d4146100c457806313520658146100ef5780631cced51b1461011a578063217ab806146101ce57806323879bb11461022557806340d58a4a14610250575b005b3480156100d057600080fd5b506100d9610782565b6040518082815260200191505060405180910390f35b3480156100fb57600080fd5b506101046107a6565b6040518082815260200191505060405180910390f35b34801561012657600080fd5b5061012f6107ac565b604051808060200180602001838103835285818151815260200191508051906020019060200280838360005b8381101561017657808201518184015260208101905061015b565b50505050905001838103825284818151815260200191508051906020019060200280838360005b838110156101b857808201518184015260208101905061019d565b5050505090500194505050505060405180910390f35b3480156101da57600080fd5b506101e3610895565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b34801561023157600080fd5b5061023a6108bb565b6040518082815260200191505060405180910390f35b34801561025c57600080fd5b506102656108c0565b6040518082815260200191505060405180910390f35b34801561028757600080fd5b506102906108c5565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b3480156102de57600080fd5b50610395600480360360208110156102f557600080fd5b810190808035906020019064010000000081111561031257600080fd5b82018360208201111561032457600080fd5b8035906020019184602083028401116401000000008311171561034657600080fd5b919080806020026020016040519081016040528093929190818152602001838360200280828437600081840152601f19601f8201169050808301925050505050505091929192905050506108eb565b005b3480156103a357600080fd5b5061045a600480360360208110156103ba57600080fd5b81019080803590602001906401000000008111156103d757600080fd5b8201836020820111156103e957600080fd5b8035906020019184602083028401116401000000008311171561040b57600080fd5b919080806020026020016040519081016040528093929190818152602001838360200280828437600081840152601f19601f8201169050808301925050505050505091929192905050506109d9565b005b34801561046857600080fd5b506106a7600480360360c081101561047f57600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190803573ffffffffffffffffffffffffffffffffffffffff169060200190929190803573ffffffffffffffffffffffffffffffffffffffff169060200190929190803590602001906401000000008111156104fc57600080fd5b82018360208201111561050e57600080fd5b8035906020019184602083028401116401000000008311171561053057600080fd5b919080806020026020016040519081016040528093929190818152602001838360200280828437600081840152601f19601f8201169050808301925050505050505091929192908035906020019064010000000081111561059057600080fd5b8201836020820111156105a257600080fd5b803590602001918460208302840111640100000000831117156105c457600080fd5b919080806020026020016040519081016040528093929190818152602001838360200280828437600081840152601f19601f8201169050808301925050505050505091929192908035906020019064010000000081111561062457600080fd5b82018360208201111561063657600080fd5b8035906020019184602083028401116401000000008311171561065857600080fd5b919080806020026020016040519081016040528093929190818152602001838360200280828437600081840152601f19601f820116905080830192505050505050509192919290505050610f82565b005b3480156106b557600080fd5b506106be611218565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b34801561070c57600080fd5b50610715611230565b6040518082815260200191505060405180910390f35b34801561073757600080fd5b50610740611254565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b7ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe81565b61271081565b606080603460000180548060200260200160405190810160405280929190818152602001828054801561083457602002820191906000526020600020905b8160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190600101908083116107ea575b50505050509150603460010180548060200260200160405190810160405280929190818152602001828054801561088a57602002820191906000526020600020905b815481526020019060010190808311610876575b505050505090509091565b603860009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b600181565b600181565b603760009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b60008090505b81518110156109d55761090261127a565b73ffffffffffffffffffffffffffffffffffffffff1682828151811061092457fe5b602002602001015173ffffffffffffffffffffffffffffffffffffffff16146109c8576109c7603660009054906101000a900473ffffffffffffffffffffffffffffffffffffffff167ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe84848151811061099a57fe5b602002602001015173ffffffffffffffffffffffffffffffffffffffff166112969092919063ffffffff16565b5b80806001019150506108f1565b5050565b60008090505b8151811015610f7e5760008282815181106109f657fe5b602002602001015190506000610a0a61127a565b73ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff161415610a435747610b0f565b838381518110610a4f57fe5b602002602001015173ffffffffffffffffffffffffffffffffffffffff166370a08231306040518263ffffffff1660e01b8152600401808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060206040518083038186803b158015610ad357600080fd5b505afa158015610ae7573d6000803e3d6000fd5b505050506040513d6020811015610afd57600080fd5b81019080805190602001909291905050505b905060008111610b20575050610f71565b610b28611fe3565b603460405180604001604052908160008201805480602002602001604051908101604052809291908181526020018280548015610bba57602002820191906000526020600020905b8160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019060010190808311610b70575b5050505050815260200160018201805480602002602001604051908101604052809291908181526020018280548015610c1257602002820191906000526020600020905b815481526020019060010190808311610bfe575b505050505081525050905060008090505b816000015151811015610f6c576000610c70612710610c6285602001518581518110610c4b57fe5b6020026020010151876114b690919063ffffffff16565b61153c90919063ffffffff16565b9050600073ffffffffffffffffffffffffffffffffffffffff1683600001518381518110610c9a57fe5b602002602001015173ffffffffffffffffffffffffffffffffffffffff1614610eec57610cc561127a565b73ffffffffffffffffffffffffffffffffffffffff168573ffffffffffffffffffffffffffffffffffffffff1614610d5157610d4c83600001518381518110610d0a57fe5b602002602001015182898981518110610d1f57fe5b602002602001015173ffffffffffffffffffffffffffffffffffffffff166115869092919063ffffffff16565b610e46565b600083600001518381518110610d6357fe5b602002602001015173ffffffffffffffffffffffffffffffffffffffff168260405180600001905060006040518083038185875af1925050503d8060008114610dc8576040519150601f19603f3d011682016040523d82523d6000602084013e610dcd565b606091505b5050905080610e44576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260158152602001807f526576657274656420455448207472616e73666572000000000000000000000081525060200191505060405180910390fd5b505b7f60ce3cc2d133631eac66a476f14997a9fa682bd05a60dd993cf02285822d78d883600001518381518110610e7757fe5b602002602001015184602001518481518110610e8f57fe5b602002602001015183604051808473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001838152602001828152602001935050505060405180910390a1610f5e565b6000819050603760009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168673ffffffffffffffffffffffffffffffffffffffff1614610f5357610f508683611657565b90505b610f5c81611948565b505b508080600101915050610c23565b505050505b80806001019150506109df565b5050565b6000610f8c611add565b9050600160009054906101000a900460ff1680610fad5750610fac611ae6565b5b80610fb9575060005481115b61100e576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252602e81526020018061215e602e913960400191505060405180910390fd5b6000600160009054906101000a900460ff16159050801561104b5760018060006101000a81548160ff021916908315150217905550816000819055505b87603860006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555086603760006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555085603660006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055506111188585611af7565b611121836108eb565b7f99566d155bc7902033d8db6b0f091f12209d9651abdae3aad004632bd3e657b587878a604051808473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001935050505060405180910390a1801561120e576000600160006101000a81548160ff0219169083151502179055505b5050505050505050565b73eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee81565b7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff81565b603660009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b600073eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee905090565b6000811480611390575060008373ffffffffffffffffffffffffffffffffffffffff1663dd62ed3e30856040518363ffffffff1660e01b8152600401808373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019250505060206040518083038186803b15801561135357600080fd5b505afa158015611367573d6000803e3d6000fd5b505050506040513d602081101561137d57600080fd5b8101908080519060200190929190505050145b6113e5576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260368152602001806121ef6036913960400191505060405180910390fd5b6114b1838473ffffffffffffffffffffffffffffffffffffffff1663095ea7b3905060e01b8484604051602401808373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200182815260200192505050604051602081830303815290604052907bffffffffffffffffffffffffffffffffffffffffffffffffffffffff19166020820180517bffffffffffffffffffffffffffffffffffffffffffffffffffffffff8381831617835250505050611c87565b505050565b6000808314156114c95760009050611536565b60008284029050828482816114da57fe5b0414611531576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252602181526020018061213d6021913960400191505060405180910390fd5b809150505b92915050565b600061157e83836040518060400160405280601a81526020017f536166654d6174683a206469766973696f6e206279207a65726f000000000000815250611ed2565b905092915050565b611652838473ffffffffffffffffffffffffffffffffffffffff1663a9059cbb905060e01b8484604051602401808373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200182815260200192505050604051602081830303815290604052907bffffffffffffffffffffffffffffffffffffffffffffffffffffffff19166020820180517bffffffffffffffffffffffffffffffffffffffffffffffffffffffff8381831617835250505050611c87565b505050565b60008061166261127a565b73ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff161461169a57836116b0565b73eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee5b905060006116bc61127a565b73ffffffffffffffffffffffffffffffffffffffff168573ffffffffffffffffffffffffffffffffffffffff16146116f55760006116f7565b835b90506000603660009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166329589f61838588603760009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16307fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff600160006040518963ffffffff1660e01b8152600401808873ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018781526020018673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018481526020018381526020018273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200180602001828103825260008152602001602001985050505050505050506020604051808303818588803b1580156118a857600080fd5b505af11580156118bc573d6000803e3d6000fd5b50505050506040513d60208110156118d357600080fd5b810190808051906020019092919050505090508273ffffffffffffffffffffffffffffffffffffffff167fc6c64663abd604372f6cce5d7fa31596ffb4de182467cd1fc81bd8adb88c2c2e8683604051808381526020018281526020019250505060405180910390a280935050505092915050565b603760009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663a9059cbb603860009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16836040518363ffffffff1660e01b8152600401808373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200182815260200192505050602060405180830381600087803b158015611a1357600080fd5b505af1158015611a27573d6000803e3d6000fd5b505050506040513d6020811015611a3d57600080fd5b8101908080519060200190929190505050611aa3576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252603981526020018061218c6039913960400191505060405180910390fd5b7fb90306ad06b2a6ff86ddc9327db583062895ef6540e62dc50add009db5b356eb816040518082815260200191505060405180910390a150565b60006001905090565b600080303b90506000811491505090565b8051825114611b6e576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252601d8152602001807f4172726179206c656e677468732073686f756c6420626520657175616c00000081525060200191505060405180910390fd5b60405180604001604052808381526020018281525060346000820151816000019080519060200190611ba1929190611ffd565b506020820151816001019080519060200190611bbe929190612087565b509050507fdc9f439f707945ade720b0154668dd64af0689fb88b40abdb0f0289156d23e9d8282604051808060200180602001838103835285818151815260200191508051906020019060200280838360005b83811015611c2c578082015181840152602081019050611c11565b50505050905001838103825284818151815260200191508051906020019060200280838360005b83811015611c6e578082015181840152602081019050611c53565b5050505090500194505050505060405180910390a15050565b611ca68273ffffffffffffffffffffffffffffffffffffffff16611f98565b611d18576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252601f8152602001807f5361666545524332303a2063616c6c20746f206e6f6e2d636f6e74726163740081525060200191505060405180910390fd5b600060608373ffffffffffffffffffffffffffffffffffffffff16836040518082805190602001908083835b60208310611d675780518252602082019150602081019050602083039250611d44565b6001836020036101000a0380198251168184511680821785525050505050509050019150506000604051808303816000865af19150503d8060008114611dc9576040519150601f19603f3d011682016040523d82523d6000602084013e611dce565b606091505b509150915081611e46576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260208152602001807f5361666545524332303a206c6f772d6c6576656c2063616c6c206661696c656481525060200191505060405180910390fd5b600081511115611ecc57808060200190516020811015611e6557600080fd5b8101908080519060200190929190505050611ecb576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252602a8152602001806121c5602a913960400191505060405180910390fd5b5b50505050565b60008083118290611f7e576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825283818151815260200191508051906020019080838360005b83811015611f43578082015181840152602081019050611f28565b50505050905090810190601f168015611f705780820380516001836020036101000a031916815260200191505b509250505060405180910390fd5b506000838581611f8a57fe5b049050809150509392505050565b60008060007fc5d2460186f7233c927e7db2dcc703c0e500b653ca82273b7bfad8045d85a47060001b9050833f9150808214158015611fda57506000801b8214155b92505050919050565b604051806040016040528060608152602001606081525090565b828054828255906000526020600020908101928215612076579160200282015b828111156120755782518260006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055509160200191906001019061201d565b5b50905061208391906120d4565b5090565b8280548282559060005260206000209081019282156120c3579160200282015b828111156120c25782518255916020019190600101906120a7565b5b5090506120d09190612117565b5090565b61211491905b8082111561211057600081816101000a81549073ffffffffffffffffffffffffffffffffffffffff0219169055506001016120da565b5090565b90565b61213991905b8082111561213557600081600090555060010161211d565b5090565b9056fe536166654d6174683a206d756c7469706c69636174696f6e206f766572666c6f77436f6e747261637420696e7374616e63652068617320616c7265616479206265656e20696e697469616c697a6564494e5445524e414c5f4255524e2e205265766572746564207472616e7366657220746f20726563697069656e744275726e20616464726573735361666545524332303a204552433230206f7065726174696f6e20646964206e6f7420737563636565645361666545524332303a20617070726f76652066726f6d206e6f6e2d7a65726f20746f206e6f6e2d7a65726f20616c6c6f77616e6365a265627a7a72315820bf041c2e11a804263eb3a232423117189e0c05b1b487441cb399076c1745e7ab64736f6c63430005100032";
