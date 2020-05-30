import React, { FC } from 'react';
import styles from './item-description.module.scss'
import { Row } from '../../rwd/row';
import { Columns } from '../../rwd/columns';
import { QuantityData } from '../../quantity-data';

type Props = {
    itemDetails: {
        title: string,
        subTitle: string,
        description: string
    },
    handleProceedToPurchase: () => void;
}

export const ItemDescription: FC<Props> = ({ itemDetails, handleProceedToPurchase }) => (
    <div className={styles.itemDescriptionContainer}>
        <Row>
            <Columns xs={12}>
                <h2>{itemDetails.title}</h2>
                <h4>{itemDetails.subTitle}</h4>
            </Columns>
        </Row>
        <Row>
            <Columns xs={12}>
                <p>{itemDetails.description}</p>
            </Columns>
        </Row>
        <Row>
            <Columns xs={12}>
                <QuantityData handleProceedToPurchase={handleProceedToPurchase} />
            </Columns>
        </Row>
    </div>
)