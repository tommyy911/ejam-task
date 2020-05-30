import React, { FC, ChangeEvent, useState, useEffect } from 'react';
import { connect, RootStateOrAny } from 'react-redux';
import styles from './quantity-data.module.scss';
import globalStyles from '../../index.module.scss';
import { updatePrice } from '../../store-config/actions';
import { CURRENT_PRICE, PriceDataType } from '../../store-config/reducers';
import { Row } from '../rwd/row';
import { Columns } from '../rwd/columns';

const DISCOUNT_STEP_PERCENTAGE = 0.05;
type Props = {
    handleProceedToPurchase: () => void;
    priceData: PriceDataType
    updatePrice: (data: PriceDataType) => void
}

export const roundTo2Decimals = (value: number) => Math.round(value * Math.pow(10, 2)) / Math.pow(10, 2);
export const roundTo99 = (value: number) => Math.floor(value) + 0.99;

export const calculatePrice = (quantity: string | number, isPremium: boolean): number => {
    const nQuantity = Number(quantity)
    let updatedPrice = CURRENT_PRICE * nQuantity;
    if (nQuantity > 1) {
        const percentageDiscount = (nQuantity - 1) * DISCOUNT_STEP_PERCENTAGE
        updatedPrice *= roundTo2Decimals(1 - percentageDiscount);
        updatedPrice = roundTo99(updatedPrice);
    }
    if(isPremium && nQuantity < 12){
        updatedPrice += 15;
    } 

    return updatedPrice
}

export const QuantityDataComponent: FC<Props> = ({ handleProceedToPurchase, priceData, updatePrice }) => {
    const [isEligibleForPremiumDiscount, setEligibleForPremiumDiscount] = useState<boolean>(false)
    const { isPremium, amount: price, quantity } = priceData;

    useEffect(() => {
        setEligibleForPremiumDiscount(priceData.quantity === 12);
    }, [priceData])

    const handleQuantityChange = (event: ChangeEvent<HTMLSelectElement>) => {
        const { value } = event.target;
        updatePrice({
            amount: calculatePrice(value, isPremium),
            isPremium,
            quantity: Number(value)
        })

    }

    const handlePremiumShipping = () => {
        if (!isEligibleForPremiumDiscount) {
            const newPremium = !isPremium;
            updatePrice({
                amount: calculatePrice(quantity, newPremium),
                isPremium: newPremium,
                quantity
            })
        }
    }

    return (
        <>
            <Row>
                <Columns xs={3}>
                    <span className={styles.label}>Quantity:</span>
                </Columns>
                <Columns xs={9}>
                    <select name="quantity" onChange={handleQuantityChange} value={quantity}>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                        <option value="7">7</option>
                        <option value="8">8</option>
                        <option value="9">9</option>
                        <option value="10">10</option>
                        <option value="11">11</option>
                        <option value="12">12</option>
                    </select>
                </Columns>
            </Row>
            <Row>
                <Columns xs={12}>
                    <label htmlFor="premiumShipping">
                        <span className={styles.label}>Premium shipping and support {!isEligibleForPremiumDiscount ? '(+ 15.00$ )' : ' ( FREE! )'}</span>
                        <input type="checkbox" checked={isPremium} id="premiumShipping" onChange={handlePremiumShipping} />
                    </label>
                </Columns>
            </Row>
            <Row>
                <Columns xs={12}>
                    Price: <strong>{price.toFixed(2)}$</strong>
                </Columns>
            </Row>
            <Row>
                <Columns xs={12}>
                    <button className={globalStyles.floatRight} onClick={handleProceedToPurchase}>Next step</button>
                </Columns>
            </Row>
        </>
    )
}

const mapStateToProps = (state: RootStateOrAny) => ({
    priceData: state.priceData
})

const mapDispatchToProps = {
    updatePrice: updatePrice
}

export const QuantityData = connect(mapStateToProps, mapDispatchToProps)(QuantityDataComponent)