import React, { useState, useContext, useCallback, useEffect } from 'react';
import { Paper, Grid, makeStyles, createStyles, Typography, Button, Link, Hidden } from '@material-ui/core'
import { useParams } from "react-router-dom";
import RangedTextField, { range as PercentageRange } from 'src/components/Layout/PageContent/Common/RangedTextField'
import { EthereumContext } from 'src/components/contexts/EthereumContext';
import { ApproveLendingPoolCore, LendingPoolCoreApproved, BlockchainTransaction, BlockchainReceipt, LoadERC20, weiToEthString, ethToWei, TokenAPY, WadMul } from '../../../../../blockchain/EthereumAPI'
import { useAlert } from 'react-alert'
import Loading from '../../Common/Loading'
import { ContractTransaction } from 'ethers';

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
                    <PurchasePanel assetId={assetId} setRedirect={props.setRedirect} setLoading={setLoading} />
                </StyledPaper>
            </Grid>
            <Hidden mdDown>
                <Grid item className={classes.StatsCell}>
                    <StyledPaper>
                        <StatsPanel assetId={assetId} />
                    </StyledPaper>
                </Grid>
            </Hidden>
        </Grid>
    </div>)
}

const usePurchaseStyles = makeStyles(theme => createStyles({
    despositButton: {
        backgroundColor: theme.buttonColor[theme.palette.type],
        color: theme.foregroundColor[theme.palette.type],
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
    unapprovedAndLoading = 0,
    approvalClicked,
    approvalAwaitingUserWalletConfirmation,
    awaitingApprovalBlockConfirmation,
    approvalFailed,
    approvedButDormant,
    depositClicked,
    depositAwaitingUserWalletConfirmation,
    awaitingDepositBlockConfirmation,
    depositFailed,
    depositSuccess,
}

interface purchasePanelProps {
    assetId: string,
    setRedirect: (r: string) => void
    setLoading: (l: boolean) => void
}

function PurchasePanel(props: purchasePanelProps) {
    const classes = usePurchaseStyles()
    const alert = useAlert()
    const ethereumContext = useContext(EthereumContext)
    const [purchaseValue, setPurchaseValue] = useState<string>('')
    const [valid, setValid] = useState<boolean>(false)
    const [transaction, setTransaction] = useState<BlockchainTransaction | Promise<BlockchainReceipt> | Promise<BlockchainTransaction> | undefined>()
    const [transactionState, setTransactionState] = useState<PurchasePanelTransactionStates>(PurchasePanelTransactionStates.unapprovedAndLoading)
    const [alertOnApproval, setAlertOnApproval] = useState<boolean>(false)
    const [balance, setBalance] = useState<string>("0")
    const [percentage, setPercentage] = useState<PercentageRange>(0)

    const resetInput = () => {
        setPurchaseValue('')
        setPercentage(0)

    }

    const blockChainInteractionCallBack = useCallback(async () => {
        props.setLoading(transactionState === PurchasePanelTransactionStates.unapprovedAndLoading)

        if (ethereumContext.blockchain) {
            const blockchain = ethereumContext.blockchain
            const token = LoadERC20(props.assetId, blockchain.metamaskConnections.signer)
            setBalance(weiToEthString((await token.balanceOf(blockchain.account)).toString()))
            switch (transactionState) {
                case PurchasePanelTransactionStates.unapprovedAndLoading:
                    const approved: boolean = await LendingPoolCoreApproved(props.assetId, blockchain.contracts, blockchain.metamaskConnections.signer)
                    if (approved) {
                        setTransactionState(PurchasePanelTransactionStates.approvedButDormant)
                    } else {
                        setTransactionState(PurchasePanelTransactionStates.approvalFailed)
                    }
                    break;
                case PurchasePanelTransactionStates.approvalClicked:
                    const tx = ApproveLendingPoolCore(props.assetId, blockchain.contracts, blockchain.metamaskConnections.signer)
                    if (tx) {
                        setTransaction(tx as Promise<ContractTransaction>)
                        setTransactionState(PurchasePanelTransactionStates.approvalAwaitingUserWalletConfirmation)
                        setAlertOnApproval(true)
                    }
                    break;
                case PurchasePanelTransactionStates.approvalAwaitingUserWalletConfirmation:
                    if (!transaction) {
                        setTransactionState(PurchasePanelTransactionStates.approvalFailed)
                        alert.error('user cancelled')
                        break;
                    }
                    alert.info('wallet request pending')
                    const approvalWait = (await (transaction as Promise<BlockchainTransaction>)).wait()
                    setTransaction(approvalWait)
                    setTransactionState(PurchasePanelTransactionStates.awaitingApprovalBlockConfirmation)
                    break;
                case PurchasePanelTransactionStates.approvalFailed:
                    if (alertOnApproval)
                        alert.error('Approve transaction failed')
                    setAlertOnApproval(true)
                    setTransaction(undefined)
                    break;
                case PurchasePanelTransactionStates.approvedButDormant:
                    if (alertOnApproval)
                        alert.success('Asset approved for deposit.')
                    setAlertOnApproval(false)
                    setTransaction(undefined)
                    break;
                case PurchasePanelTransactionStates.awaitingApprovalBlockConfirmation:
                    alert.info('awaiting blockchain confirmation')
                    const approvalReceipt = await (transaction as Promise<BlockchainReceipt>)
                    if (approvalReceipt.status === 0) {
                        setTransactionState(PurchasePanelTransactionStates.approvalFailed)
                    } else {
                        setTransactionState(PurchasePanelTransactionStates.approvedButDormant)
                    }
                    break;
                case PurchasePanelTransactionStates.awaitingDepositBlockConfirmation:
                    alert.info('awaiting blockchain confirmation')
                    const depositReceipt = await (transaction as Promise<BlockchainReceipt>)

                    if (depositReceipt.status === 0) {
                        setTransactionState(PurchasePanelTransactionStates.depositFailed)
                    } else {
                        resetInput()
                        setTransactionState(PurchasePanelTransactionStates.depositSuccess)
                    }
                    break;
                case PurchasePanelTransactionStates.depositAwaitingUserWalletConfirmation:
                    if (!transaction) {
                        setTransactionState(PurchasePanelTransactionStates.depositFailed)
                        alert.error('user cancelled')
                        break;
                    }
                    alert.info('wallet request pending')
                    const waiter = (await (transaction as Promise<BlockchainTransaction>)).wait()
                    setTransaction(waiter)
                    setTransactionState(PurchasePanelTransactionStates.awaitingDepositBlockConfirmation)
                    break;

                case PurchasePanelTransactionStates.depositClicked:
                    const etherOverride = props.assetId === blockchain.contracts.EthAddress ? { value: purchaseValue } : undefined

                    const depositTX = (etherOverride ?
                        blockchain.contracts.LendingPool.deposit(props.assetId, ethToWei(purchaseValue), 0, etherOverride) :
                        blockchain.contracts.LendingPool.deposit(props.assetId, ethToWei(purchaseValue), 0))

                    setTransaction(depositTX)
                    setTransactionState(PurchasePanelTransactionStates.depositAwaitingUserWalletConfirmation)

                    break;
                case PurchasePanelTransactionStates.depositFailed:
                    setTransaction(undefined)
                    alert.error('Desposit transaction failed')
                    break;

                case PurchasePanelTransactionStates.depositSuccess:
                    alert.success('Desposit transaction succeeded')
                    setTransaction(undefined)
                    break;
            }


        }
    }, [transactionState])


    useEffect(() => {
        blockChainInteractionCallBack()
    }, [transactionState])

    const depositVisible = (transactionState >= PurchasePanelTransactionStates.approvedButDormant)
    const approvalVisible = !depositVisible && alertOnApproval

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
                    How much would you like to deposit?
            </Typography>
            </Grid>
            <Grid item className={classes.narrowColumn}>
                <Typography variant="body1">
                    Here you can set the amount you want to deposit. You can manually enter a specific amount or use the percentage buttons below.
                </Typography>
            </Grid>
            <Grid item>
                <RangedTextField
                    setValid={setValid}
                    onChange={setPurchaseValue}
                    value={purchaseValue}
                    assetId={props.assetId}
                    percentage={percentage}
                    setPercentage={setPercentage} />
            </Grid>
            <Grid item>
                You can deposit a maximum of {balance}
            </Grid>
            <Grid item>
                {depositVisible ?
                    <Button
                        className={classes.despositButton}
                        disabled={!valid}
                        onClick={() => setTransactionState(PurchasePanelTransactionStates.depositClicked)}>
                        Deposit
                </Button> : (approvalVisible ? <Button
                        className={classes.approvalButton}
                        onClick={() => setTransactionState(PurchasePanelTransactionStates.approvalClicked)}
                    >
                        Approve
                </Button> : '')}
            </Grid>
            <Grid item>
                <Link className={classes.link} component="button" onClick={() => props.setRedirect('/deposit')}>Go back</Link>
            </Grid>
        </Grid>)
}

const useStatsPanelStyle = makeStyles(theme => createStyles({
    root: {
        width: '100%',
        height: "100%",
        minHeight: "900px",
        fontSize: theme.standardFont.fontSize + 4,
        fontWeight: theme.standardFont.fontWeightMedium,
        fontFamily: theme.standardFont.fontFamily
    },

}))

/*
LendingPooldataprovider.getReserveData
    ->utilization rate
    -> available liquidity
EtheretumAPI
 -> APY

LendingPool.getReserveConfigurationData
 -> LTV
 -> LiquidationThreashold
 -> LiquidationBonus
 ->usageAsCollateralEnabled

 Asset: Price. price in eth * ethdollar price
 Price Oracle
*/
function StatsPanel(props: { assetId: string }) {
    const ethereumContext = useContext(EthereumContext)
    const classes = useStatsPanelStyle()
    const [utilizationRate, setUtilizationRate] = useState<string>()
    const [availableLiquidity, setAvailableLiquidity] = useState<string>()
    const [dollarPrice, setDollarPrice] = useState<string>()
    const [APY, setAPY] = useState<string>()
    const [collateralEnabled, setCollateralEnabled] = useState<'YES' | 'NO'>('YES')
    const [maxLTV, setMaxLTV] = useState<string>()
    const [liquidationThreshold, setLiquidationThreshold] = useState<string>()
    const [liquidationPenalty, setLiquidationPenalty] = useState<string>()

    const fetchStatsCallback = useCallback(async () => {
        if (ethereumContext.blockchain) {
            const blockchain = ethereumContext.blockchain
            const reserveData = await blockchain.contracts.LendingPoolDataProvider.getReserveData(props.assetId)
            setUtilizationRate(reserveData.utilizationRate.toString())
            setAvailableLiquidity(reserveData.availableLiquidity.toString().fromWAD().truncBig())
            setAPY(await TokenAPY(props.assetId, blockchain.contracts))

            const configurationdata = await blockchain.contracts.LendingPool.getReserveConfigurationData(props.assetId)
            setMaxLTV(configurationdata.ltv.toString())
            setLiquidationThreshold(configurationdata.liquidationThreshold.toString())
            setLiquidationPenalty(configurationdata.liquidationBonus.toString())
            setCollateralEnabled(configurationdata.usageAsCollateralEnabled ? 'YES' : 'NO')

            const ethPrice = await blockchain.contracts.PriceOracle.getAssetPrice(props.assetId)
            const ethDollarPrice = await blockchain.contracts.PriceOracle.getEthUsdPrice()
            setDollarPrice(WadMul(ethPrice, ethDollarPrice).toString().fromWAD())

        }
    }, [ethereumContext.blockchain])

    useEffect(() => {
        fetchStatsCallback()
    }, [ethereumContext.blockchain])

    return (
        <Grid
            container
            direction="column"
            justify="flex-start"
            alignItems="center"
            spacing={4}
            className={classes.root}
        >
            <StatRow title="Utilization Rate" suffix=" %">
                {utilizationRate}
            </StatRow>
            <StatRow title="Available Liquidity" suffix=" DAI">
                {availableLiquidity}
            </StatRow>
            <StatRow title="Asset Price" prefix="$">
                {dollarPrice}
            </StatRow>
            <StatRow title="APY" suffix="%" color='red'>
                {APY}
            </StatRow>
            <StatRow title="Can be used as collateral" color='green'>
                {collateralEnabled}
            </StatRow>
            <StatRow title="Maximum LTV" suffix=" %">
                {maxLTV}
            </StatRow>
            <StatRow title="Liquidation threshold" suffix=" %">
                {liquidationThreshold}
            </StatRow>
            <StatRow title="Liquidation penalty" suffix=" %">
                {liquidationPenalty}
            </StatRow>
        </Grid>
    )
}


const useStatRowStyle = makeStyles(theme => createStyles({
    root: {
        // border: '2px solid red',
        marginLeft: '10px'
    },
    redCell: {
        color: 'red'
    },
    greenCell: {
        color: 'green'
    },
    encasingCell: {
        width: '100%'
    }
}))

interface statRowProps {
    title: string
    children?: any
    prefix?: string
    suffix?: string
    color?: 'green' | 'red'
}

function StatRow(props: statRowProps) {
    const classes = useStatRowStyle()
    const colorClass = props.color ? classes[props.color + 'Cell'] : ''

    return <Grid item className={classes.encasingCell}>
        <Grid
            container
            direction="row"
            justify="space-between"
            alignItems="baseline"
            className={classes.root}
            spacing={1}
        >
            <Grid item>
                {props.title}
            </Grid>
            <Grid item>
                {props.prefix || ''}{<span className={colorClass}>{props.children}</span>}{props.suffix || ''}
            </Grid>
        </Grid>
    </Grid>
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