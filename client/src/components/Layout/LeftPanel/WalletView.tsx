import * as React from "react"
import { useContext, useState, useEffect } from 'react'
import { EthereumContext } from '../../contexts/EthereumContext'
import { Button, makeStyles, createStyles, Theme, Grid, List, ListItem, Divider } from '@material-ui/core'
import greenLight from '../../../images/greenLight.png'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';

const useStyles = makeStyles((theme: Theme) => createStyles({
    walletContainer: {
        width: "100%",
        display: "flex",
        fontFamily: theme.standardFont.fontFamily,
        fontWeight: theme.standardFont.fontWeightMedium,
        fontSize: theme.standardFont.fontSize + 2,
        color: "white",
        height: "60px",
        paddingTop: "10px"
    },
    button: {
        color: "white"
    },
    pseudoButton: {
        position: "relative",
        borderRadius: "25px",
        fontFamily: theme.standardFont.fontFamily,
        fontWeight: theme.standardFont.fontWeightMedium,
        fontSize: theme.standardFont.fontSize,
        width: "180px",
        backgroundColor: "white",
        height: "30px",
        "&:hover": {
            backgroundColor: "white",
        },
        color: "rgb(75, 80, 98)"
    },
    greenLight: {
        marginTop: "4px"
    },
    popupHidden: {
        visibility: "hidden",
        zIndex: -10,
        position: "absolute",
        bottom: -50,
        left: 15,
        height: "1px",
        fontSize: 1,
        opacity: 0,
        transformOrigin: "100% 0px",
        transform: "scaleY(0)",
    },
    popup: {
        border: "1px solid grey",
        position: "absolute",
        top: 55,
        left: 15,

        width: "320px",
        zIndex: 100,
        backgroundColor: "white",
        opacity: 1,
        transformOrigin: "100% 0px",
        transitionProperty: "transform, opacity",
        transitionDuration: "0.5s",
        transitionTimingFunction: "ease",
        borderRadius: "5px",
        fontFamily: theme.standardFont.fontFamily,
        fontSize: theme.standardFont.fontSize - 1,
        color: "grey"
    },
    addressListItem: {
        fontSize: theme.standardFont.fontSize,
        color: "#00BEB0",
    }
}))


interface props {
    expanded: boolean
}

export default function WalletView(props: props) {
    const ethereumContextProps = useContext(EthereumContext)

    return <WalletContainer>
        {!props.expanded ? "" :
            (ethereumContextProps.blockchain
                ? <ConnectedSection />
                : <ConnectSection />)}
    </WalletContainer>

}

function ConnectSection() {
    const ethereumContextProps = useContext(EthereumContext)
    const classes = useStyles()
    const [connectClicked, setConnectClicked] = useState<boolean>(false)
    useEffect(() => {
        if (connectClicked) {

            ethereumContextProps.requestConnection()
            setConnectClicked(false)
        }
    })

    return <Grid
        container
        direction="column"
        justify="flex-start"
        alignItems="center"
        spacing={1}
    >
        {ethereumContextProps.connectionStatus === 'window.ethereum injected by Metmask'
            || ethereumContextProps.connectionStatus === 'Application not connected to Metamask' ? <Grid item>
                <Button className={classes.button} variant="outlined" onClick={() => { setConnectClicked(true); }}>Connect</Button>
            </Grid> : ''}
        {ethereumContextProps.connectionStatus === 'Metamask Missing' || ethereumContextProps.connectionStatus === 'window.ethereum not found'
            ? "Please either install Metamask or use Brave's Crypto Wallet"
            : <Grid item>
                network: {ethereumContextProps.network} {ethereumContextProps.connectionStatus === 'Unsupported Network' ? ' unsupported.' : ''}
            </Grid>}
    </Grid>
}

function ConnectedSection() {
    const classes = useStyles()
    const ethereumContextProps = useContext(EthereumContext)
    const [popupVisible, setPopupVisible] = useState<boolean>(false)
    const [disconnectClicked, setDisconnectClicked] = useState<boolean>(false)

    useEffect(() => {
        if (disconnectClicked) {
            ethereumContextProps.requestDisconnection()
            setDisconnectClicked(false)
        }
    })

    return <div>
        <div className={popupVisible ? classes.popup : classes.popupHidden}>
            <List>
                <ListItem>
                    <Grid
                        container
                        direction="row"
                        justify="flex-start"
                        alignItems="center"
                        spacing={1}
                    >
                        <Grid item> <img className={classes.greenLight} src={greenLight} /></Grid>
                        <Grid item> Ethereum {ethereumContextProps.network} network</Grid>
                    </Grid>
                </ListItem>
                <ListItem className={classes.addressListItem}>
                    {ethereumContextProps.blockchain?.account}
                </ListItem>
                <Divider />
                <ListItem button onClick={() => setDisconnectClicked(true)}>
                    <Grid
                        container
                        direction="row"
                        justify="center"
                        alignItems="center"
                    >
                        <Grid item>
                            DISCONNECT
                        </Grid>
                    </Grid>
                </ListItem>
            </List>
        </div>
        <Button className={classes.pseudoButton} onClick={() => setPopupVisible(!popupVisible)}>
            <Grid
                container
                direction="row"
                justify="center"
                alignItems="center"
                spacing={1}
            >
                <Grid item>
                    <img className={classes.greenLight} src={greenLight} />
                </Grid>
                <Grid item>
                    {truncateAddress(ethereumContextProps.blockchain?.account)}
                </Grid>
                {popupVisible ? <Grid item>
                    <ExpandLessIcon className={classes.greenLight} />
                </Grid> : <Grid item>
                        <ExpandMoreIcon className={classes.greenLight} />
                    </Grid>}

            </Grid>
        </Button>
    </div>
}

function WalletContainer(props: { children: any }) {
    const walletContainerClass = useStyles().walletContainer
    return <div className={walletContainerClass}>
        {props.children}
    </div>
}

function truncateAddress(address: string | undefined) {
    return address ? address.substring(0, 6) + '...' + address.substring(address.length - 6, address.length) : ""
}