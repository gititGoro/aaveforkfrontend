import * as React from "react"
import * as API from "../../blockchain/EthereumAPI"
import ContractInstances from '../../blockchain/ContractInstances'
import { createContext, useState, useEffect, useCallback } from "react"

interface blockchainProps {
    metamaskConnections: API.ethersMetamask
    contracts: ContractInstances
    account: string
}

type Status = 'Metamask Missing' | 'window.ethereum not found' | 'Application not connected to Metamask' | 'window.ethereum injected by Metmask' | 'Successfully connected to Metmask' | 'Unsupported Network'

interface ethereumContextProps {
    blockchain?: blockchainProps
    connectionStatus: Status
    network: string
    requestConnection: () => void
    requestDisconnection: () => void
}

let EthereumContext = createContext<ethereumContextProps>({
    connectionStatus: 'Metamask Missing',
    network: '',
    requestConnection: () => console.log('unitialized'),
    requestDisconnection: () => console.log('unitialized')
})


interface providerProps {
    children: any
    window: any
}

function EthereumContextProvider(props: providerProps) {
    const [metamask, setMetamask] = useState<API.ethersMetamask | undefined>(undefined)
    const [connectionStatus, setConnectionStatus] = useState<Status>('Metamask Missing')
    const [chainId, setChainId] = useState<number>(0)
    const [network, setNetwork] = useState<string>("")
    const [injectedEthereum, setInjectedEthereum] = useState<API.injectedEthereum | undefined>(undefined)
    const [requestConnection, setRequestConnection] = useState<boolean>(false)
    const [contractInstances, setContractInstances] = useState<ContractInstances | undefined>(undefined)
    const [account, setAccount] = useState<string>("")


    const chainChangedHandler = (injectedEthereum: API.injectedEthereum) => async () => {
        let ethers = !metamask ? API.GetEthers(injectedEthereum) : metamask
        let networkObject = await ethers.provider.getNetwork()
        setChainId(networkObject.chainId)
        if (networkObject.chainId != chainId && chainId > 0)
            location.reload()
    }

    const chainChangeCallBack = useCallback(async () => {
        const result = API.GetEthereum(props.window)
        if (result.ethereum) {
            const ethers = API.GetEthers(result.ethereum)

            setInjectedEthereum(result.ethereum)
            result.ethereum.on('accountsChanged', (response) => setAccount(response[0]))
            if (connectionStatus == 'Successfully connected to Metmask') {
                if (result.ethereum.request)
                    await result.ethereum.request({ method: 'eth_requestAccounts' })
                else
                    await result.ethereum.send('eth_requestAccounts')
                const contracts = await API.GetContracts(ethers.signer, network)

                setContractInstances(contracts)
                if (!contracts)
                    setConnectionStatus('Unsupported Network')
            } else {
                setConnectionStatus('window.ethereum injected by Metmask')
            }
            const chainChangeContext = chainChangedHandler(result.ethereum)
            result.ethereum.on('chainChanged', chainChangeContext)
            setMetamask(ethers)
            const networkObject = await ethers.provider.getNetwork()

            setChainId(networkObject.chainId)
            setNetwork(networkObject.chainId === 1 ? 'main' : networkObject.name)
            const account = await ethers.signer.getAddress()
            if (account && account != '' && account !== '0x0') {
                setAccount(account)
                const contracts = await API.GetContracts(ethers.signer, networkObject.name)
                setContractInstances(contracts)
                if (!contracts)
                    setConnectionStatus('Unsupported Network')
                else
                    setConnectionStatus('Successfully connected to Metmask')
            }

        } else {
            let status: Status | undefined
            switch (result.message) {
                case 'Metamask not present':
                    status = 'Metamask Missing'
                    break;
                case 'Ethereum not injected into browser':
                    status = 'window.ethereum not found'
                    break;
                case 'Metamask not present':
                    status = 'Metamask Missing'
                default:
                    status = undefined
            }
            if (status)
                setConnectionStatus(status)
        }
    }, [chainId, account])

    useEffect(() => {
        chainChangeCallBack()
    }, [chainId, account])

    const requestConnectionCallback = useCallback(async () => {
        if (requestConnection && injectedEthereum) {
            if (injectedEthereum.request)
                await injectedEthereum.request({ 'method': 'eth_requestAccounts' })
            else
                await injectedEthereum.enable()
            setConnectionStatus('Successfully connected to Metmask')
            const chainChangeContext = chainChangedHandler(injectedEthereum)
            injectedEthereum.on('chainChanged', chainChangeContext)
            if (!metamask) {
                setMetamask(API.GetEthers(injectedEthereum))
            }
            if (metamask && metamask.signer) {
                const contracts = await API.GetContracts(metamask.signer, network)
                setContractInstances(contracts)
                if (!contracts)
                    setConnectionStatus('Unsupported Network')
                setAccount(await metamask.signer.getAddress())
            }


        }
        setRequestConnection(false)
    }, [requestConnection])

    useEffect(() => {
        requestConnectionCallback()
    })

    let blockchain: (blockchainProps | undefined)
    if (contractInstances && metamask) {
        blockchain = { contracts: contractInstances, metamaskConnections: metamask, account }
    }
    let contextProps: ethereumContextProps = {
        blockchain,
        connectionStatus,
        network,
        requestConnection: () => setRequestConnection(true),
        requestDisconnection: () => { setMetamask(undefined); setConnectionStatus('Application not connected to Metamask'); blockchain = undefined }
    }
    EthereumContext = createContext<ethereumContextProps>(contextProps)

    return <EthereumContext.Provider value={contextProps}>{props.children}</EthereumContext.Provider>
}

export { EthereumContext, EthereumContextProvider }