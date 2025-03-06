export const tokenAbi = [
  {
    "inputs": [
      { "internalType": "address", "name": "spender", "type": "address" },
      { "internalType": "uint256", "name": "amount", "type": "uint256" }
    ],
    "stateMutability": "nonpayable",
    "type": "function",
    "name": "approve",
    "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }]
  },
  {
    "type": "function",
    "name": "mint",
    "inputs": [
      { "name": "to", "type": "address", "internalType": "address" },
      { "name": "amount", "type": "uint256", "internalType": "uint256" }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "balanceOf",
    "inputs": [
      { "name": "owner", "type": "address", "internalType": "address" }
    ],
    "outputs": [
      { "name": "result", "type": "uint256", "internalType": "uint256" }
    ],
    "stateMutability": "view"
  },  
];

export const senderAbi = [    
  {
    "type": "function",
    "name": "send",
    "inputs": [
      { "name": "amount", "type": "uint256", "internalType": "uint256" }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  }
]