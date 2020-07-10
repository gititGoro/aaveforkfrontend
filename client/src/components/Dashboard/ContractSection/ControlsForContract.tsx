import * as React from "react"
import { useContext } from 'react'
import { EthereumContext } from "../../contexts/EthereumContext"
import verboten from "../../../blockchain/forbiddenFunctions.json"
import ControlsForFunction from "./ControlsForFunction"
import { Grid, Typography, Paper, makeStyles } from '@material-ui/core'

interface props {
    contractName: string
}

const useStyles = makeStyles({
    paper: {
        background: 'rgba(10,0,10,0.2)',

        flexGrow: 1,
        borderRadius: 3,
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
        color: 'white',
        padding: '0 30px',
        fontSize: "18px",
        fontWeight: "bold",

    }
});

export default function ControlsForContracts(props: props) {
    const classes = useStyles()
    const ethereumContextProps = useContext(EthereumContext)
    if (!ethereumContextProps.blockchain)
        return <div></div>

    const permittedPredicate = permittedPredicateFactory(props.contractName)

    const functions = Object.keys(ethereumContextProps.blockchain.contracts[props.contractName].functions)
        .filter(permittedPredicate)
        .filter(f => f.indexOf('(') !== -1)

    return <Paper className={classes.paper}>
        <Grid container
            direction="column"
            justify="space-between"
            alignItems="center"
            spacing={7}>
            <Grid item key={props.contractName}>
                <Typography variant="h4">Contract {props.contractName}</Typography>
            </Grid>
            {functions.map(f => <Grid item key={props.contractName + f}> <ControlsForFunction contractName={props.contractName} function={f} /></Grid>)}
        </Grid>
    </Paper>
}

const permittedPredicateFactory = (contract: string) => {
    let forbidden = verboten["All"]

    const contractKeys = Object.keys(verboten)

    let contractSpecific = contractKeys.filter(k => k === contract)
    if (contractSpecific.length > 0) {
        forbidden.push(verboten[contractSpecific[0]])
    }

    return (func: string): boolean => {
        return forbidden.findIndex(f => func.startsWith(f + '(')) === -1
    }
}

