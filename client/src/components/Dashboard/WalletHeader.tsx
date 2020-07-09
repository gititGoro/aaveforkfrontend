import React from 'react';
import { useContext } from 'react'
import { Grid, Button, Paper, makeStyles } from '@material-ui/core'
import { EthereumContext } from '../contexts/EthereumContext'

const useStyles = makeStyles({
    paper: {
        background: 'rgba(0,0,255,0.3)',

        flexGrow: 1,
        borderRadius: 3,
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
        color: 'white',
        padding: '0 30px',
        fontSize: "18px",
        fontWeight: "bold",

    }
});

interface walletHeaderProps {

}
export default function WalletHeader(props: walletHeaderProps) {
    const ethereumContextProps = useContext(EthereumContext)
    const classes = useStyles()

    return <Paper className={classes.paper}>
        <Grid
            container
            direction="column"
            justify="space-between"
            alignItems="center"
            spacing={4}
        >
            <Grid item>
                {ethereumContextProps.connectionStatus}
            </Grid>
            {ethereumContextProps.blockchain && ethereumContextProps.blockchain.account !== '' ? <Grid item>
                Account: {ethereumContextProps.blockchain.account}
            </Grid> : ""}
            <Grid item>
                network: {ethereumContextProps.network}
            </Grid>{ethereumContextProps.network === 'kovan' ? <Grid item>
                <Button color="primary" onClick={() => { ethereumContextProps.requestConnection(); }}>connect</Button>
            </Grid> : <Grid item>Switch network to Kovan</Grid>}
        </Grid >
    </Paper>

}

