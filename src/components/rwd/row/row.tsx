import React, { FC, ReactNode } from 'react';
import styles from './row.module.scss';

type Props = {
    children: ReactNode
}

export const Row: FC<Props> = ({ children }) => (
    <div className={styles.row}>
        {children}
    </div>
)