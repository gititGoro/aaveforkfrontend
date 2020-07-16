import * as React from "react"
import Dashboard from './Dashboard/index'
import { Route, Switch, BrowserRouter, Redirect/*, useLocation */ } from 'react-router-dom'
import { useContext, useCallback, useEffect } from 'react'
import { EthereumContext } from '../../contexts/EthereumContext'
import * as API from '../../../blockchain/EthereumAPI'

export default function PageContent() {
    const ethereumContextProps = useContext(EthereumContext)
    const [role, setRole] = React.useState<API.Role>(API.Role.user)
    const roleCallBack = useCallback(async () => {
        if (ethereumContextProps.blockchain) {
            setRole(await API.GetRole(ethereumContextProps.blockchain.account, ethereumContextProps.blockchain.contracts))
        }
    }, [ethereumContextProps.blockchain?.account])

    useEffect(() => {
        roleCallBack()
    }, [ethereumContextProps.blockchain?.account])
    const isAdmin = (role: API.Role): boolean => role !== API.Role.user

    return <div>
        <BrowserRouter>
            <Switch>
                <Route path='/' exact>
                    <div>user page</div>
                </Route>

                <Route path='/admin'>
                    {isAdmin(role) ? <Dashboard /> : <Redirect to="/" />}
                </Route>
            </Switch>
        </BrowserRouter>
    </div >
}