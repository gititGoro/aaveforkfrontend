import React from 'react';
import { Grid, makeStyles } from '@material-ui/core'
import WalletHeader from "./WalletHeader"
import Admin from './Admin/index'

const useStyles = makeStyles({
    root: {
        display: "flex"
    },
    gridItem: {
        flexGrow: 1,
    }
});

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
                    <WalletHeader />
                </Grid>
                <Grid item>
                    User section
                </Grid>
                <Grid item>
                  <Admin />
                </Grid>
            </Grid>

        </Grid>
        <Grid item className={classes.gridItem}>

        </Grid>
    </Grid>
    </div>
}