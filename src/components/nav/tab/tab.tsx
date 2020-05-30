import React, { FC } from 'react';
import styles from './tab.module.scss';

export type TabType = {
    id: number;
    name: string;
    isActive: boolean;
}

type Props = {
    tab: TabType;
    handleTabChange: (tab: TabType) => void
}

export const Tab: FC<Props> = ({ tab, handleTabChange }) => (
    <div
        className={`${tab.isActive ? styles.tabActive : styles.tab}`}
        onClick={() => {
            handleTabChange(tab)
        }}>
        {tab.name}
    </div>
)