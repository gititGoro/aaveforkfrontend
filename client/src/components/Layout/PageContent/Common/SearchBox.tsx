import React from 'react';
import { createStyles, Theme, makeStyles, Paper, InputBase, IconButton, Grid } from '@material-ui/core';
import { Search } from '@material-ui/icons'

const searchStyle = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            borderColor: theme.foregroundColor[theme.palette.type],
            borderWidth: '1px',
            borderStyle: 'solid',
            padding: '2px 4px',
            display: 'flex',
            alignItems: 'center',
            width: 400,
            backgroundColor: theme.appbackground[theme.palette.type]
        },
        input: {
            marginLeft: theme.spacing(1),
            flex: 1,
            color: theme.foregroundColor[theme.palette.type]
        },
        iconButton: {
            padding: 10,
        },
        divider: {
            height: 28,
            margin: 4,
        },
        label: {
            fontFamily: theme.standardFont.fontFamily,
            fontSize: theme.standardFont.fontSize,
            color: theme.foregroundColor[theme.palette.type]
        }, searchGrid: {

        }
    }),
);

interface props {
    placeholder: string
    onChange: (text: string) => void
    value: string
    searchAction?: () => void
    label: string
}

export default function SearchBox(props: props) {
    const classes = searchStyle();

    return (
        <Grid
            container
            direction="column"
            justify="flex-start"
            alignItems="flex-start"
            spacing={1}
            className={classes.searchGrid}
        >
            <Grid item className={classes.label}>
                {props.label}
            </Grid>
            <Grid item>
                <Paper component="form" className={classes.root}>
                    <InputBase
                        className={classes.input}
                        placeholder={props.placeholder}
                        inputProps={{ 'aria-label': 'address' }}
                        onChange={(event) => props.onChange(event.target.value)}
                        value={props.value}
                    />
                    <IconButton className={classes.iconButton} aria-label="search" onClick={() => props.searchAction ? props.searchAction() : {}}>
                        <Search />
                    </IconButton>
                </Paper>
            </Grid>
        </Grid>
    );
}