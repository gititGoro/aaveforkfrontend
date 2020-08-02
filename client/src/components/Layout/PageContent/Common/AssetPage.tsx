import React, { useState, useCallback, useContext, useEffect } from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Switch,
    Grid,
    FormControl,
    InputLabel,
    Input,
    InputAdornment,
    Paper,
    Button,
    createStyles,
    makeStyles,
    Container,
    Typography,
} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import Loading from './Loading'

import imageData from '../../../../images/dataimages.json'
import { EthereumContext } from "../../../contexts/EthereumContext"
import { LoadAToken } from '../../../../blockchain/EthereumAPI'

import { AToken } from 'src/blockchain/typechain-types/ethers/AToken';

const topLevelStyles = makeStyles(theme => createStyles({
    invisibleContainer: {
        display: "none"
    },
    cell: {
        width: "80%"
    }
}))

export interface AssetPageProps {
    column1Heading: string
    column2Heading: string
    column3Heading: string

    column1Query?: (aToken: AToken) => Promise<string>
    column2Query?: (aToken: AToken) => Promise<string>
    column3Query?: (aToken: AToken) => Promise<string>

    action?: (aToken: AToken) => Promise<void>
    actionLabel?: (aToken: AToken) => Promise<string>
}

export default function AssetPage(props: AssetPageProps) {
    const classes = topLevelStyles()
    const ethereumContextProps = useContext(EthereumContext)
    const [searchText, setSearchText] = useState<string>("")
    const [allTokens, setAllTokens] = useState<boolean>(true)

    const [rows, setRows] = useState<Row[]>([])

    const imageLoader = ImgSrc(ethereumContextProps.network)
    const contractListCallBack = useCallback(async () => {
        if (ethereumContextProps.blockchain) {
            const blockchain = ethereumContextProps.blockchain
            let addresses = await ethereumContextProps.blockchain.contracts.LendingPool.getReserves()
            const fullAddresses = [...addresses/*,blockchain.contracts.EthAddress*/] //TODO load eth address

            const rowPromises = fullAddresses.map(async (address): Promise<Row> => { //TODO: graph query
                const aTokenAddress = await blockchain.contracts.LendingPoolCore.getReserveATokenAddress(address)
                const aToken = LoadAToken(aTokenAddress, blockchain.metamaskConnections.signer)
                const icon: AssetIcon = imageLoader(address)

                return {
                    icon,
                    column1: props.column1Query ? await props.column1Query(aToken) : '',
                    column2: props.column2Query ? await props.column2Query(aToken) : '',
                    column3: props.column3Query ? await props.column3Query(aToken) : '',
                    actionHeading: props.actionLabel ? (await props.actionLabel(aToken)) : '',
                    redirectAction: () => props.action ? props.action(aToken) : {}
                }
            })
            let r: Row[] = []
            for (let i = 0; i < rowPromises.length; i++) {
                r.push(await rowPromises[i])
            }
            setRows(r)
        }
    }, [ethereumContextProps.blockchain])

    useEffect(() => {
        contractListCallBack()
    })


    return (<div>
        <Grid
            container
            direction="column"
            justify="center"
            alignItems="center"
            spacing={5}
            className={rows.length === 0 ? classes.invisibleContainer : undefined}
        >
            <Grid item>
                <TopSelectors setSearchText={setSearchText} searchText={searchText} allChecked={allTokens} setAllChecked={setAllTokens} />
            </Grid>
            <Grid item className={classes.cell}>
                <AssetGrid Column1Heading={props.column1Heading}
                    Column2Heading={props.column2Heading}
                    Column3Heading={props.column3Heading}
                    rows={rows}
                    stablecoinsOnly={!allTokens}
                    searchText={searchText}
                />
            </Grid>
        </Grid>
        <Loading invisible={rows.length > 0} />
    </div>)
}

interface topSelectorProps {
    setSearchText: (t: string) => void
    setAllChecked: (a: boolean) => void
    allChecked: boolean
    searchText: string
}

const topSelectorStyles = makeStyles(theme => createStyles({
    root: {
        color: theme.foregroundColor[theme.palette.type]
    },
    buffer: {
        width: "400px"
    }
}))

function TopSelectors(props: topSelectorProps) {
    const selectorText = props.allChecked ? "All tokens" : "Stablecoins only"
    const classes = topSelectorStyles()

    return <Grid
        container
        direction="row"
        justify="space-between"
        alignItems="center"
        spacing={5}
        className={classes.root}
    >
        <Grid item>
            <Container className={classes.buffer}> <Switch checked={props.allChecked} onClick={() => props.setAllChecked(!props.allChecked)} /> {selectorText}</Container>
        </Grid>
        <Grid item>
            <FormControl fullWidth >
                <InputLabel className={classes.root} htmlFor="searchTextBox">Search</InputLabel>
                <Input
                    id="searchTextBox"
                    value={props.searchText}
                    onChange={(event) => props.setSearchText(event.target.value)}
                    endAdornment={<InputAdornment position="end"><SearchIcon /></InputAdornment>}
                    className={classes.root}
                />
            </FormControl>
        </Grid>
    </Grid>
}

export interface AssetIcon {
    BASE64: any,
    name: string
}

export interface Row {
    icon: AssetIcon
    column1: string
    column2: string
    column3: string
    actionHeading: string
    redirectAction: () => void
}

interface AssetGridProps {
    Column1Heading: string
    Column2Heading: string
    Column3Heading: string
    rows: Row[]
    stablecoinsOnly: boolean
    searchText: string
}

const useStyles = makeStyles(theme => createStyles({
    tableContainer: {
        backgroundColor: theme.paper[theme.palette.type],
        maxHeight: "800px",
        overflowY: "scroll",
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
    }
}))

function StyledCell(props: { children?: any }) {
    const classes = useStyles()
    return <TableCell className={classes.table}>{props.children}</TableCell>
}

function AssetGrid(props: AssetGridProps) {
    const classes = useStyles()

    const stableFilterPredicate = props.stablecoinsOnly ? (r: Row) => {
        const name = r.icon.name.toLowerCase()
        return name == 'dai' || name.startsWith('usd') || name.endsWith('usd')
    } : (r: Row) => true
    const searchText = props.searchText.trim().toLowerCase()
    const searchFilterPredicate = searchText !== '' ?
        (r: Row) => {

            return (r.column1.toLowerCase().includes(searchText) || r.column2.toLowerCase().includes(searchText) || r.column3.toLowerCase().includes(searchText) || r.icon.name.toLowerCase().includes(searchText))
        } : (r: Row) => true

    const filteredRows = props.rows
        .filter(stableFilterPredicate)
        .filter(searchFilterPredicate)


    return filteredRows.length > 0 ? <TableContainer id='hello' component={Paper} className={classes.tableContainer}  >
        <Table className={classes.table} width={1 / 2}>
            <TableHead>
                <StyledCell>Asset</StyledCell>
                <StyledCell>{props.Column1Heading}</StyledCell>
                <StyledCell>{props.Column2Heading}</StyledCell>
                <StyledCell>{props.Column3Heading}</StyledCell>
                <StyledCell></StyledCell>
            </TableHead>
            <TableBody>
                {filteredRows
                    .map((row, i) => (
                        <TableRow key={i}>
                            <StyledCell>
                                <Grid
                                    container
                                    direction="row"
                                    justify="flex-start"
                                    alignItems="center"
                                    spacing={3}
                                >
                                    <Grid item>
                                        <img src={row.icon.BASE64} width={64} />
                                    </Grid>
                                    <Grid item>
                                        {row.icon.name}
                                    </Grid>
                                </Grid>
                            </StyledCell>
                            <StyledCell>
                                {row.column1}
                            </StyledCell>
                            <StyledCell>
                                {row.column2}
                            </StyledCell>
                            <StyledCell>
                                {row.column3}
                            </StyledCell>
                            <StyledCell>
                                <Button variant="contained" color="secondary" onClick={() => row.redirectAction()}>{row.actionHeading}</Button>
                            </StyledCell>
                        </TableRow>
                    ))}
            </TableBody>
        </Table>
    </TableContainer> : <div className={classes.emptySearch}>
            <Typography variant="h5">
                There are no currencies matching the parameters
            </Typography>
        </div>
}


const ImgSrc = (network: string) => {
    const images = imageData.filter(n => n.network === network)

    return (address: string): AssetIcon => {
        if (images.length) {
            const imageBlob = images[0].images
            const token = imageBlob.filter(i => i.address.toLowerCase() === address.toLowerCase())
            if (token.length)
                return token[0]
            return { name: "", BASE64: "" }
        }
        return { name: "", BASE64: "" }
    }
}