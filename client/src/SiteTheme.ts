import { createMuiTheme } from '@material-ui/core/styles'
import { PaletteColor } from '@material-ui/core/styles/createPalette'

declare module '@material-ui/core/styles/createMuiTheme' {
    interface Theme {
        appbackground: PaletteColor
    }
    interface ThemeOptions {
        appbackground?:PaletteColor
    }
}


const theme = createMuiTheme({
    appbackground:
    {
        light: "linear-gradient(to bottom right, #FE6B8B, #00AAAA)",
        main: "blue",
        dark: "green",
        contrastText: "orange"
    },
    palette: {
		type: 'dark'
	},
})

export default theme