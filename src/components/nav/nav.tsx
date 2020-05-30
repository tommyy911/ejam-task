import React, { FC } from 'react';
import styles from './nav.module.scss'
import { Tab, TabType } from './tab';

type Props = {
    handleTabChange: (tab: TabType) => void;
    tabs: TabType[];
}

export const Nav: FC<Props> = ({ tabs, handleTabChange }) => (
    <header className={styles.header}>
        {
            tabs.map((tabItem) => <Tab key={tabItem.id} handleTabChange={handleTabChange} tab={tabItem} />)
        }
    </header>
)

