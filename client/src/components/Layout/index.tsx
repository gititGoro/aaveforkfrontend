import React from 'react';
import PageContent from './PageContent/index'
import LeftPanel from './LeftPanel/index'
import BottomPanel from './BottomPanel'
interface props {

}

export default function Layout(props: props) {

    return <div>
        <LeftPanel />
        <BottomPanel />
        <PageContent />
    </div>
}