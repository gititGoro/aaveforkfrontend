import React from 'react';
// import { useContext } from 'react'
// import { EthereumContext } from '../contexts/EthereumContext'
// import { Typography, makeStyles, Grid } from '@material-ui/core';
import PageContent from './PageContent/index'
import LeftPanel from './LeftPanel/index'
import BottomPanel from './BottomPanel'
interface props {

}

export default function Layout(props: props) {
    // const ethereumContextProps = useContext(EthereumContext)


    return <div>   
        <LeftPanel />
        <BottomPanel />
        <PageContent />
    </div>
}