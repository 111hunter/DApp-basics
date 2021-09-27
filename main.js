let accounts

const airAddress = '0xbf15780A48c839572208E9A27B6d284FabCEC5Ac'
const erc20ABI = [
    {
        "constant": true,
        "inputs": [],
        "name": "name",
        "outputs": [
            {
                "name": "",
                "type": "string"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "_spender",
                "type": "address"
            },
            {
                "name": "_value",
                "type": "uint256"
            }
        ],
        "name": "approve",
        "outputs": [
            {
                "name": "",
                "type": "bool"
            }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "totalSupply",
        "outputs": [
            {
                "name": "",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "_from",
                "type": "address"
            },
            {
                "name": "_to",
                "type": "address"
            },
            {
                "name": "_value",
                "type": "uint256"
            }
        ],
        "name": "transferFrom",
        "outputs": [
            {
                "name": "",
                "type": "bool"
            }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "decimals",
        "outputs": [
            {
                "name": "",
                "type": "uint8"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "_owner",
                "type": "address"
            }
        ],
        "name": "balanceOf",
        "outputs": [
            {
                "name": "balance",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "symbol",
        "outputs": [
            {
                "name": "",
                "type": "string"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "_to",
                "type": "address"
            },
            {
                "name": "_value",
                "type": "uint256"
            }
        ],
        "name": "transfer",
        "outputs": [
            {
                "name": "",
                "type": "bool"
            }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "_owner",
                "type": "address"
            },
            {
                "name": "_spender",
                "type": "address"
            }
        ],
        "name": "allowance",
        "outputs": [
            {
                "name": "",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "payable": true,
        "stateMutability": "payable",
        "type": "fallback"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "name": "owner",
                "type": "address"
            },
            {
                "indexed": true,
                "name": "spender",
                "type": "address"
            },
            {
                "indexed": false,
                "name": "value",
                "type": "uint256"
            }
        ],
        "name": "Approval",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "name": "from",
                "type": "address"
            },
            {
                "indexed": true,
                "name": "to",
                "type": "address"
            },
            {
                "indexed": false,
                "name": "value",
                "type": "uint256"
            }
        ],
        "name": "Transfer",
        "type": "event"
    }
]

let provider

window.onload = function () {
    console.log("DApp is loaded")
    if(window.ethereum) {
        this.ethereum.on('accountsChanged', handleAccountsChanged)
        window.ethereum.request({method: 'eth_accounts'})
            .then(handleAccountsChanged)
            .catch((err)=> {
                console.log(err) 
            })
        // Connecting to Ethereum: Metamask
        provider = new ethers.providers.Web3Provider(window.ethereum)
        console.log(provider) 
    } else {
        console.log("please install metamask!")
    }
}

const handleAccountsChanged = (a) => {
    console.log("Accounts changed") 
    accounts = a
}

const enableEth = async () => {
    accounts = await window.ethereum.request({
        method: 'eth_requestAccounts'
    }).catch((err)=> {
        console.log(err )
    })
    console.log(accounts)
}

const checkEthbalance = async () => {
    let balance = await window.ethereum.request({
        method: 'eth_getBalance',
        params: [accounts[0]]
    }).catch((err)=> {
        console.log(err)
    })
    // Convert hex Wei to ether
    balance = parseInt(balance)
    balance = balance / Math.pow(10, 18)
    console.log(balance)
}

const sendTransaction = async () => {
    let params = [
        {
            from: accounts[0],
            to: '0x2Eedb9F951795f35d5AF4e0B2b6ED5c4B41f27fd',
            gas: Number(21000).toString(16),
            gasPrise: Number(250000).toString(16),
            value: Number(0.1*1e18).toString(16)
        }
    ]
    let result = await window.ethereum.request({method: 'eth_sendTransaction', params}).catch((err) => {
        console.log(err)
    })
    console.log(result)
}

const checkTokenBalance = async () => {
     let AirContract = new ethers.Contract(airAddress, erc20ABI, provider)
     let balance = await AirContract.balanceOf(accounts[0])
     console.log(balance.toString())
} 

const transferToken = async () => {
    let AirContract = new ethers.Contract(airAddress, erc20ABI, provider.getSigner())
    const amount = ethers.utils.parseUnits('1.0', 15) 
    let tx = await AirContract.transfer('0x2Eedb9F951795f35d5AF4e0B2b6ED5c4B41f27fd', amount)
    checkEvents()
}

const checkEvents = async () => {
    let AirContract = new ethers.Contract(airAddress, erc20ABI, provider)
    AirContract.on('Transfer', (from, to, amount) => {
        console.log("Got the event!")
        console.log(from, to, amount.toString())
    })
}

const simpleSiganature = async () => {
    const signer = provider.getSigner()
    let message = "We are learning about Web3!"
    let signature = await signer.signMessage(message)
    let address = ethers.utils.verifyMessage(message, signature)
    if(address.toUpperCase() === accounts[0].toUpperCase()){
        console.log("You own this address!")
    }else {
        console.log("Doesn't look like you own this address!")
    }
}