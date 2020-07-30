import React from 'react';
import { useContext, useState, useEffect } from 'react'
import { EthereumContext } from '../../../contexts/EthereumContext'
import ContractSection from './ContractSection/index'
import { Grid, Select, FormControl, InputLabel, MenuItem, makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
    select: {
        width: "500px",
    },
    grid: {
        margin: "50px"
    }
})


export default function ContractSelector() {
    const classes = useStyles()
    const ethereumContextProps = useContext(EthereumContext)
    const [selectedContract, setSelectedContract] = useState<string>("")

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

    if (!ethereumContextProps.blockchain)
        return <div></div>

    const contractList = Object.keys(ethereumContextProps.blockchain.contracts)
        .filter(contract => isAdmin || contract !== 'LendingPoolConfigurator')
        .sort((a, b) => {
            if (a.startsWith('Mock'))
                return 1
            if (b.startsWith('Mock'))
                return -1
            return a.localeCompare(b)
        })

    return <Grid
        container
        direction="column"
        justify="center"
        alignItems="center"
        className={classes.grid}
    >
        <Grid>
            <FormControl>
                <InputLabel id="contractSelect" >Contract</InputLabel>
                <Select
                    className={classes.select}
                    labelId="contractSelect"
                    value={selectedContract}
                    onChange={(event: any) => setSelectedContract(event.target.value)}
                >
                    {contractList.map((contract) => <MenuItem key={contract} value={contract}>{contract}</MenuItem>)}
                </Select>
            </FormControl>
        </Grid>
        {selectedContract !== '' ? <ContractSection selectedContract={selectedContract} isAdmin={isAdmin} /> : ""}
    </Grid>

}