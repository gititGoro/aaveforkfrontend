import React, { useContext } from 'react';
import AssetPage from "../Common/AssetPage"
import { AToken } from 'src/blockchain/typechain-types/ethers/AToken';
import { EthereumContext } from '../../../contexts/EthereumContext'
import { GetPriceOracle } from 'src/blockchain/EthereumAPI'

export default function Borrow() {
    const ethereumContextProps = useContext(EthereumContext)

    if (ethereumContextProps.blockchain) {
        const blockchain = ethereumContextProps.blockchain

        const availableQuery = async (aToken: AToken): Promise<string> => {
            const oracle = await GetPriceOracle(blockchain.contracts, blockchain.metamaskConnections.signer)
            const userData = await blockchain.contracts.LendingPoolDataProvider.getUserAccountData(blockchain.account)
            const reserveAddress = await aToken.underlyingAssetAddress()
            const availableEthBorrows = userData.availableBorrowsETH
            const ethPriceOfToken = await oracle?.getAssetPrice(reserveAddress)
            if (!ethPriceOfToken)
                return "price not set"
            if (ethPriceOfToken.isZero())
                return "price not set"

            const theoreticalTotalAvailable = availableEthBorrows.div(ethPriceOfToken)
            const reserveData = (await blockchain.contracts.LendingPoolDataProvider.getReserveData(reserveAddress))
            const availableLiquidity = reserveData.availableLiquidity.toString()
            if (theoreticalTotalAvailable.gt(availableLiquidity)) {
                return availableLiquidity
            }
            return theoreticalTotalAvailable.toString()
        }

        const variableAPRQuery = async (aToken: AToken): Promise<string> => {
            const baseTokenAddress = await aToken.underlyingAssetAddress()
            return await (await blockchain.contracts.LendingPoolCore.getReserveCurrentVariableBorrowRate(baseTokenAddress))
                .toString()
                .fromRAY()
                .asPercentage()
        }

        const stableAPRQuery = async (aToken: AToken): Promise<string> => {
            const baseTokenAddress = await aToken.underlyingAssetAddress()
            return await (await blockchain.contracts.LendingPoolCore.getReserveCurrentStableBorrowRate(baseTokenAddress))
                .toString()
                .fromRAY()
                .asPercentage()
        }

        const actionLabel = async (aToken: AToken) => {
            return "Borrow"
        }

        const action = async (aToken: AToken) => {
            alert('borrow')
        }
        return <AssetPage
            column1Heading="Available to you"
            column2Heading="variable APY"
            column3Heading="stable APY"
            column1Query={availableQuery}
            column2Query={variableAPRQuery}
            column3Query={stableAPRQuery}
            actionLabel={actionLabel}
            action={action}
        />
    }



    return <AssetPage column1Heading="Your wallet balance"
        column2Heading="Balance in Aave"
        column3Heading="APY"
    />
}
