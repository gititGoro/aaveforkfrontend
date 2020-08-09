import React, { useState, useEffect, useContext, useCallback } from 'react';
import {
    Grid,
    makeStyles,
    createStyles,
    Button,
    Dialog,
    DialogTitle,
    Select,
    MenuItem,
    FormLabel,
    Card,
    CardActionArea,
    CardMedia,
    CardContent,
    Typography,
    FormControl,
    TextField,
} from '@material-ui/core';
import { ImgSrc } from '../Common/TokenImage'
import { EthereumContext } from 'src/components/contexts/EthereumContext';
import { weiToEthString, dollarValueOfReserve, LoadERC20, UINTMAX, LendingPoolCoreApproved, ethToWei } from 'src/blockchain/EthereumAPI';
import BigNumber from 'bignumber.js';

const useStyles = makeStyles(theme => createStyles({
    root: {
        height: '700px',
        overflow: 'invisible',
        background: theme.appbackground[theme.palette.type],
        font: theme.standardFont.fontFamily,
        color: theme.foregroundColor[theme.palette.type]
    },
    cell: {
        width: '800px'
    },
    dialog: {
        background: theme.appbackground[theme.palette.type],
        font: theme.standardFont.fontFamily,
        color: theme.foregroundColor[theme.palette.type]
    }
}))

interface props {
    show: boolean
    accountToLiquidate: string
    reserveLoan: string
    onClose: () => void
    debt: string
}

export default function LiquidationCallDialog(props: props) {
    const ethereumContext = useContext(EthereumContext)
    const classes = useStyles()
    const [collateral, setCollateral] = useState<string>("")
    const [purchaseAmount, setPurchaseAmount] = useState<string>("")
    const [enabled, setEnabled] = useState<boolean>(false)
    const [debtToPay, setDebtToPay] = useState<string>('')
    const [approved, setApproved] = useState<boolean>(false)
    const [approvalClicked, setApprovalClicked] = useState<boolean>(false)
    const [liquidationClicked, setLiquidationClicked] = useState<boolean>(false)
    const [showError, setShowError] = useState<boolean>(false)
    const [totalCollateral, setTotalCollateral] = useState<string>('')
    const [nativeTotalDebt, setNativeTotalDebt] = useState<string>('')
    const [userBalanceOfDebtToken, setUserBalanceOfDebtToken] = useState<string>('')

    const nativeDebtCallback = useCallback(async () => {
        if (ethereumContext.blockchain) {
            const blockchain = ethereumContext.blockchain
            const userReserveData = await blockchain.contracts.LendingPool.getUserReserveData(props.reserveLoan, props.accountToLiquidate)
            setNativeTotalDebt(weiToEthString(userReserveData.currentBorrowBalance))
            const token = LoadERC20(props.reserveLoan, blockchain.metamaskConnections.signer)
            setUserBalanceOfDebtToken(weiToEthString(await token.balanceOf(blockchain.account)))
        }
    }, [ethereumContext.blockchain, props.reserveLoan])

    useEffect(() => {
        nativeDebtCallback()
    })


    const isApprovedCallback = useCallback(async () => {
        if (ethereumContext.blockchain && collateral.length > 3) {
            const blockchain = ethereumContext.blockchain
            setApproved(await LendingPoolCoreApproved(props.reserveLoan, blockchain.contracts, blockchain.metamaskConnections.signer))
        }
    }, [ethereumContext.blockchain, collateral])

    useEffect(() => {
        isApprovedCallback()
    })

    const approvalClickedCallback = useCallback(async () => {
        if (approvalClicked) {
            if (ethereumContext.blockchain) {
                const blockchain = ethereumContext.blockchain
                const token = LoadERC20(props.reserveLoan, blockchain.metamaskConnections.signer)
                await token.approve(blockchain.contracts.LendingPoolCore.address, UINTMAX)
            }
            setApprovalClicked(false)
        }
    }, [approvalClicked])

    useEffect(() => {
        approvalClickedCallback()
    }, [approvalClicked])

    const liquidationClickedCallback = useCallback(async () => {
        if (liquidationClicked) {
            if (ethereumContext.blockchain) {
                const blockchain = ethereumContext.blockchain
                await blockchain.contracts.LendingPool
                    .liquidationCall(collateral, props.reserveLoan, props.accountToLiquidate, ethToWei(debtToPay), false)
                    .catch(() => setShowError(true))
            }
            setLiquidationClicked(false)
        }
    }, [liquidationClicked])

    useEffect(() => {
        liquidationClickedCallback()
    }, [liquidationClicked])

    const triggerLiquidate = () => {
        setLiquidationClicked(true)
        setShowError(false)
    }


    const debtToPayBig = new BigNumber(debtToPay)
    const invalidDebtToPay = debtToPayBig.isNaN() || debtToPayBig.lt(0) || debtToPayBig.gt(nativeTotalDebt) || debtToPayBig.gt(userBalanceOfDebtToken)

    return (
        <Dialog open={props.show}
            maxWidth='xl'
            onClose={() => props.onClose()}>
            <DialogTitle>
                Liquidation Call on debt of {props.debt} Eth equivalent
            </DialogTitle>
            <Grid
                container
                direction="column"
                justify="center"
                alignItems="center"
                spacing={2}
                className={classes.root}
            >
                <Grid item className={classes.cell}>
                    <CollateralSelector
                        account={props.accountToLiquidate}
                        collateral={collateral}
                        setCollateral={setCollateral}
                        purchaseAmount={purchaseAmount}
                        setPurchaseAmount={setPurchaseAmount}
                        enabled={enabled}
                        setEnabled={setEnabled}
                        totalCollateral={totalCollateral}
                        setTotalCollateral={setTotalCollateral}
                    />
                </Grid>
                <Grid item>
                    <OutstandingDebtTextField account={props.accountToLiquidate}
                        debtToPay={debtToPay}
                        setDebtToPay={setDebtToPay}
                        reserveOnLoan={props.reserveLoan}
                    />
                </Grid>
                <Grid item>{
                    approved ? <Button disabled={!enabled || invalidDebtToPay || undefined} title={enabled ? '' : 'Collateral cannot be claimed'} variant='contained' color='primary' onClick={() => triggerLiquidate()} >
                        Liquidate
                </Button> : <Button onClick={() => setApprovalClicked(true)} variant='outlined' color='secondary'>
                            Approve Collateral
                </Button>
                }

                </Grid>
                <Grid item>{showError ? <Typography variant='h5' color='secondary'>
                    Cannot liquidate user with Health Factor {'>'} 1
                    </Typography> : ''}
                </Grid>
                <Grid item>
                    {debtToPayBig.gt(userBalanceOfDebtToken) ? <Typography variant='h5' color='secondary'>
                        Insufficient user funds
                    </Typography> : ""}
                </Grid>
            </Grid>
        </Dialog>
    )
}

const collateralSelectorStyles = makeStyles(theme => createStyles({
    root: {
        margin: '20px',

    },
    label: {
        color: theme.foregroundColor[theme.palette.type]
    }
}))

interface collateralProps {
    account: string
    collateral: string
    setCollateral: (c: string) => void
    purchaseAmount: string
    setPurchaseAmount: (p: string) => void
    enabled: boolean
    setEnabled: (e: boolean) => void
    setTotalCollateral: (c: string) => void
    totalCollateral: string
}

interface reserveListItem {
    address: string
    name: string
}

function CollateralSelector(props: collateralProps) {
    const classes = collateralSelectorStyles()
    const ethereumContext = useContext(EthereumContext)
    const [reserves, setReserves] = useState<reserveListItem[]>([])
    const [dollarValue, setDollarValue] = useState<string>('')
    const [liquidationBonus, setLiquidationBonus] = useState<string>('')

    const loader = ImgSrc(ethereumContext.network)
    const imageOfCurrent = loader(props.collateral)
    const populateCallback = useCallback(async () => {
        if (ethereumContext.blockchain) {
            const blockchain = ethereumContext.blockchain
            const reserveList = await blockchain.contracts.LendingPoolCore.getReserves()

            setReserves(
                reserveList.map(r => {
                    let image = loader(r)
                    return { address: image.address, name: image.name }
                })
            )
        }
    }, [])

    useEffect(() => {
        populateCallback()
    }, [])
    const collateralDetailsLoader = useCallback(async () => {
        if (ethereumContext.blockchain && props.collateral.trim().length > 3) {
            const blockchain = ethereumContext.blockchain
            const userReserveData = await blockchain.contracts.LendingPoolCore.getUserBasicReserveData(props.collateral, props.account)
            const collateralized = userReserveData[3]
            props.setEnabled(collateralized)
            if (collateralized) {
                props.setTotalCollateral(weiToEthString(userReserveData[0]))
                setDollarValue(await dollarValueOfReserve(props.collateral, userReserveData[0], { contracts: blockchain.contracts, wallet: blockchain.metamaskConnections }))
                const configurationData = await blockchain.contracts.LendingPool.getReserveConfigurationData(props.collateral)
                setLiquidationBonus(configurationData.liquidationBonus.toString())
            }
        }
    }, [props.collateral, ethereumContext.blockchain])

    useEffect(() => {
        collateralDetailsLoader()
    })

    useEffect(() => {
        if (props.collateral.length < 4 && reserves.length > 0) {
            props.setCollateral(reserves[0].address)
        }
    }, [reserves])

    return <Grid
        container
        direction="row"
        justify="space-around"
        alignItems="center"
        className={classes.root}
        spacing={1}
    >
        <Grid item>
            <FormControl>
                <FormLabel htmlFor='collateralSelect' className={classes.label}>Collateral to buy</FormLabel>
                <Select id='collateralSelect'
                    onChange={(event) => props.setCollateral(event.target.value as string)}
                    value={props.collateral}
                >
                    {reserves.map(r => (
                        <MenuItem key={r.address} value={r.address}>
                            {r.name.toUpperCase()}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </Grid>
        <Grid item>
            <CollateralCard
                asset={props.collateral}
                value={props.totalCollateral}
                dollarValue={dollarValue}
                liquidationBonus={liquidationBonus}
                name={imageOfCurrent.name}
                imageBASE64={imageOfCurrent.BASE64} />
        </Grid>
    </Grid>
}

const collateralCardStyles = makeStyles({
    root: {
        maxWidth: 345,
    },
    media: {
        height: 140,
    },
});

interface collateralCardProps {
    asset: string
    value: string
    dollarValue: string
    liquidationBonus: string
    imageBASE64: string
    name: string
}

function CollateralCard(props: collateralCardProps) {
    const classes = collateralCardStyles();

    return (
        <Card className={classes.root}>
            <CardActionArea>
                <CardMedia
                    className={classes.media}
                    image={props.imageBASE64}
                    title="collateral"
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        {props.name}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        Total: {props.value}, ${props.dollarValue}, liquidation bonus: {props.liquidationBonus}%
            </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}


function OutstandingDebtTextField(props: { account: string, reserveOnLoan: string, debtToPay: string, setDebtToPay: (d: string) => void }) {
    const ethereumContext = useContext(EthereumContext)
    const imgloader = ImgSrc(ethereumContext.network)
    const image = imgloader(props.reserveOnLoan)
    const [nativeDebt, setNativeDebt] = useState<string>()

    const nativeDebtCallback = useCallback(async () => {
        if (ethereumContext.blockchain) {
            const blockchain = ethereumContext.blockchain
            const userReserveData = await blockchain.contracts.LendingPool.getUserReserveData(props.reserveOnLoan, props.account)
            setNativeDebt(weiToEthString(userReserveData.currentBorrowBalance))

        }
    }, [ethereumContext.blockchain, props.reserveOnLoan])

    useEffect(() => {
        nativeDebtCallback()
    })

    return (<Grid
        container
        direction="row"
        justify="space-around"
        alignItems="center"
        spacing={3}
    >
        <Grid >
            <Typography variant="subtitle2">
                Max collateral to purchase {nativeDebt} {image.name}:
            </Typography>
        </Grid>
        <Grid item>
            <TextField placeholder='Debt'
                variant='outlined'
                value={props.debtToPay}
                onChange={(event) => props.setDebtToPay(event.target.value)}
            />
        </Grid>
    </Grid>)
}
