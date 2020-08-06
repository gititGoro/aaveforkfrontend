import React, { useContext } from 'react';
import { makeStyles, createStyles, Theme, FormControl, Select, MenuItem } from '@material-ui/core';
import { RetrieveDataImages } from '../Common/TokenImage'
import { EthereumContext } from 'src/components/contexts/EthereumContext';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        formControl: {
            margin: theme.spacing(1),
            minWidth: 220,
        },
        selectEmpty: {
            marginTop: theme.spacing(2),
        },
        label: {
            fontFamily: theme.standardFont.fontFamily,
            fontSize: theme.standardFont.fontSize,
            color: theme.foregroundColor[theme.palette.type],
            '&:focused': {
                color: theme.foregroundColor[theme.palette.type],
            },
            marginBottom:10
        },
        select: {
            color: theme.foregroundColor[theme.palette.type],
            background: theme.paper[theme.palette.type],
            padding: 0
        },
        MenuItem: {
            color: theme.foregroundColor[theme.palette.type],
            background: theme.paper[theme.palette.type],
            '&:hover': {
                background: theme.paper[theme.palette.type],
            }
        },
        dropDownProps: {
            padding: 0
        }
    }),
);

interface props {
    asset: string
    onChange: (asset: string) => void
}

export default function AssetDropDown(props: props) {
    const ethereumContext = useContext(EthereumContext)
    if (!ethereumContext.network || ethereumContext.network.trim() === '')
        return <div></div>

    const images = RetrieveDataImages(ethereumContext.network)

    const classes = useStyles()
    return (<FormControl className={classes.formControl}>
        <div className={classes.label}>Asset</div>
        <Select
            id="assetDropdown"
            value={props.asset}
            onChange={(event) => props.onChange(event.target.value as string)}
            className={classes.select}
            MenuProps={{ classes: { paper: classes.dropDownProps } }}
        >
            {images.map(i => (
                <MenuItem key={i.address} className={classes.MenuItem} value={i.address}>{i.name}</MenuItem>
            ))}
        </Select>
    </FormControl>)
}