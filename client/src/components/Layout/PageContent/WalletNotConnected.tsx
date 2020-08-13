import React from 'react';
import { makeStyles, createStyles, Grid, Link } from '@material-ui/core';



const landingStyles = makeStyles(theme => createStyles({
    root: {
        position: 'absolute',
        top: '50%',
        left: '40%',
        margin: '-100px 0 0 -25px'
    },
    BigCell: {
        color: '#69C3C8',
        fontFamily: theme.standardFont.fontFamily,
        fontWeight: theme.standardFont.fontWeightBold,
        fontSize: theme.standardFont.fontSize + 10
    },MediumCell:{
        color: '#79D3D8',
        fontFamily: theme.standardFont.fontFamily,
        fontWeight: theme.standardFont.fontWeightBold,
        fontSize: theme.standardFont.fontSize + 5
    },
    MetamaskLink:{
        color:theme.appbackground[theme.palette.type==='light'?'dark':'light'],
        fontFamily: theme.standardFont.fontFamily,
        fontWeight: theme.standardFont.fontWeightBold,
        fontSize: theme.standardFont.fontSize + 2
    }
}))

interface props{
}

export default function WalletNotConnected(props:props) {
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
                No Ethreum wallet detected. 
      </Grid>
      <Grid item className={classes.MediumCell}>
      Please either install Metamask or use the Brave browser
      </Grid>
            <Grid item>
                <Link className={classes.MetamaskLink} component="button" onClick = {()=>window.open('https://metamask.io/','_blank')}target='_blank'>Get Metamask</Link>
            </Grid>
        </Grid>
    </div>

}