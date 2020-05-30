import React, { FC } from 'react';
import styles from './item-image.module.scss'

type Props = {
    imageUrl: string;
}

export const ItemImage: FC<Props> = ({ imageUrl }) => (
    <div className={styles.itemImageContainer}>
        <img src={imageUrl} alt='product image' />
    </div>
)