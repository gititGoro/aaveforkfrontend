import React from 'react';
import './App.css';
import { EthereumContextProvider } from './components/contexts/EthereumContext'
import Dashboard from "./components/Dashboard/index"
function App() {

  return (
    <EthereumContextProvider window={window}>
      <Dashboard />
    </EthereumContextProvider>
  );
}

export default App;
