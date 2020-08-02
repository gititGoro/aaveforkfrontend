import React, { useState, useContext, useCallback, useEffect } from 'react';
import { Paper, Grid, makeStyles, createStyles, Typography, Button, Link } from '@material-ui/core'
import { useParams } from "react-router-dom";
import RangedTextField, { range as PercentageRange } from 'src/components/Layout/PageContent/Common/RangedTextField'
import { EthereumContext } from 'src/components/contexts/EthereumContext';
import { ApproveLendingPoolCore, LendingPoolCoreApproved, BlockchainTransaction, BlockchainReceipt, LoadERC20, weiToEthString, ethToWei } from '../../../../../blockchain/EthereumAPI'
import { useAlert } from 'react-alert'
import Loading from '../../Common/Loading'
import { ContractTransaction } from 'ethers';

interface assetProps {
    setRedirect: (r: string) => void
}

const useAssetStyles = makeStyles(theme => createStyles({
    PurchaseCell: {
        minWidth: "500px",
        width: "70%",
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
            <Grid item className={classes.StatsCell}>
                <StyledPaper>
                    <StatsPanel />
                </StyledPaper>
            </Grid>
        </Grid>
    </div>)
}
/*
How much would you like to deposit
Manually enter an amount or choose a percen.5tage
Adorned text box3 that binds text to either empty or range
percentage buttons
Button that is either approve/deposit
*/

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
        marginTop:'-16px'
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
        height: "100%",
        minHeight: "900px",
    }
}))

/*
Utilization rate,Available liquidity,Asset price,Deposit APY,Can be used as collateral,Maximum LTV,Liquidation threshold,Liquidation penalty
*/
function StatsPanel() {
    const classes = useStatsPanelStyle()

    return (<Grid
        container
        direction="column"
        justify="flex-start"
        alignItems="flex-start"
        spacing={4}
        className={classes.root}
    >
        <Grid item>
            Utilization rate
      </Grid>
        <Grid item>
            Available Liqidity
      </Grid>
        <Grid item>
            Asset Price
      </Grid>
        <Grid item>
            Deposit APY
      </Grid>
        <Grid item>
            Can be used as collateral
      </Grid>
        <Grid item>
            Maximum LTV
      </Grid>
        <Grid item>
            Liquidation threshold
      </Grid>
        <Grid item>
            Liquidation penalty
      </Grid>
    </Grid>)
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