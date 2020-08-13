import React, { useContext, useCallback, useEffect } from 'react';
import Dashboard from './Dashboard/index'
import {
    Route, Switch, Redirect, useLocation
} from 'react-router-dom'
import { List as Borrow } from "./Borrow/List"
import { List as Deposit } from "./Deposit/List"
import { Asset as DepositAsset } from './Deposit/Asset/index'
import { Asset as BorrowAsset } from './Borrow/Asset/index'
import LandingPage from './LandingPage'
import WalletNotConnected from './WalletNotConnected'
import Liquidation from "./Liquidation/index"
import { makeStyles, createStyles } from '@material-ui/core'
import { useState } from 'react'
import { EthereumContext } from 'src/components/contexts/EthereumContext';
import { Loading } from './Common/index'

const delayDuration = '300ms'
const delayFunction = 'ease'

const useStyles = makeStyles(them => createStyles({
    expanded: {
        marginLeft: "200px",
        transitionProperty: "margin",
        transitionDuration: delayDuration,
        transitionTimingFunction: delayFunction,
    },
    shrunk: {
        marginLeft: "50px",
        transitionProperty: "margin",
        transitionDuration: delayDuration,
        transitionTimingFunction: delayFunction
    }
}))

interface props {
    expanded: boolean
    isAdmin: boolean
    loading: boolean
}

export default function PageContent(props: props) {
    const ethereumContext = useContext(EthereumContext)
    const classes = useStyles()
    const [redirection, setRedirection] = useState<string>("")

    const location = useLocation()

    const hasDepositsCallback = useCallback(async () => {
        if (ethereumContext.blockchain && location.pathname == '/') {
            const blockchain = ethereumContext.blockchain
            const userGlobalData = await blockchain.contracts.LendingPoolDataProvider.calculateUserGlobalData(blockchain.account)
            if (!userGlobalData.totalCollateralBalanceETH.isZero()) {
                setRedirection('/deposit')
            }
        }
    }, [ethereumContext.blockchain])

    useEffect(() => {
        hasDepositsCallback()
    }, [ethereumContext.blockchain])

    const renderRedirect = redirection !== '' ? <Redirect to={redirection} /> : ''

    const setParameterRedirect = (section: string) => (assetId: string) => {
        setRedirection(`/${section}/${assetId}`)
    }

    const depositAssetRedirect = setParameterRedirect('deposit/purchase')
    const borrowAssetRedirect = setParameterRedirect('borrow/collateral')

    React.useEffect(() => {
        if (renderRedirect !== '') {
            setRedirection('')
        }
    })

    const RenderCorrect = (bigprops:any) => {
        if (ethereumContext.connectionStatus === 'window.ethereum injected by Metmask')
            return <Loading />
        if (ethereumContext.connectionStatus === 'Metamask Missing' || ethereumContext.connectionStatus === 'window.ethereum not found')
            return <WalletNotConnected />

        return <div>
            {renderRedirect}
            <Switch>

                <Route path='/' exact >
                    <LandingPage setRedirect={setRedirection} />
                </Route>
                <Route path='/admin' exact>
                    {props.isAdmin ? <Dashboard /> : <Redirect to="/" />}
                </Route>
                <Route path='/borrow' exact>
                    <Borrow redirect={borrowAssetRedirect} />
                </Route>
                <Route path='/deposit' exact>
                    <Deposit redirect={depositAssetRedirect} />
                </Route>
                <Route path='/deposit/purchase/:assetId'>
                    <DepositAsset setRedirect={setRedirection} />
                </Route>
                <Route path='/borrow/collateral/:assetId'>
                    <BorrowAsset setRedirect={setRedirection} />
                </Route>
                <Route path='/liquidation' exact >
                    <Liquidation loading={props.loading} />
                </Route>
            </Switch>
        </div>
    }

    return <div className={props.expanded ? classes.expanded : classes.shrunk}>
        <RenderCorrect  />
    </div >
}

