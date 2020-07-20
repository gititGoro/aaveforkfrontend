import React, { useState, useEffect } from 'react';
import { Drawer, Grid, Button } from '@material-ui/core'
import { Theme, makeStyles, createStyles } from '@material-ui/core/styles';
import withWidth from '@material-ui/core/withWidth';
import { Breakpoint } from '@material-ui/core/styles/createBreakpoints';
import growArrow from '../../../images/growArrow.png'
import shrinkArrow from '../../../images/shrinkArrow.png'

const bigWidth = 180
const smallWidth = 50
const delayDuration = '300ms'
const delayFunction = 'ease'
const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        actionDrawerShrunk: {
            overflowX: "hidden",
            width: smallWidth,
            flexShrink: 0,
            background: theme.componentBackground[theme.palette.type],

            transitionProperty: "width",
            transitionDuration: delayDuration,
            transitionTimingFunction: delayFunction
        },
        actionDrawerBig: {
            overflowX: "hidden",
            width: bigWidth,
            background: theme.componentBackground[theme.palette.type],
            transitionProperty: "width",
            transitionDuration: delayDuration,
            transitionTimingFunction: delayFunction
        },
        actionDrawerPaperShrunk: {
            overflowX: "hidden",
            width: smallWidth,
            background: theme.componentBackground[theme.palette.type],
            transitionProperty: "width",
            transitionDuration: delayDuration,
            transitionTimingFunction: delayFunction
        },
        actionDrawerPaperBig: {
            overflowX: "hidden",
            width: bigWidth,
            background: theme.componentBackground[theme.palette.type],
            transitionProperty: "width",
            transitionDuration: delayDuration,
            transitionTimingFunction: delayFunction
        },
        contentRoot: {
            overflowX: "hidden",
            background: theme.componentBackground[theme.palette.type]
        },
        footer: {
            position: "absolute",
            bottom: 0,
            right: 0,

        },
        shrinkButton: {
            background: theme.controlHighlight[theme.palette.type],
            width: 140,
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
        }
    }),
);

interface leftPanelProps {
    width: Breakpoint
}

function LeftPanel(props: leftPanelProps) {
    const classes = useStyles()
    const [expanded, setExpanded] = useState<boolean>(true)
    const [clickExpand, setClickExpand] = useState<boolean>(false)
    const [clickShrink, setClickShrink] = useState<boolean>(false)

    const wide = widthBig(props.width)

    useEffect(() => {
        if (clickExpand) {
            setExpanded(true)
            setClickShrink(false)
        }
        else if (clickShrink) {
            setExpanded(false)
            setClickExpand(false)
        }

        if (!wide && expanded && !clickExpand) {
            setExpanded(false)
        } else if (wide && !expanded && !clickShrink) {
            setExpanded(true)
        } else if (wide && expanded) {
            setClickExpand(false)
        }
    });

    let drawerClass = expanded ? classes.actionDrawerBig : classes.actionDrawerShrunk
    let drawerPaperClasses = expanded ? classes.actionDrawerPaperBig : classes.actionDrawerPaperShrunk

    return <Drawer variant="persistent"
        open={true}
        className={drawerClass}
        classes={{ paper: drawerPaperClasses }}
    >
        <div className={classes.contentRoot}>
            <Grid
                container
                direction="column"
                justify="flex-end"
                alignItems="flex-end"
                className={classes.footer}
            >
                <Grid item>
                    {expanded
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
