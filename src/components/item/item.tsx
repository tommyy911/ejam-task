import React, {FC} from 'react';
import styles from './item.module.scss';
import { ItemImage } from './item-image';
import { ItemDescription } from './item-description';
import { Row } from '../rwd/row';
import { Columns } from '../rwd/columns';

type Props = {
    handleProceedToPurchase: () => void;
}

export const Item: FC<Props> = ({handleProceedToPurchase}) => {
    const imageUrl = './product.png';
    const itemDetails = {
        title: 'Poièma',
        subTitle: 'Gods craftwork',
        description: 'Multi-Functional serum Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur sit amet tortor ultrices mauris vulputate pharetra convallis at nisl. Morbi ornare orci a odio imperdiet, non malesuada ante dictum.'
    }
    return (
        <section className={styles.itemContainer}>
            <Row>
                <Columns md={6} xs={12}>
                    <ItemImage imageUrl={imageUrl} />
                </Columns>
                <Columns md={6} xs={12} >
                    <ItemDescription handleProceedToPurchase={handleProceedToPurchase} itemDetails={itemDetails} />
                </Columns>
            </Row>

        </section>
    )
}