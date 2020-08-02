import * as React from "react"
import Dashboard from './Dashboard/index'
import {
    Route, Switch, Redirect
} from 'react-router-dom'
import { List as Borrow } from "./Borrow/List"
import { List as Deposit } from "./Deposit/List"
import { Asset as DepositAsset } from './Deposit/Asset/index'
import Liquidation from "./Liquidation/index"
import { makeStyles, createStyles } from '@material-ui/core'
import { useState } from 'react'
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
}

export default function PageContent(props: props) {
    const classes = useStyles()
    const [redirection, setRedirection] = useState<string>("")
    const renderRedirect = redirection !== '' ? <Redirect to={redirection} /> : ''
    const setDepositPurchaseRedirect = (assetId: string) => {
        setRedirection(`/deposit/purchase/${assetId}`)
    }
    React.useEffect(() => {
        if (renderRedirect !== '') {
            console.log('setting renderRedirect to nothin')
            setRedirection('')
        }
    })

    return <div className={props.expanded ? classes.expanded : classes.shrunk}>
        {renderRedirect}
        <Switch>

            <Route path='/' exact component={() => <div ></div>} />
            <Route path='/admin' exact>
                {props.isAdmin ? <Dashboard /> : <Redirect to="/" />}
            </Route>
            <Route path='/borrow' exact component={Borrow} />
            <Route path='/deposit' exact>
                <Deposit redirect={setDepositPurchaseRedirect} />
            </Route>
            <Route path='/deposit/purchase/:assetId' component={DepositAsset}>
                <DepositAsset setRedirect={setRedirection} />
            </Route>
            <Route path='/liquidation' exact component={Liquidation} />
        </Switch>
    </div >
}

