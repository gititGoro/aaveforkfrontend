import React, { useState, useContext, useCallback, useEffect } from 'react';
import { Grid, makeStyles, createStyles } from '@material-ui/core'
import { EthereumContext } from 'src/components/contexts/EthereumContext';
import { TokenAPY, WadMul, GetPriceOracle } from '../../../../blockchain/EthereumAPI'



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

export default function StatsPanel(props: { assetId: string, deposit?: boolean }) {
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

    const fetchDepositStatsCallback = useCallback(async () => {
        if (ethereumContext.blockchain && props.deposit) {
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
            const oracle = await GetPriceOracle(blockchain.contracts, blockchain.metamaskConnections.signer)
            const ethPrice = await oracle.getAssetPrice(props.assetId)
            const ethDollarPrice = await oracle.getEthUsdPrice()
            setDollarPrice(WadMul(ethPrice, ethDollarPrice).toString().fromWAD())

        }
    }, [ethereumContext.blockchain])

    useEffect(() => {
        if (props.deposit)
            fetchDepositStatsCallback()
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
