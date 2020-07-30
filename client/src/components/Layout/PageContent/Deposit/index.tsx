import React, { useContext } from 'react';
import AssetPage from "../Common/AssetPage"
import { weiToEthString, LoadERC20 } from '../../../../blockchain/EthereumAPI'
import { AToken } from 'src/blockchain/typechain-types/ethers/AToken';
import { EthereumContext } from '../../../contexts/EthereumContext'

export default function Deposit() {
    const ethereumContextProps = useContext(EthereumContext)

    if (ethereumContextProps.blockchain) {
        const blockchain = ethereumContextProps.blockchain

        const walletBalanceQuery = async (aToken: AToken): Promise<string> => {
            const baseTokenAddress = await aToken.underlyingAssetAddress()
            const baseToken = LoadERC20(baseTokenAddress, blockchain.metamaskConnections.signer)
            return weiToEthString(await baseToken.balanceOf(blockchain.account))
        }

        const aTokenBalanceQuery = async (aToken: AToken): Promise<string> => {
            const accumulatedBalance = await aToken.balanceOf(blockchain.account)
            const principalBalnce = await aToken.principalBalanceOf(blockchain.account)
            return `Current: ${weiToEthString(accumulatedBalance)}, principal: ${weiToEthString(principalBalnce)}`
        }

        const APYquery = async (aToken: AToken) => {
            const baseTokenAddress = await aToken.underlyingAssetAddress()

            return (await blockchain.contracts.LendingPoolCore.getReserveCurrentLiquidityRate(baseTokenAddress))
                .toString()
                .fromRAY()
                .asPercentage()
        }

        const actionLabel =  async (aToken: AToken) => {
            return "Deposit"
        } 

        const action =  async (aToken: AToken) =>{
            alert('deposit')
        }

        return <AssetPage
            column1Heading="Your wallet balance"
            column2Heading="Balance in Aave"
            column3Heading="APY"
            column1Query={walletBalanceQuery}
            column2Query={aTokenBalanceQuery}
            column3Query={APYquery}
            actionLabel = {actionLabel}
            action = {action}
        />
    }

    return <AssetPage column1Heading="Your wallet balance" column2Heading="Balance in Aave" column3Heading="APY" />
}
