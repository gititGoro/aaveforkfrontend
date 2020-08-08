import React, { useState, useCallback, useEffect, useContext } from 'react';
import { Grid, makeStyles, createStyles, Theme, Button, Typography, Paper, Divider, CircularProgress, TableContainer, Table, TableHead, TableCell, TableBody, TableRow } from '@material-ui/core';
import { SearchBox, AssetDropDown } from '../Common/index'
import { Loading } from '../Common/index'
import { EthereumContext } from 'src/components/contexts/EthereumContext';
import { weiToEthString, ethValueOfReserve } from 'src/blockchain/EthereumAPI'
import BigNumber from 'bignumber.js'
import LiquidationCallDialog from './LiquidationCallDialog'
const pageStyles = makeStyles((theme: Theme) => createStyles({
    root: {
        margin: '25px 0 0 25px',

    },
    cell: {
    }
}))

export default function Liquidation(props: { loading: boolean }) {
    const classes = pageStyles()

    const [asset, setAsset] = useState<string>("")
    const [searchUser, setSearchUser] = useState<string>("")
    const [renderLoans, setRenderLoans] = useState<boolean>(false)
    const [searchClicked, setSearchClicked] = useState<boolean>(false)
    const [addressesValid, setAddressesValid] = useState<boolean>(false)
    const [foundLoan, setFoundLoan] = useState<boolean>(false)
    const [showLiquidationPopup, setShowLiquidationPopup] = useState<boolean>(false)
    const [assetDebt, setAssetDebt] = useState<string>('')

    const searchCallback = useCallback(() => {
        if (searchClicked) {
            setRenderLoans(addressesValid)
            setSearchClicked(false)
            setFoundLoan(false)
        }
    }, [searchClicked])

    useEffect(() => {
        searchCallback()
    })

    useEffect(() => {
        var pattern: RegExp = /^0x[a-fA-F0-9]{40}$/
        setAddressesValid(pattern.test(asset) && pattern.test(searchUser))
    }, [asset, searchUser])

    return props.loading ? <Loading /> :
        <div>
            <LiquidationCallDialog
                show={showLiquidationPopup}
                accountToLiquidate={searchUser}
                reserveLoan={asset}
                onClose={() => setShowLiquidationPopup(false)}
                debt={assetDebt}
            />
            <Grid
                container
                direction="column"
                justify="center"
                alignItems="center"
                className={classes.root}
            >
                <Grid item className={classes.cell}>
                    <TopLevelSearch
                        asset={asset}
                        user={searchUser}
                        setAsset={setAsset}
                        setUser={setSearchUser}
                        onSearch={() => setSearchClicked(true)}
                        valid={addressesValid} />
                </Grid>
                {renderLoans ? <Grid item>
                    <Loans asset={asset}
                        user={searchUser}
                        found={foundLoan}
                        setFound={setFoundLoan}
                        showLiquidationPopup={() => setShowLiquidationPopup(true)}
                        assetDebt={assetDebt}
                        setAssetDebt={setAssetDebt}
                    />
                </Grid> : <div></div>}
            </Grid>
        </div>
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
        color: theme.foregroundColor[theme.palette.type],
        fontFamily: theme.standardFont.fontFamily,
        marginBottom: '15px'
    }, button: {
        color: theme.buttonColor[theme.palette.type]

    },
    divider: {
        backgroundColor: 'grey',
        margin: '10px 0 10px 0'
    }
}))


interface topLevelProps {
    user: string,
    asset: string
    setUser: (u: string) => void
    setAsset: (a: string) => void
    onSearch: () => void
    valid: boolean
}

function TopLevelSearch(props: topLevelProps) {
    const classes = topLevelSearchStyles()
    const disabled = props.valid ? undefined : true

    return (
        <Paper className={classes.searchPaper}>
            <Typography variant='h5' className={classes.typography} >
                Search for liquidation opportunities
          </Typography>
            <Divider variant="fullWidth" className={classes.divider} />
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
                            <AssetDropDown asset={props.asset} onChange={props.setAsset} />
                        </Grid>
                        <Grid item className={classes.controlsCell}>
                            <SearchBox
                                value={props.user}
                                onChange={props.setUser}
                                label="user"
                                placeholder="0x0000000000000000000000000000000000000000" />
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item className={classes.cell}>
                    <Button disabled={disabled} className={classes.button} variant="contained" onClick={() => props.onSearch()}>Search for loan</Button>
                </Grid>
            </Grid>
        </Paper>)
}

const loanStyles = makeStyles(theme => createStyles({
    root: {
        marginTop: '20px'
    },
    spinner: {
        color: theme.palette.type === 'light' ? 'red' : 'blue',
        backgroundColor: 'green'
    },
    tableContainer: {
        backgroundColor: theme.paper[theme.palette.type],
        maxHeight: "800px",
        width: "100%"
    },
    table: {
        color: theme.foregroundColor[theme.palette.type]

    },
    emptySearch: {
        position: "absolute",
        left: "50%",
        top: "50%",
        transform: "translate(-50%, -50%)",
        color: "rgb(0,192,216)"
    },
    redCell: {
        color: 'red'
    },
    greenCell: {
        color: 'green'
    }
}))

interface loanProps {
    asset: string,
    user: string
    found: boolean
    setFound: (f: boolean) => void
    showLiquidationPopup: () => void
    assetDebt: string
    setAssetDebt: (d: string) => void
}

interface styledCellProps {
    color?: 'red' | 'green'
    children?: any
}

function StyledCell(props: styledCellProps) {
    const classes = loanStyles()
    const colorClass = props.color ? classes[props.color + 'Cell'] : classes.table
    return <TableCell className={colorClass}>{props.children}</TableCell>
}


function Loans(props: loanProps) {
    const classes = loanStyles()
    const ethereumContext = useContext(EthereumContext)
    const [health, setHealth] = useState<string>("")
    const [userCollateral, setUserCollateral] = useState<string>('')

    const canLiquidate: boolean = new BigNumber(health).lt(1)

    const userReserveCallback = useCallback(async () => {
        if (ethereumContext.blockchain && !props.found) {
            const blockchain = ethereumContext.blockchain
            const userReserveData = await blockchain.contracts.LendingPool.getUserReserveData(props.asset, props.user)
            const userData = await blockchain.contracts.LendingPool.getUserAccountData(props.user)
            setUserCollateral(weiToEthString(userData.totalCollateralETH))
            props.setAssetDebt(await ethValueOfReserve(props.asset, userReserveData.currentBorrowBalance, { contracts: blockchain.contracts, wallet: blockchain.metamaskConnections }))
            setHealth(weiToEthString(userData.healthFactor))
            props.setFound(true)
        }
    }, [ethereumContext.blockchain, props.found])

    useEffect(() => {
        userReserveCallback()
    }, [props.found])

    return <div className={classes.root}>
        {!props.found ? <CircularProgress color="secondary" /> :


            <TableContainer component={Paper} className={classes.tableContainer}  >
                <Table className={classes.table} width={1 / 2}>
                    <TableHead>
                        <StyledCell>Asset</StyledCell>
                        <StyledCell>Health Factor</StyledCell>
                        <StyledCell>Debt to Cover (ETH)</StyledCell>
                        <StyledCell>Collateral (ETH) </StyledCell>
                        <StyledCell></StyledCell>
                    </TableHead>
                    <TableBody>
                        <TableRow>
                            <StyledCell>
                                {props.asset}
                            </StyledCell>
                            <StyledCell color={canLiquidate ? 'red' : 'green'}>
                                {health}
                            </StyledCell>
                            <StyledCell>
                                {props.assetDebt}
                            </StyledCell>
                            <StyledCell>
                                {userCollateral}
                            </StyledCell>
                            <StyledCell>
                                <Button color="secondary" onClick={() => props.showLiquidationPopup()}>Liquidate</Button>
                            </StyledCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        }
    </div>
}
