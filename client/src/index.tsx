import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import theme from './SiteTheme'
import { Container, Switch, Typography, FormControl } from '@material-ui/core';


ReactDOM.render(
  <React.StrictMode>
    <ThemedApp />
  </React.StrictMode>,
  document.getElementById('root')
);


function ThemedApp() {
  const [mode, setMode] = useState<'light' | 'dark'>('light')

  const themetoUse = createMuiTheme(theme, {
    palette: {
      type: mode
    }
  })

  return <ThemeProvider theme={themetoUse}>
    <App />
    <Container>
      <FormControl>
        <Typography>{mode.toString()}</Typography>
        <Switch onClick={() => setMode(mode === 'light' ? 'dark' : 'light')} value={mode}></Switch>
      </FormControl>
    </Container>
  </ThemeProvider>
}