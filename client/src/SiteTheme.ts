import { createMuiTheme } from '@material-ui/core/styles'
import { PaletteColor } from '@material-ui/core/styles/createPalette'
import { FontStyle } from '@material-ui/core/styles/createTypography'
declare module '@material-ui/core/styles/createMuiTheme' {
    interface Theme {
        appbackground: PaletteColor
        controlHighlight: PaletteColor
        componentBackground: PaletteColor
        standardFont: FontStyle
        listHoverColor: PaletteColor,
        foregroundColor: PaletteColor,
        paper:PaletteColor
    }
    interface ThemeOptions {
        appbackground?: PaletteColor,
        controlHighlight?: PaletteColor
        componentBackground?: PaletteColor,
        standardFont?: FontStyle,
        listHoverColor?: PaletteColor,
        foregroundColor?: PaletteColor,
        paper?:PaletteColor
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
    controlHighlight: {
        light: "rgba(255,255,255,0.2)",
        main: "green",
        dark: "rgba(128,128,128,0.5)",
        contrastText: "orange"
    },
    componentBackground: {
        light: "linear-gradient(to bottom, #C00BA0, #00AAAA)",
        main: "blue",
        dark: "#3A3952",
        contrastText: "orange"
    },
    standardFont: {
        fontSize: 12,
        fontFamily: "roboto",
        fontWeightLight: 200,
        fontWeightRegular: 300,
        fontWeightMedium: 400,
        fontWeightBold: 800
    },
    listHoverColor: {
        light: "rgba(255,255,255,0.45)",
        main: "blue",
        dark: "rgba(200,200,200,0.4)",
        contrastText: "orange"
    },
    foregroundColor: {
        light: "black",
        main: "blue",
        dark: "white",
        contrastText: "orange"
    },
    paper:{
        light: "rgba(230,230,230,0.45)",
        main: "blue",
        dark: "#3A3952",
        contrastText: "orange"
    },
    overrides: {
    }
})

export default theme