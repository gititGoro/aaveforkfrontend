import doge from '../../../../images/loadingdog.gif'
import React from 'react';
import {
    Grid,
    createStyles,
    makeStyles,
    Typography,
} from '@material-ui/core';
const loadingStyles = makeStyles(theme => createStyles({
    dogeText: {
        color: theme.foregroundColor[theme.palette.type],
        fontFamily: theme.standardFont.fontFamily
    }
}))

export default function Loading(props: { invisible?: boolean }) {
    if (props.invisible)
        return <div></div>
    const classes = loadingStyles()
    return <Grid
        container
        direction="column"
        justify="space-between"
        alignItems="center"
        spacing={10}
    >
        <Grid item></Grid>
        <Grid item>
            <img src={doge} width={200} />
        </Grid>
        <Grid item>
            <Typography variant="h3" className={classes.dogeText}>
                Loading....
                </Typography>
        </Grid>
    </Grid>
}