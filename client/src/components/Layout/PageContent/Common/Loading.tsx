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

const phrases = [
    'Loading',
    'Recharging flux capacitor',
    'Inserting kyber crystals',
    'Gazing into a Palintir',
    'Reassembling the blockchain',
    'Synthesizing quarks',
    'Fusing atomic nuclei',
    'Correcting spin gravity',
    'Constructing alcubier drive',
    'Contacting Satoshi Nakamoto',
    'Resolving Fermi Paradox',
    'Overriding Voi Kernel',
    'Establishing rift to Kelewan',
    'Stabilizing tokamak plasma field',
    'Crossing the Helcaraxë',
    'Retrieving the Horadric cube',
    'Manufacturing Ringworld scrith',
    'Installing Windows 95',
    'Dissolving central banking',
    'Requesting aide from Numenor',
    'Lighting the beacons of Gondor'
]

export default function Loading(props: { invisible?: boolean }) {
    if (props.invisible)
        return <div></div>
    const classes = loadingStyles()
    const phrase = phrases[Math.trunc(Math.random() * phrases.length)]
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
                {phrase}....
                </Typography>
        </Grid>
    </Grid>
}