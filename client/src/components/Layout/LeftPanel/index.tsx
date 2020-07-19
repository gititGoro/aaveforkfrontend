import React, { useState, useEffect } from 'react';
import { Drawer, Grid, Button } from '@material-ui/core'
import { Theme, makeStyles, createStyles } from '@material-ui/core/styles';
import withWidth from '@material-ui/core/withWidth';
import { Breakpoint } from '@material-ui/core/styles/createBreakpoints';

let bigWidth = 180
let smallWidth = 50

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        actionDrawerShrunk: {
            width: smallWidth,
            flexShrink: 0,
        },
        actionDrawerBig: {
            width: bigWidth
        },
        actionDrawerPaperShrunk: {
            overflowX:"hidden",
            width: smallWidth,
        },
        actionDrawerPaperBig: {
            width: bigWidth
        },
        contentRoot: {
        },
        footer: {
            position: "absolute",
            bottom: 0,
            right: 0,
        },
        shrinkButton:{
             //   backgroundColor:theme.palette.augmentColor
        },
        expandButton:{

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
        }else if(wide && expanded){
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
                alignItems="center"
                className={classes.footer}
            >
                <Grid item>
                    {expanded
                        ?
                        <Button onClick={() => setClickShrink(true)}>{"<<"}</Button>
                        :
                        <Button onClick={() => setClickExpand(true)}>{">>"} </Button>}
                </Grid>
            </Grid>
        </div>
    </Drawer>
}

function widthBig(width: Breakpoint): boolean {
    return width === 'lg' || width === 'xl'
}

export default withWidth()(LeftPanel)
