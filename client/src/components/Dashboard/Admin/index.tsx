import React from 'react';
import { useContext, useState, useEffect } from 'react'
// import { Grid, Button, Paper, makeStyles } from '@material-ui/core'
import { EthereumContext } from '../../contexts/EthereumContext'

export default function Admin(props: {}) {
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
                    console.log(`manager: ${m}, currentUser: ${ethereumContextProps.blockchain?.account}`)
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
        console.log('Lending pool functions')
        console.log(JSON.stringify(ethereumContextProps.blockchain.contracts.LendingPool.interface.functions, null, 4))
        //  const func = ethereumContextProps.blockchain.contracts.LendingPool["redeemUnderlying"]
        console.log('funcs ' + Object.keys(ethereumContextProps.blockchain.contracts.LendingPool.interface.functions))
        // Reflect.apply(func, undefined, ['reserve', 'user', 'amount', 'atoken'])
    }
    return isAdmin ? <div>"Admin logged in"</div> : <div>"not admin"</div>
}


// function getAllFuncs(toCheck) {
//     var props: string[] = [];
//     var obj = toCheck;
//     do {
//         props = props.concat(Object.getOwnPropertyNames(obj));
//     } while (obj = Object.getPrototypeOf(obj));

//     return props.sort().filter(function (e, i, arr) {
//         return (e != arr[i + 1] && typeof toCheck[e] == 'function');
//     });
// }