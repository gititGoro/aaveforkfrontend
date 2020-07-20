import { createMuiTheme } from '@material-ui/core/styles'
import { PaletteColor } from '@material-ui/core/styles/createPalette'
declare module '@material-ui/core/styles/createMuiTheme' {
    interface Theme {
        appbackground: PaletteColor
        controlHighlight:PaletteColor
        componentBackground:PaletteColor
    }
    interface ThemeOptions {
        appbackground?:PaletteColor,
        controlHighlight?:PaletteColor
        componentBackground?:PaletteColor
    }
}


const theme = createMuiTheme({
    appbackground:
    {
        light: "white",
        main: "blue",
        dark: "#2D2A3D",
        contrastText: "orange"
    },
    controlHighlight:{
        light: "rgba(128,128,128,0.5)",
        main:"green",
        dark:"rgba(128,128,128,0.5)",
        contrastText:"orange"
    },
    componentBackground:{
        light:"linear-gradient(to bottom, magenta, #00AAAA)",
        main:"blue",
        dark:"#3A3952",
        contrastText:"orange"
    }
})

export default theme