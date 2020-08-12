import React from 'react';
import { makeStyles, createStyles, Grid, Button } from '@material-ui/core';



const landingStyles = makeStyles(theme => createStyles({
    root: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        margin: '-100px 0 0 -25px'
    },
    BigCell: {
        color: '#69C3C8',
        fontFamily: theme.standardFont.fontFamily,
        fontWeight: theme.standardFont.fontWeightBold,
        fontSize: theme.standardFont.fontSize + 15
    }
}))

interface props{
    setRedirect:(s:string)=>void
}

export default function LandingPage(props:props) {
    const classes = landingStyles()
    return <div className={classes.root}>
        <Grid
            container
            direction="column"
            justify="center"
            alignItems="center"
            spacing={3}
        >
            <Grid item className={classes.BigCell}>
                No deposits yet
      </Grid>
            <Grid item>
                <Button variant='contained' color='primary' onClick={() => props.setRedirect('/deposit')}>Deposit now</Button>
            </Grid>
        </Grid>
    </div>

}