import React from 'react';
import './App.css';
import { EthereumContextProvider } from './components/contexts/EthereumContext'
import Layout from './components/Layout/index'
import { makeStyles, Theme } from '@material-ui/core';
import 'fontsource-roboto';

const useStyles = makeStyles((theme:Theme)=>({
  app: {
    background: theme.appbackground[theme.palette.type],
    position: "fixed",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    overflow: "auto",
  }
}))

function App() {
  const classes = useStyles()
  return (
    <div className={classes.app}>
      <EthereumContextProvider window={window}>
        <Layout />
      </EthereumContextProvider>
    </div>
  );
}

export default App;
