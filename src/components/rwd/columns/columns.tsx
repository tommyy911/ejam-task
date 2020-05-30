import React, { FC, ReactNode } from 'react';
import styles from './columns.module.scss';

type Props = {
    children: ReactNode;
    xs?: number;
    sm?: number;
    md?: number;
    lg?: number;
}

export const Columns: FC<Props> = ({ xs, sm, md, lg, children }) => {
    let classNames = ``;
    if(xs){
        classNames += `${styles[`columns_xs_${xs}`]} `;
    }
    if(sm){
        classNames += `${styles[`columns_sm_${sm}`]} `;
    }
    if(md){
        classNames += `${styles[`columns_md_${md}`]} `;
    }
    if(lg){
        classNames += `${styles[`columns_lg_${lg}`]} `;
    }
    return (
        <div className={classNames}>
            {children}
        </div>
    )
}