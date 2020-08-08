import React, { useState, useContext, useCallback, useEffect } from 'react';
import { Paper, Grid, makeStyles, createStyles, Typography, Button, Link, Hidden, FormControlLabel, Switch, Tooltip } from '@material-ui/core'
import { useParams } from "react-router-dom";
import RangedTextField, { range as PercentageRange } from 'src/components/Layout/PageContent/Common/RangedTextField'
import { EthereumContext } from 'src/components/contexts/EthereumContext';
import { BlockchainTransaction, BlockchainReceipt, ethToWei, getAvailableBorrows } from '../../../../../blockchain/EthereumAPI'
import { useAlert } from 'react-alert'
import Loading from '../../Common/Loading'
import StatsPanel, { jaNee } from '../../Common/StatsPanel'
import { ImgSrc } from '../../Common/TokenImage';

interface assetProps {
    setRedirect: (r: string) => void
}

const useAssetStyles = makeStyles(theme => createStyles({
    PurchaseCell: {
        minWidth: "500px",
        [theme.breakpoints.up('sm')]: {
            width: "70%",
        },
        [theme.breakpoints.down('md')]: {
            width: "95%",
        },
        padding: "20px"
    },
    StatsCell: {
        maxWidth: "600px",
        width: "25%",
    },
    ContainerGrid: {
        margin: "50px 0 0 25px",
        minHeight: "900px",
    },
    hiddenContainerGrid: {
        display: 'none'
    }

}))

export function Asset(props: assetProps) {
    const { assetId } = useParams()
    const classes = useAssetStyles()
    const [loading, setLoading] = useState<boolean>(true)
    const [borrowingEnabled, setBorrowingEnabled] = useState<jaNee>('YES')

    return (<div>
        <Loading invisible={!loading} />
        <Grid
            container
            direction="row"
            justify="flex-start"
            alignItems="stretch"
            spacing={3}
            className={loading ? classes.hiddenContainerGrid : classes.ContainerGrid}
        >
            <Grid item className={classes.PurchaseCell}>
                <StyledPaper>
                    <BorrowPanel assetId={assetId} setRedirect={props.setRedirect} setLoading={setLoading} borrowingEnabled={borrowingEnabled} />
                </StyledPaper>
            </Grid>
            <Hidden mdDown>
                <Grid item className={classes.StatsCell}>
                    <StyledPaper>
                        <StatsPanel assetId={assetId} borrowingEnabled={borrowingEnabled} setBorrowingEnabled={setBorrowingEnabled} />
                    </StyledPaper>
                </Grid>
            </Hidden>
        </Grid>
    </div>)
}

const useBorrowStyles = makeStyles(theme => createStyles({
    borrowButton: {
        backgroundColor: theme.buttonColor[theme.palette.type],
        color: 'white',
        "&:disabled": {
            backgroundColor: "#E1E1E1",
            dark: {
                color: 'white'
            },
            light: {
                color: '919191'
            }
        },
    },
    link: {
        fontFamily: theme.standardFont.fontFamily,
        fontSize: theme.standardFont.fontSize,
        fontWeight: theme.standardFont.fontWeightMedium,
        color: theme.LinkColor[theme.palette.type],
        '&:hover': {
            color: 'magenta',
            textDecoration: 'none'
        }
    },
    approvalButton: {
        backgroundColor: theme.buttonColor[theme.palette.type],
        color: theme.foregroundColor[theme.palette.type],
    }
    , grid: {
        textAlign: 'center',
        marginTop: '-16px'
    },
    narrowColumn: {
        width: '600px'
    }
}))

enum PurchasePanelTransactionStates {
    loading,
    borrowClicked,
    borrowAwaitingUserWalletConfirmation,
    awaitingborrowBlockConfirmation,
    borrowFailed,
    borrowSuccess,
}

interface purchasePanelProps {
    assetId: string,
    setRedirect: (r: string) => void
    setLoading: (l: boolean) => void
    borrowingEnabled: jaNee
}


enum InterestRateMode { NONE = 0, STABLE, VARIABLE }

function BorrowPanel(props: purchasePanelProps) {
    const classes = useBorrowStyles()
    const alerter = useAlert()
    const ethereumContext = useContext(EthereumContext)
    const [borrowValue, setBorrowValue] = useState<string>('')
    const [valid, setValid] = useState<boolean>(false)
    const [transaction, setTransaction] = useState<BlockchainTransaction | Promise<BlockchainReceipt> | Promise<BlockchainTransaction> | undefined>()
    const [transactionState, setTransactionState] = useState<PurchasePanelTransactionStates>(PurchasePanelTransactionStates.loading)
    const [percentage, setPercentage] = useState<PercentageRange>(0)
    const [borrowLimit, setBorrowLimit] = useState<string>('0')
    const [borrowMode, setBorrowMode] = useState<InterestRateMode>(InterestRateMode.VARIABLE)
    const [interestRateModesEnabled, setInterestRateModesEnabled] = useState<InterestRateMode[]>([])
    const imageLoader = ImgSrc(ethereumContext.network)
    const tokenName = imageLoader(props.assetId).name

    const resetInput = () => {
        setBorrowValue('')
        setPercentage(0)

    }

    const borrowModeCallback = useCallback(async () => {
        if (ethereumContext.blockchain) {
            const blockchain = ethereumContext.blockchain
            const modes: InterestRateMode[] = [InterestRateMode.VARIABLE]
            if (await blockchain.contracts.LendingPoolCore.isUserAllowedToBorrowAtStable(props.assetId, blockchain.account, borrowValue))
                modes.push(InterestRateMode.STABLE)
            else setBorrowMode(InterestRateMode.VARIABLE)
            setInterestRateModesEnabled(modes)

        }
    }, [borrowValue])

    useEffect(() => {
        borrowModeCallback()
    }, [borrowValue, ethereumContext.blockchain])

    const blockChainInteractionCallBack = useCallback(async () => {
        if (ethereumContext.blockchain) {
            const blockchain = ethereumContext.blockchain
            setBorrowLimit(await getAvailableBorrows(props.assetId, ethereumContext.blockchain.contracts, ethereumContext.blockchain.metamaskConnections))


            props.setLoading(false)
            switch (transactionState) {
                case PurchasePanelTransactionStates.awaitingborrowBlockConfirmation:
                    alerter.info('awaiting blockchain confirmation')
                    const borrowReceipt = await (transaction as Promise<BlockchainReceipt>)

                    if (borrowReceipt.status === 0) {
                        setTransactionState(PurchasePanelTransactionStates.borrowFailed)
                    } else {
                        resetInput()
                        setTransactionState(PurchasePanelTransactionStates.borrowSuccess)
                    }
                    break;
                case PurchasePanelTransactionStates.borrowAwaitingUserWalletConfirmation:
                    if (!transaction) {
                        setTransactionState(PurchasePanelTransactionStates.borrowFailed)
                        alerter.error('user cancelled')
                        break;
                    }
                    alerter.info('wallet request pending')
                    const waiter = (await (transaction as Promise<BlockchainTransaction>)).wait()
                    setTransaction(waiter)
                    setTransactionState(PurchasePanelTransactionStates.awaitingborrowBlockConfirmation)
                    break;

                case PurchasePanelTransactionStates.borrowClicked:
                    const borrowTX = blockchain
                        .contracts
                        .LendingPool
                        .borrow(props.assetId, ethToWei(borrowValue), borrowMode, 0,{gasLimit:'900000'})

                    setTransaction(borrowTX)
                    setTransactionState(PurchasePanelTransactionStates.borrowAwaitingUserWalletConfirmation)

                    break;
                case PurchasePanelTransactionStates.borrowFailed:
                    setTransaction(undefined)
                    alerter.error('Borrow transaction failed')
                    break;

                case PurchasePanelTransactionStates.borrowSuccess:
                    alerter.success('Borrow transaction succeeded')
                    setTransaction(undefined)
                    break;
            }


        }
    }, [transactionState])


    useEffect(() => {
        blockChainInteractionCallBack()
    }, [transactionState])

    return (
        <Grid
            container
            direction="column"
            justify="flex-start"
            alignItems="center"
            spacing={5}
            className={classes.grid}
        >
            <Grid item>
                <Typography variant="h4" color="secondary">
                    How much would you like to borrow?
            </Typography>
            </Grid>
            <Grid item className={classes.narrowColumn}>
                <Typography variant="body1">
                    Here you can set the amount you want to borrow. You can manually enter a specific amount or use the percentage buttons below.
                </Typography>
            </Grid>
            <Grid item>
                <RangedTextField
                    setValid={setValid}
                    onChange={setBorrowValue}
                    value={borrowValue}
                    assetId={props.assetId}
                    percentage={percentage}
                    setPercentage={setPercentage}
                    limit={borrowLimit} />
            </Grid>
            <Grid item>
                You can borrow a maximum of {borrowLimit} {tokenName}
            </Grid>
            <Grid item>
                <Button
                    className={classes.borrowButton}
                    disabled={!valid || props.borrowingEnabled === 'NO'}
                    onClick={() => setTransactionState(PurchasePanelTransactionStates.borrowClicked)}>
                    Borrow
                </Button>
            </Grid>
            <InterestRateModePicker mode={borrowMode} setMode={setBorrowMode} permittedModes={interestRateModesEnabled} />
            <Grid item>
                <Link className={classes.link} component="button" onClick={() => props.setRedirect('/borrow')}>Go back</Link>
            </Grid>
        </Grid>)
}

const interestRateModeStrings = ['None', 'Stable', 'Variable']

interface interestRateModePickerProps {
    mode: InterestRateMode
    setMode: (m: InterestRateMode) => void
    permittedModes: InterestRateMode[]
}

function InterestRateModePicker(props: interestRateModePickerProps) {
    let nextMode: InterestRateMode

    switch (props.mode) {
        case InterestRateMode.NONE:
        case InterestRateMode.STABLE:
            nextMode = InterestRateMode.VARIABLE;
            break;
        case InterestRateMode.VARIABLE:
            nextMode = InterestRateMode.STABLE

    }
    const disableStable = props.permittedModes.findIndex(m => m === InterestRateMode.STABLE) === -1

    return (<OptionalToolTip show={disableStable}>
        <FormControlLabel
            control={
                <Switch
                    checked={props.mode === InterestRateMode.VARIABLE || disableStable}
                    onClick={() => { if (!disableStable) props.setMode(nextMode) }}
                    name="modePicker"
                    disabled={disableStable || undefined}
                />
            }
            label={interestRateModeStrings[disableStable ? InterestRateMode.VARIABLE : props.mode]}
        />
    </OptionalToolTip>)
}


function OptionalToolTip(props: { show: boolean, children?: any }) {
    return props.show ? <Tooltip title="You can't choose stable interest on a reserve which you are already using as collateral.">
        {props.children}
    </Tooltip> : <div>{props.children}</div>
}

const paperStyles = makeStyles(theme => createStyles({
    root: {
        backgroundColor: theme.paper[theme.palette.type],
        height: "100%",
        width: "100%",
        color: theme.foregroundColor[theme.palette.type]
    }
}))

function StyledPaper(props: { children?: any }) {

    const classes = paperStyles()
    return <Paper className={classes.root}>
        {props.children}
    </Paper>
}