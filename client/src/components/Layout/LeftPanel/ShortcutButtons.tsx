import React, { useState } from 'react';
import { useLocation, Redirect } from "react-router-dom";
import { ListItem, ListItemIcon, Divider, makeStyles, createStyles, Theme } from '@material-ui/core'
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import AutorenewIcon from '@material-ui/icons/Autorenew';
import AddIcon from '@material-ui/icons/Add';
import DeveloperBoardIcon from '@material-ui/icons/DeveloperBoard';


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        MenuItems: {
            fontFamily: theme.standardFont.fontFamily,
            fontWeight: theme.standardFont.fontWeightMedium,
            fontSize: theme.standardFont.fontSize,
            color: "white",
            lineHeight: "16.8px",
            textTransform: "uppercase"
        },
        listItem: {
            '&:hover': {
                backgroundColor: theme.listHoverColor[theme.palette.type],
            },
            zIndex: 0
        },
        listItemSelected: {
            zIndex: 0,
            backgroundColor: theme.listHoverColor[theme.palette.type],
            '&:hover': {
                backgroundColor: theme.listHoverColor[theme.palette.type],
            },
        }
        , icon: {
            color: "white"
        },
        divider: {
            background: "rgba(255,255,255,0.8)"
        }
    }),
);

interface location {
    pathname: string
}
const classSetterFactory =
    (unselected: string, selected: string) =>
        (actualPath: location) =>
            (expectedPath: string) =>
                actualPath.pathname.length > 0 && actualPath.pathname.substring(1) === expectedPath ? selected : unselected

const showTextFactory = (expanded: boolean) => (text: string) => expanded ? text : ''

export default function ShortcutButtons(props: { expanded: boolean, isAdmin: boolean }) {


    const classes = useStyles()
    const showText = showTextFactory(props.expanded)
    const location = useLocation();

    const selectionFactory = classSetterFactory(classes.listItem, classes.listItemSelected)
    const classDecider = selectionFactory(location)
    const [redirectURL, setRedirectURL] = useState<'' | 'deposit' | 'borrow' | 'liquidation' | 'admin'>("")

    if (location.pathname.length > 1 && location.pathname.substring(1) === redirectURL) {
        setRedirectURL('')
    }
    const renderRedirect = redirectURL === '' ? '' : <Redirect to={'/' + redirectURL} />
    return <div className={classes.MenuItems}>
        {renderRedirect}
        <ListItem className={classDecider("deposit")} button key="deposit" onClick={() => setRedirectURL('deposit')}>
            <ListItemIcon>
                <AddIcon className={classes.icon} />
            </ListItemIcon>
            {showText("deposit")}
        </ListItem>
        <ListItem className={classDecider("borrow")} button key="Borrow" onClick={() => setRedirectURL('borrow')}>
            <ListItemIcon>
                <AccountBalanceIcon className={classes.icon} />
            </ListItemIcon>
            {showText("borrow")}
        </ListItem>
        <Divider className={classes.divider} />
        <ListItem className={classDecider("liquidation")} button key="Liquidation" onClick={() => setRedirectURL('liquidation')}>
            <ListItemIcon>
                <AutorenewIcon className={classes.icon} />
            </ListItemIcon>
            {showText("liquidation")}
        </ListItem>
        {props.isAdmin ?
            <div>
                <Divider className={classes.divider} />
                <ListItem className={classDecider("dashboard")} button key="dashboard" onClick={() => setRedirectURL('admin')}>
                    <ListItemIcon>
                        <DeveloperBoardIcon className={classes.icon} />
                    </ListItemIcon>
                    {showText("dashboard")}
                </ListItem>
            </div> : ""}
    </div>
}

