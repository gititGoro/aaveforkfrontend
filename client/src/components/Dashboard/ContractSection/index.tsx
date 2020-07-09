import React from 'react';
import { useContext, useState, useEffect } from 'react'
// import { Grid, Button, Paper, makeStyles } from '@material-ui/core'
import { EthereumContext } from '../../contexts/EthereumContext'

export default function ContractSection(props: {}) {
    const ethereumContextProps = useContext(EthereumContext)
    const [isAdmin, setIsAdmin] = useState<boolean>(false)

    useEffect(() => {
        if (ethereumContextProps.blockchain) {
            ethereumContextProps
                .blockchain
                .contracts
                .LendingPoolAddressesProvider
                .getLendingPoolManager()
                .then(m => {
                    let condition = false
                    if (ethereumContextProps.blockchain?.account) {
                        condition = (m.toLowerCase() === ethereumContextProps.blockchain.account.toLowerCase())
                    }
                    setIsAdmin(condition)
                })
        } else {
            setIsAdmin(false)
        }
    })
    if (ethereumContextProps.blockchain?.contracts) {
       
    }
    return isAdmin ? <div>"Admin logged in"</div> : <div>"not admin"</div>
}
