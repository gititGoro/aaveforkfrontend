import React, { useState } from 'react';
import { Grid, makeStyles, createStyles, Theme, Button, Typography, Paper } from '@material-ui/core';
import { SearchBox, AssetDropDown } from '../Common/index'
/*
LendingPool.getUserReserveData
     uint256 currentATokenBalance,
     uint256 currentBorrowBalance,
     uint256 principalBorrowBalance,
     uint256 borrowRateMode,
     uint256 borrowRate,
     uint256 liquidityRate,
     uint256 originationFee,
     uint256 variableBorrowIndex,
     uint256 lastUpdateTimestamp,
     bool usageAsCollateralEnabled
*/
//TODO: search for user address, search for asset address

const pageStyles = makeStyles((theme: Theme) => createStyles({
    root: {
        margin: '25px 0 0 25px',

    },
    cell: {
    }
}))

export default function Liquidation() {
    const classes = pageStyles()
    return <Grid
        container
        direction="column"
        justify="center"
        alignItems="center"
        className={classes.root}
    >
        <Grid item className={classes.cell}>
            <TopLevelSearch />
        </Grid>

    </Grid>
}

const topLevelSearchStyles = makeStyles(theme => createStyles({
    root: {

        color: theme.foregroundColor[theme.palette.type]
    },
    cell: {

        color: theme.foregroundColor[theme.palette.type]
    },
    controlsGrid: {
        color: theme.foregroundColor[theme.palette.type]
    },
    controlsCell: {
        color: theme.foregroundColor[theme.palette.type]
    },
    searchPaper: {
        background: theme.paper[theme.palette.type],
        color: theme.foregroundColor[theme.palette.type],

        padding: 10
    },
    typography: {
        color: theme.foregroundColor[theme.palette.type]
    }, button: {
        color: theme.buttonColor[theme.palette.type]

    }
}))


interface topLevelProps {

}

function TopLevelSearch(props: topLevelProps) {
    const classes = topLevelSearchStyles()
    const [asset, setAsset] = useState<string>("")
    const [searchUser, setSearchUser] = useState<string>("")

    return (
        <Paper className={classes.searchPaper}>
            <Typography variant='h4' className={classes.typography} >
                Search for loan
          </Typography>
            <Grid container
                direction="column"
                justify='flex-start'
                alignItems='flex-start'
                className={classes.root}
                spacing={2}
            >
                <Grid item className={classes.cell}>
                    <Grid
                        container
                        direction="row"
                        justify="flex-start"
                        alignItems="center"
                        className={classes.controlsGrid}
                        spacing={2}
                    >
                        <Grid item className={classes.controlsCell}>
                            <AssetDropDown asset={asset} onChange={setAsset} />
                        </Grid>
                        <Grid item className={classes.controlsCell}>
                            <SearchBox
                                value={searchUser}
                                onChange={setSearchUser}
                                label="user"
                                placeholder="0x0000000000000000000000000000000000000000" />
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item className={classes.cell}>
                    <Button className={classes.button} variant="contained">Search for loan</Button>
                </Grid>
            </Grid>
        </Paper>)
}

