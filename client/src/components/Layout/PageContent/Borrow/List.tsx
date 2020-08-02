import React, { useContext } from 'react';
import AssetPage from "../Common/AssetPage"
import { AToken } from 'src/blockchain/typechain-types/ethers/AToken';
import { EthereumContext } from '../../../contexts/EthereumContext'
import { getAvailableBorrows } from 'src/blockchain/EthereumAPI'

interface props {
    redirect: (assetID: string) => void
}

export function List(props: props) {
    const ethereumContextProps = useContext(EthereumContext)

    if (ethereumContextProps.blockchain) {
        const blockchain = ethereumContextProps.blockchain

        const availableQuery = async (aToken: AToken): Promise<string> => {
            const reserveAddress = await aToken.underlyingAssetAddress()
            return await getAvailableBorrows(reserveAddress, blockchain.contracts, blockchain.metamaskConnections)
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
            const reserve = await aToken.underlyingAssetAddress()
            props.redirect(reserve)
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
