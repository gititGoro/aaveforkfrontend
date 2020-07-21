import React, { useState, useContext, useCallback, useEffect } from 'react';
import PageContent from './PageContent/index'
import LeftPanel from './LeftPanel/index'
import BottomPanel, {brightMode} from './BottomPanel'
import { BrowserRouter } from 'react-router-dom'
import { GetRole, Role } from '../../blockchain/EthereumAPI'
import { EthereumContext } from '../contexts/EthereumContext'
import { makeStyles, createStyles, Theme } from '@material-ui/core';
interface props {
    setBrightMode: (mode: brightMode) => void
    brightMode: brightMode
}

const useStyles = makeStyles((theme: Theme) => createStyles({
    root: {
        overflowX: "hidden"
    }
}))

export default function Layout(props: props) {
    const classes = useStyles()
    const ethereumContextProps = useContext(EthereumContext)
    const [expandLeftPanel, setExpandLeftPanel] = useState<boolean>(true)
    const [isAdmin, setIsAdmin] = useState<boolean>(false)

    const adminCallBack = useCallback(async () => {
        if (ethereumContextProps.blockchain) {
            const role = await GetRole(ethereumContextProps.blockchain.account, ethereumContextProps.blockchain.contracts)
            setIsAdmin(role === Role.lendingPoolManager || role === Role.superAdmin || role === Role.addressesProviderOwner)
        } else
            setIsAdmin(false)
    }, [ethereumContextProps.blockchain?.account, ethereumContextProps.network, ethereumContextProps.connectionStatus])

    useEffect(() => {
        adminCallBack()
    })
    return <div className={classes.root}>
        <BrowserRouter>
            <LeftPanel expanded={expandLeftPanel} setExpanded={setExpandLeftPanel} isAdmin={isAdmin} />
            <BottomPanel brightMode={props.brightMode} setBrightMode={props.setBrightMode} />
            <PageContent expanded={expandLeftPanel} isAdmin={isAdmin} />
        </BrowserRouter>
    </div>
}