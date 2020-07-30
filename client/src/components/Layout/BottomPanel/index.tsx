import React, { useState } from 'react';
import { makeStyles, createStyles, Grid, Typography, Switch } from '@material-ui/core';

const useStyles = makeStyles(theme => createStyles({
    root: {
        height: "60px",
        width: "400px",
        position: "fixed",
        bottom: 0,
        right: 0,
        overflowX:"hidden"
    },
    controlsDark: {
        color: "white",
        fontFamily: theme.standardFont.fontFamily
    },
    controlsLight: {
        color: "grey",
        fontFamily: theme.standardFont.fontFamily
    }, grid: {
        marginTop:15,
    }
}))

export type brightMode = 'light' | 'dark'

interface props {
    setBrightMode: (mode: brightMode) => void
    brightMode: brightMode
}

export default function BottomPanel(props: props) {
    const classes = useStyles()
    const switchMessage = props.brightMode === 'light' ? 'Dark theme: off' : 'Dark theme: on'
    const [mode, setMode] = useState<brightMode>(props.brightMode)

    const controlsClass = mode === 'light' ? classes.controlsLight : classes.controlsDark

    const alterMode = (m: brightMode) => {
        setMode(m)
        setTimeout(() => {
            props.setBrightMode(m)
        }, (100));
    }

    return <div className={classes.root}>
        <Grid
            container
            direction="row"
            justify="flex-end"
            alignItems="flex-end"
            className={classes.grid}
        >
            <Grid item>
                <Grid
                    container
                    direction="row"
                    justify="center"
                    alignItems="center"
                    className={controlsClass}
                    spacing={1}
                >
                    <Grid item>
                        <Typography>{switchMessage}</Typography>
                    </Grid>
                    <Grid item>
                        <Switch onClick={() => alterMode(props.brightMode === 'light' ? 'dark' : 'light')} checked={mode === 'dark'}></Switch>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    </div>
}