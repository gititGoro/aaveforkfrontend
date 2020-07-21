import * as React from "react"
import Dashboard from './Dashboard/index'
import { Route, Switch, Redirect/*, useLocation */ } from 'react-router-dom'
import Borrow from "./Borrow/index"
import Deposit from "./Deposit/index"
import Liquidation from "./Liquidation/index"
import { makeStyles, createStyles } from '@material-ui/core'
const delayDuration = '300ms'
const delayFunction = 'ease'

const useStyles = makeStyles(them => createStyles({
    expanded: {
        marginLeft:"200px",
        transitionProperty: "margin",
        transitionDuration: delayDuration,
        transitionTimingFunction: delayFunction,
    },
    shrunk:{
        marginLeft:"50px",
        transitionProperty: "margin",
        transitionDuration: delayDuration,
        transitionTimingFunction: delayFunction
    }
}))

interface props{
    expanded:boolean
    isAdmin:boolean
}

export default function PageContent(props:props) {
    const classes = useStyles()

    return <div className={props.expanded?classes.expanded:classes.shrunk}>
        <Switch>
            <Route path='/' exact>
                <div>user page</div>
            </Route>
            <Route path='/admin' exact>
                {props.isAdmin ? <Dashboard /> : <Redirect to="/" />}
            </Route>
            <Route path='/borrow' exact>
                <Borrow />
            </Route>
            <Route path='/deposit' exact>
                <Deposit />
            </Route>
            <Route path='/liquidation' exact>
                <Liquidation />
            </Route>
        </Switch>
    </div >
}