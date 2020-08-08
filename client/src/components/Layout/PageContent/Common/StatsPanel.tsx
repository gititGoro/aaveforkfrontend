import React, { useState, useContext, useCallback, useEffect } from 'react';
import { Grid, makeStyles, createStyles } from '@material-ui/core'
import { EthereumContext } from 'src/components/contexts/EthereumContext';
import { TokenAPY, WadMul, GetPriceOracle } from '../../../../blockchain/EthereumAPI'
import { ImgSrc } from '../Common/TokenImage'
import { BigNumber } from 'bignumber.js';


const useStatsPanelStyle = makeStyles(theme => createStyles({
    root: {
        width: '100%',
        height: "100%",
        minHeight: "900px",
        fontSize: theme.standardFont.fontSize + 3,
        fontWeight: theme.standardFont.fontWeightMedium,
        fontFamily: theme.standardFont.fontFamily
    },

}))

export type jaNee = 'YES' | 'NO'

interface statsPanelProps {
    assetId: string,
    deposit?: boolean
    borrowingEnabled: jaNee
    setBorrowingEnabled: (e: jaNee) => void
}

export default function StatsPanel(props: statsPanelProps) {
    const ethereumContext = useContext(EthereumContext)
    const classes = useStatsPanelStyle()
    const [utilizationRate, setUtilizationRate] = useState<string>()
    const [availableLiquidity, setAvailableLiquidity] = useState<string>()
    const [dollarPrice, setDollarPrice] = useState<string>()
    const [APY, setAPY] = useState<string>()
    const [maxLTV, setMaxLTV] = useState<string>()
    const [liquidationThreshold, setLiquidationThreshold] = useState<string>()
    const [liquidationPenalty, setLiquidationPenalty] = useState<string>()

    const [stableBorrowRate, setStableBorrowrate] = useState<string>("")
    const [variableBorrowRate, setVariableBorrowrate] = useState<string>("")
    const [healthFactor, setHealthFactor] = useState<string>("")
    const [currentBorrowValueInToken, setCurrentBorrowValueInToken] = useState<string>("")

    const imageGetter = ImgSrc(ethereumContext.network)
    const tokenName = imageGetter(props.assetId).name

    const commonPropsCallBack = useCallback(async () => {
        if (ethereumContext.blockchain) {
            const blockchain = ethereumContext.blockchain
            const reserveData = await blockchain.contracts.LendingPoolDataProvider.getReserveData(props.assetId)
            setUtilizationRate(new BigNumber(reserveData.utilizationRate.toString().fromRAY()).decimalPlaces(5).toString())
            setAvailableLiquidity(reserveData.availableLiquidity.toString().fromWAD().truncBig())
            const oracle = await GetPriceOracle(blockchain.contracts, blockchain.metamaskConnections.signer)
            const ethPrice = await oracle.getAssetPrice(props.assetId)
            const ethDollarPrice = await oracle.getEthUsdPrice()
            setDollarPrice(WadMul(ethPrice, ethDollarPrice).toString().fromWAD())
        }
    }, [ethereumContext.blockchain])

    const fetchDepositStatsCallback = useCallback(async () => {
        if (ethereumContext.blockchain && props.deposit) {
            const blockchain = ethereumContext.blockchain
            setAPY(await TokenAPY(props.assetId, blockchain.contracts))
            const configurationdata = await blockchain.contracts.LendingPool.getReserveConfigurationData(props.assetId)
            setMaxLTV(configurationdata.ltv.toString())
            setLiquidationThreshold(configurationdata.liquidationThreshold.toString())
            setLiquidationPenalty(configurationdata.liquidationBonus.toString())
            props.setBorrowingEnabled(configurationdata.usageAsCollateralEnabled ? 'YES' : 'NO')
        }
    }, [ethereumContext.blockchain])

    const fetchBorrowStatsCallback = useCallback(async () => {
        if (ethereumContext.blockchain && !props.deposit) {
            const blockchain = ethereumContext.blockchain
            const reserveData = await blockchain.contracts.LendingPoolDataProvider.getReserveData(props.assetId)
            setStableBorrowrate(reserveData.stableBorrowRate.toString().fromRAY().asPercentage())
            setVariableBorrowrate(reserveData.variableBorrowRate.toString().fromRAY().asPercentage())
            const userData = await blockchain.contracts.LendingPoolDataProvider.calculateUserGlobalData(blockchain.account)
            setHealthFactor(new BigNumber(userData.healthFactor.toString().fromWAD()).decimalPlaces(4).toString())
            const userReserveData = await blockchain.contracts.LendingPool.getUserReserveData(props.assetId, blockchain.account)
            setCurrentBorrowValueInToken(new BigNumber(userReserveData.currentBorrowBalance.toString().fromWAD()).decimalPlaces(4).toString())
        }
    }, [ethereumContext.blockchain])

    useEffect(() => {
        if (props.deposit)
            fetchDepositStatsCallback()
        else
            fetchBorrowStatsCallback()
        commonPropsCallBack()
    }, [ethereumContext.blockchain])

    return (
        <Grid
            container
            direction="column"
            justify="flex-start"
            alignItems="center"
            spacing={5}
            className={classes.root}
        >
            <StatRow title="Utilization Rate" suffix=" %">
                {utilizationRate}
            </StatRow>
            <StatRow title="Available Liquidity" suffix={` ${tokenName}`}>
                {availableLiquidity}
            </StatRow>
            <StatRow title="Asset Price" prefix="$">
                {dollarPrice}
            </StatRow>

            <StatRow title="APY" color='red' hide={!props.deposit}>
                {APY}
            </StatRow>
            <StatRow title="Can be used as collateral" color={props.borrowingEnabled === 'YES' ? 'green' : 'red'} hide={!props.deposit}>
                {props.borrowingEnabled}
            </StatRow>
            <StatRow title="Maximum LTV" suffix=" %" hide={!props.deposit}>
                {maxLTV}
            </StatRow>
            <StatRow title="Liquidation threshold" suffix=" %" hide={!props.deposit}>
                {liquidationThreshold}
            </StatRow>
            <StatRow title="Liquidation penalty" suffix=" %" hide={!props.deposit}>
                {liquidationPenalty}
            </StatRow>

            <StatRow title="Stable borrow rate" hide={props.deposit}>
                {stableBorrowRate}
            </StatRow>
            <StatRow title="Variable borrow rate" hide={props.deposit}>
                {variableBorrowRate}
            </StatRow>
            <StatRow title="Healthfactor" hide={props.deposit}>
                {healthFactor}
            </StatRow>
            <StatRow title="Current borrowing" suffix={` ${tokenName}`} hide={props.deposit}>
                {currentBorrowValueInToken}
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
    hide?: boolean
}

function StatRow(props: statRowProps) {
    const classes = useStatRowStyle()
    const colorClass = props.color ? classes[props.color + 'Cell'] : ''

    return (props.hide ?
        <div></div>
        :
        <Grid item className={classes.encasingCell}>
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
        </Grid>)
}
