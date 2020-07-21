import React, { useState, useEffect } from 'react';
import { Drawer, Grid, Button, List, ListItem } from '@material-ui/core'
import { Theme, makeStyles, createStyles } from '@material-ui/core/styles';
import withWidth from '@material-ui/core/withWidth';
import { Breakpoint } from '@material-ui/core/styles/createBreakpoints';
import growArrow from '../../../images/growArrow.png'
import shrinkArrow from '../../../images/shrinkArrow.png'
import ShortcutButtons from './ShortcutButtons'
import WalletView from './WalletView'

const bigWidth = 200
const smallWidth = 50
const delayDuration = '300ms'
const delayFunction = 'ease'
const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        actionDrawerShrunk: {
            overflowX: "visible",
            overflowY:"visible",
            width: smallWidth,
            flexShrink: 0,
            background: theme.componentBackground[theme.palette.type],

            transitionProperty: "width",
            transitionDuration: delayDuration,
            transitionTimingFunction: delayFunction
        },
        actionDrawerBig: {
            overflowX: "visible",
            overflowY:"visible",
            width: bigWidth,
            background: theme.componentBackground[theme.palette.type],
            transitionProperty: "width",
            transitionDuration: delayDuration,
            transitionTimingFunction: delayFunction
        },
        actionDrawerPaperShrunk: {
            overflowX: "visible",
            overflowY:"visible",
            width: smallWidth,
            background: theme.componentBackground[theme.palette.type],
            transitionProperty: "width",
            transitionDuration: delayDuration,
            transitionTimingFunction: delayFunction
        },
        actionDrawerPaperBig: {
            overflowX: "visible",
            overflowY:"visible",
            width: bigWidth,
            background: theme.componentBackground[theme.palette.type],
            transitionProperty: "width",
            transitionDuration: delayDuration,
            transitionTimingFunction: delayFunction
        },
        contentRoot: {
            overflowX: "visible",
            overflowY:"visible",
            background: theme.componentBackground[theme.palette.type]
        },
        footer: {
            position: "absolute",
            bottom: 0,
            right: 0,

        },
        shrinkButton: {
            background: theme.controlHighlight[theme.palette.type],
            width: 170,
            borderRadius: "25px 0 0 25px",

        },
        expandButton: {
            background: theme.controlHighlight[theme.palette.type]
        },
        arrowContainer: {
            width: "100%",
            display: "flex",
        },
        arrow: {
            alignItems: "flex-start",
        },
        navigationList: {
            width: '100%',
            maxWidth: 360,
        },
    }),
);

interface leftPanelProps {
    width: Breakpoint
    setExpanded: (e: boolean) => void
    expanded: boolean
    isAdmin: boolean
}

function LeftPanel(props: leftPanelProps) {
    const classes = useStyles()
    const [clickExpand, setClickExpand] = useState<boolean>(false)
    const [clickShrink, setClickShrink] = useState<boolean>(false)
    const wide = widthBig(props.width)

    useEffect(() => {
        if (clickExpand) {
            props.setExpanded(true)
            setClickShrink(false)
        }
        else if (clickShrink) {
            props.setExpanded(false)
            setClickExpand(false)
        }

        if (!wide && props.expanded && !clickExpand) {
            props.setExpanded(false)
        } else if (wide && !props.expanded && !clickShrink) {
            props.setExpanded(true)
        } else if (wide && props.expanded) {
            setClickExpand(false)
        }
    });

    let drawerClass = props.expanded ? classes.actionDrawerBig : classes.actionDrawerShrunk
    let drawerPaperClasses = props.expanded ? classes.actionDrawerPaperBig : classes.actionDrawerPaperShrunk

    return <Drawer variant="permanent"
        open={true}
        className={drawerClass}
        classes={{ paper: drawerPaperClasses }}

    >
        <List className={classes.navigationList}
            component="nav"
        >
            <ListItem key="wallet">
                <WalletView expanded={props.expanded} />
            </ListItem>

            <ShortcutButtons expanded={props.expanded} isAdmin={props.isAdmin} />
        </List>
        <div className={classes.contentRoot}>
            <Grid
                container
                direction="column"
                justify="flex-end"
                alignItems="flex-end"
                className={classes.footer}
            >
                <Grid item>
                    {props.expanded
                        ?
                        <Button key={1} className={classes.shrinkButton} onClick={() => setClickShrink(true)}><div className={classes.arrowContainer}><img className={classes.arrow} src={shrinkArrow} /></div></Button>
                        :
                        <Button key={2} className={classes.expandButton} onClick={() => setClickExpand(true)}> <img src={growArrow} /> </Button>}
                </Grid>
            </Grid>
        </div>
    </Drawer>
}


function widthBig(width: Breakpoint): boolean {
    return width === 'lg' || width === 'xl'
}

export default withWidth()(LeftPanel)
