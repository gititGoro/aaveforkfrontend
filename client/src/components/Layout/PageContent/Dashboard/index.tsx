import React from 'react';
import { Grid, makeStyles, createStyles } from '@material-ui/core'

import ContractSelector from "./ContractSelector"
const useStyles = makeStyles(theme => createStyles({
    root: {
        display: "flex",
        color: "white",
        fontFamily: theme.standardFont.fontFamily,
        fontSize: theme.standardFont.fontSize
    },
    gridItem: {
        flexGrow: 1,
    }
}));

export default function Dashboard() {

    const classes = useStyles()
    return <div className={classes.root}><Grid container
        direction="row"
        justify="space-between"
        alignItems="center"
        spacing={4}

    >
        <Grid item className={classes.gridItem}>
        </Grid>
        <Grid item className={classes.gridItem}>
            <Grid
                container
                direction="column"
                justify="center"
                alignItems="center"
                spacing={10}
            >
                <Grid item>
                    <ContractSelector />
                </Grid>
            </Grid>

        </Grid>
        <Grid item className={classes.gridItem}>

        </Grid>
    </Grid>
    </div>
}