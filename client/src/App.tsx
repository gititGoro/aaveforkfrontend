import React from 'react';
import './App.css';
import { EthereumContextProvider } from './components/contexts/EthereumContext'
import Dashboard from "./components/Dashboard/index"
import { makeStyles } from '@material-ui/core';
//style="background:"

const useStyles = makeStyles({
  app: {
    background: " linear-gradient(to bottom right, #FE6B8B, #00AAAA)",
    position: "fixed",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    overflow: "auto",
  }
})

function App() {
  const classes = useStyles()
  return (
    <div className={classes.app}>
      <EthereumContextProvider window={window}>
        <Dashboard />
      </EthereumContextProvider>
    </div>
  );
}

export default App;
