import React, { useContext, useState, useEffect, useCallback } from 'react';
import AssetPage, { Row as AssetRow, AssetIcon } from "../Common/AssetPage"
import { EthereumContext } from "../../../contexts/EthereumContext"
import { LoadERC20, LoadAToken, ethersMetamask, weiToEthString } from '../../../../blockchain/EthereumAPI'
import imageData from '../../../../images/dataimages.json'
import { Grid, Typography, makeStyles, createStyles } from '@material-ui/core';
import doge from '../../../../images//loadingdog.gif'


const useStyles = makeStyles(theme => createStyles({
    dogeText: {
        color: theme.foregroundColor[theme.palette.type],
        fontFamily: theme.standardFont.fontFamily
    }
}))

export default function Deposit() {
    const classes = useStyles()
    const ethereumContextProps = useContext(EthereumContext)
    const [rows, setRows] = useState<AssetRow[]>([])

    const imageLoader = ImgSrc(ethereumContextProps.network)
    const contractListCallBack = useCallback(async () => {
        if (ethereumContextProps.blockchain) {
            const currentAccount = ethereumContextProps.blockchain.account
            const blockchain = ethereumContextProps.blockchain
            const loadERC20 = ((ethers: ethersMetamask) => (address: string) => LoadERC20(address, ethers.signer))(ethereumContextProps.blockchain.metamaskConnections)
            const addresses = await ethereumContextProps.blockchain.contracts.LendingPool.getReserves()
            const tokens = addresses.map(loadERC20)

            const rowPromises = addresses.map(async (address): Promise<AssetRow> => { //TODO: graph query
                const currentToken = tokens.filter(t => t.address === address)[0]
                const aTokenAddress = await blockchain.contracts.LendingPoolCore.getReserveATokenAddress(address)
                const aToken = LoadAToken(aTokenAddress, blockchain.metamaskConnections.signer)
                const icon: AssetIcon = imageLoader(address)
                const walletBalance = await currentToken.balanceOf(currentAccount)
                const principalBalnce = await aToken.principalBalanceOf(currentAccount)
                const accumulatedBalance = await aToken.balanceOf(currentAccount)
                const liquidityRate = await blockchain.contracts.LendingPoolCore.getReserveCurrentLiquidityRate(address)

                return {
                    icon,
                    column1: weiToEthString(walletBalance),
                    column2: `Current: ${weiToEthString(accumulatedBalance)}, principal: ${weiToEthString(principalBalnce)}`,
                    column3: liquidityRate.toString().fromRAY().asPercentage(),
                    actionHeading: "Deposit",
                    redirectAction: () => alert('redirecting to deposit asset page')
                }
            })
            let r: AssetRow[] = []
            for (let i = 0; i < rowPromises.length; i++) {
                r.push(await rowPromises[i])
            }
            setRows(r)
        }
    }, [ethereumContextProps.blockchain])

    useEffect(() => {
        contractListCallBack()
    })

    return rows.length > 0 ? <AssetPage Column1Heading="Your wallet balance" Column2Heading="Balance in Aave" Column3Heading="APY" rows={rows} />
        : <Grid
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
                    Loading....
                </Typography>
            </Grid>
        </Grid>
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
