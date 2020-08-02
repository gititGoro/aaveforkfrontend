import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import theme from './SiteTheme'
import { brightMode } from './components/Layout/BottomPanel';
import { transitions, positions, Provider as AlertProvider } from 'react-alert'
//@ts-ignore
import AlertTemplate from 'react-alert-template-basic'


ReactDOM.render(
  <React.StrictMode>
    <ThemedApp />
  </React.StrictMode>,
  document.getElementById('root')
);


function ThemedApp() {
  const rememberedMode = localStorage.getItem("brightnessMode")
  const light: brightMode = 'light'
  const dark: brightMode = 'dark'
  const defaultMode: brightMode = rememberedMode === light || rememberedMode === dark ? rememberedMode : 'light'
  const [mode, setMode] = useState<brightMode>(defaultMode)

  const setModeRemember = (m: brightMode) => {
    localStorage.setItem("brightnessMode", m);
    setMode(m)
  }

  const themetoUse = createMuiTheme(theme, {
    palette: {
      type: mode
    }
  })

  const alertOptions = {
    // you can also just use 'bottom center'
    position: positions.BOTTOM_CENTER,
    timeout: 5000,
    offset: '30px',
    // you can also just use 'scale'
    transition: transitions.SCALE,
  }


  return <ThemeProvider theme={themetoUse}>
    <AlertProvider template={AlertTemplate as any} {...alertOptions}>
      <App brightMode={mode} setBrightMode={setModeRemember} />
    </AlertProvider>
  </ThemeProvider>
}