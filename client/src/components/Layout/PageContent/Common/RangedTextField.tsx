import * as React from "react"
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import assetImages from 'src/images/dataimages.json'
import { EthereumContext } from 'src/components/contexts/EthereumContext'
import { useContext, useState, useEffect, useCallback } from 'react'
import { Typography, Grid } from '@material-ui/core';
import { weiToEthString, LoadERC20 } from 'src/blockchain/EthereumAPI';
import BigNumber from 'bignumber.js';

export type range = 0 | 25 | 50 | 75 | 100
const acceptableInput = '.0123456789'
  .split('')

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      borderColor: theme.foregroundColor[theme.palette.type],
      borderWidth: '1px',
      borderStyle: 'solid',
      padding: '2px 4px',
      display: 'flex',
      alignItems: 'center',
      width: 400,
    },
    input: {
      marginLeft: theme.spacing(1),
      flex: 1,
    },
    iconButton: {
      padding: 10,
    },
    divider: {
      height: 28,
      margin: 4,
    },
  }),
);

interface rangedTextFieldProps {
  assetId: string,
  value: string
  onChange: (v: string) => void
  setValid: (v: boolean) => void
  percentage: range
  setPercentage: (r: range) => void
}


export default function RangedTextField(props: rangedTextFieldProps) {
  const classes = useStyles();
  const ethereumContext = useContext(EthereumContext)
  const [balance, setBalance] = useState<string>("")

  const tokenCallback = useCallback(async () => {
    if (ethereumContext.blockchain) {
      let balWei
      if (props.assetId === ethereumContext.blockchain.contracts.EthAddress) {
        balWei = await ethereumContext.blockchain.metamaskConnections.signer.getBalance()
      }
      else {
        const tokenERC20 = LoadERC20(props.assetId, ethereumContext.blockchain.metamaskConnections.signer)
        balWei = await tokenERC20.balanceOf(ethereumContext.blockchain.account)
      }
      setBalance(weiToEthString(balWei))
    }
  }, [props.assetId])

  useEffect(() => {
    tokenCallback()
  })

  const rangeSelect = (r: range) => {
    props.setPercentage(r)
    const bigBalance = new BigNumber(balance)
    if (!bigBalance.isNaN()) {
      props.onChange(bigBalance.times(r / 100).toString())
    }
  }

  useEffect(() => {
    props.setValid(validateValue(props.value))
  }, [props.value])

  const textValueChange = (newValue: string) => {
    props.setPercentage(0)

    if (newValue.split('').filter(n => acceptableInput.filter(a => a !== n).length === acceptableInput.length).length === 0) {//legal chars
      props.onChange(newValue)
    }
  }

  const validateValue = (v: string): boolean => {
    const big = new BigNumber(v)
    const bigBalance = new BigNumber(balance)
    return !big.isNaN() && big.isLessThanOrEqualTo(bigBalance)
  }

  return (
    <Grid
      container
      direction="column"
      justify="center"
      alignItems="center"
    >
      <Grid item>
        <Paper component="form" className={classes.root}>
          <IconButton className={classes.iconButton} aria-label="menu">
            <AssetIcon network={ethereumContext.network} assetId={props.assetId.toLowerCase().trim()} />
          </IconButton>
          <InputBase
            className={classes.input}
            placeholder="Amount"
            inputProps={{ 'aria-label': 'amount' }}
            onChange={event => { textValueChange(event.target.value); }}
            value={props.value}
          />
          <Typography>
            {AssetName(ethereumContext.network, props.assetId.toLowerCase().trim())}
          </Typography>
        </Paper>
      </Grid>
      <Grid item>
        <RangeSelector onChange={rangeSelect} value={props.percentage} />
      </Grid>
    </Grid>
  );
}

const rangeSelectorStyle = makeStyles(theme => createStyles({
  root: {

  },
  unselectedCell: {
    margin: '15px 10px',
    borderColor: theme.foregroundColor[theme.palette.type],
    borderWidth: '1px',
    borderStyle: 'solid',
    padding: '6px',
    width: '70px',
    fontSize: theme.standardFont.fontSize,
    color: theme.foregroundColor[theme.palette.type],
    "&:hover": {
      cursor: 'pointer'
    }
  },
  selectedCell: {
    margin: '15px 10px',
    background: theme.backgroundSelect[theme.palette.type],
    borderColor: theme.backgroundSelectBorder[theme.palette.type],
    borderWidth: '1px',
    opacity: theme.palette.type === 'light' ? 0.65 : 1,
    borderStyle: 'solid',
    padding: '6px',
    fontSize: theme.standardFont.fontSize,
    width: '70px',
    color: theme.foregroundColor[theme.palette.type === 'light' ? 'dark' : 'light'],
    "&:hover": {
      cursor: 'pointer'
    }
  }
}))

interface rangeSelectorProps {
  onChange: (r: range) => void
  value: range
}


function RangeSelector(props: rangeSelectorProps) {

  const classes = rangeSelectorStyle()

  const getClass = (r: range) => r == props.value ? classes.selectedCell : classes.unselectedCell

  return <Grid
    container
    direction="row"
    justify="space-between"
    alignItems="center"
  >
    {[25, 50, 75, 100].map((num: range) => (
      <Grid item onClick={() => props.onChange(num)} className={getClass(num)} >{num}%</Grid>
    ))}
  </Grid>
}


function getImageTokenProperty(network: string, assetId: string, prop: string) {
  const networkBlock = assetImages.filter(n => n.network === network)
  let val: string = ''
  if (networkBlock.length) {
    const images = networkBlock[0].images
    const tokenSection = images.filter(i => i.address.toLowerCase() === assetId)
    if (tokenSection.length) {
      val = tokenSection[0][prop]
    }
  }
  return val
}

function AssetIcon(props: { network: string, assetId: string }) {
  return <img src={getImageTokenProperty(props.network, props.assetId, 'BASE64')} alt='Asset' width={32} />
}

function AssetName(network: string, assetId: string) {
  return getImageTokenProperty(network, assetId, 'name')
}
