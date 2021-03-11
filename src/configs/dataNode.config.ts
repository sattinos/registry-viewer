export const dataNodeABI: any = [   
    {
        "constant": true,
        "inputs": [
            {
                "name": "_index",
                "type": "uint256"
            }
        ],
        "name": "getIn3NodeInformation",
        "outputs": [
            {
                "components": [
                    {
                        "name": "url",
                        "type": "string"
                    },
                    {
                        "name": "deposit",
                        "type": "uint256"
                    },
                    {
                        "name": "registerTime",
                        "type": "uint64"
                    },
                    {
                        "name": "props",
                        "type": "uint192"
                    },
                    {
                        "name": "weight",
                        "type": "uint64"
                    },
                    {
                        "name": "signer",
                        "type": "address"
                    },
                    {
                        "name": "proofHash",
                        "type": "bytes32"
                    }
                ],
                "name": "",
                "type": "tuple"
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
                "name": "_signer",
                "type": "address"
            }
        ],
        "name": "getSignerInformation",
        "outputs": [
            {
                "components": [
                    {
                        "name": "lockedTime",
                        "type": "uint64"
                    },
                    {
                        "name": "owner",
                        "type": "address"
                    },
                    {
                        "name": "stage",
                        "type": "uint256"
                    },
                    {
                        "name": "depositAmount",
                        "type": "uint256"
                    },
                    {
                        "name": "index",
                        "type": "uint256"
                    }
                ],
                "name": "",
                "type": "tuple"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    }
];