import React, { FC, useState, useEffect, ChangeEvent } from 'react';
import { connect, RootStateOrAny } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'

import styles from './form.module.scss'
import globalStyles from '../../index.module.scss';
import { Row } from '../rwd/row';
import { Columns } from '../rwd/columns';
import { IpAddressType, PriceDataType, OrderType } from '../../store-config/reducers';
import { postNewOrder } from '../../store-config/thunks/postNewOrder';

type Props = {
    location: IpAddressType,
    isLocationFetching: boolean,
    priceData: PriceDataType,
    postingOrder: boolean,
    postNewOrder: (data: OrderType) => void,
}

export type FormDataType = {
    firstName: string,
    lastName: string,
    email: string,
    phone: string
    streetName: string
    country: string
    city: string
}

const defaultFormData = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    streetName: '',
    country: '',
    city: '',
}

export const FormComponent: FC<Props> = ({
    location,
    isLocationFetching,
    priceData,
    postNewOrder,
    postingOrder,
}) => {
    const [formData, setFormData] = useState(defaultFormData);

    const setDefaultFormData = () => {
        setFormData({
            ...defaultFormData,
            country: location.country,
            city: location.city
        })
    }

    useEffect(() => {
        if (location) {
            setDefaultFormData();
        }
    }, [location])

    if (isLocationFetching || postingOrder) {
        return (
            <div className={globalStyles.spinnerContainer}>
                <FontAwesomeIcon size="lg" spin icon={faSpinner} />
            </div>
        )
    }
    const handleFormChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { value, name } = event.target;
        setFormData(
            {
                ...formData,
                [name]: value
            }
        )
    }

    return (
        <form>
            <Row>
                <Columns xs={12} sm={6}>
                    <label className={styles.spacing} htmlFor="firstName">
                        <input
                            required
                            name="firstName"
                            onChange={handleFormChange}
                            value={formData.firstName}
                            type="text"
                            id="firstName"
                            placeholder={'First name:'}
                        />
                    </label>
                </Columns>
                <Columns xs={12} sm={6}>
                    <label className={styles.spacing} htmlFor="lastName">
                        <input
                            required
                            name="lastName"
                            onChange={handleFormChange}
                            value={formData.lastName}
                            type="text"
                            id="lastName"
                            placeholder={'Last name:'}
                        />
                    </label>
                </Columns>
            </Row>
            <Row>
                <Columns xs={12} sm={4}>
                    <label className={styles.spacing} htmlFor="email">
                        <input
                            required
                            name="email"
                            onChange={handleFormChange}
                            value={formData.email}
                            type="email"
                            id="email"
                            placeholder={'Email:'}
                        />
                    </label>
                </Columns>
                <Columns xs={12} sm={4}>
                    <label className={styles.spacing} htmlFor="phone">
                        <input
                            required
                            name="phone"
                            onChange={handleFormChange}
                            value={formData.phone}
                            type="tel"
                            id="phone"
                            placeholder={'Phone:'}
                        />
                    </label>
                </Columns>
                <Columns xs={12} sm={4}>
                    <label className={styles.spacing} htmlFor="streetName">
                        <input
                            required
                            name="streetName"
                            onChange={handleFormChange}
                            value={formData.streetName}
                            type="text"
                            id="streetName"
                            placeholder={'Street name'}
                        />
                    </label>
                </Columns>
            </Row>
            <Row>
                <Columns xs={12} sm={6}>
                    <label className={styles.spacing} htmlFor="country">
                        <input
                            type="text"
                            value={formData.country}
                            disabled
                            id="country"
                            placeholder={'Country:'}
                        />
                    </label>
                </Columns>
                <Columns xs={12} sm={6}>
                    <label className={styles.spacing} htmlFor="city">
                        <input
                            type="text"
                            value={formData.city}
                            disabled
                            id="city"
                            placeholder={'City:'}
                        />
                    </label>
                </Columns>
            </Row>
            <Row>
                <Columns xs={12}>
                    <button
                        type="submit"
                        className={`${globalStyles.floatRight} ${styles.spacing}`}
                        onClick={(event) => {
                            event.preventDefault();
                            postNewOrder({
                                createdAt: new Date().toISOString(),
                                country: formData.country,
                                firstName: formData.firstName,
                                lastName: formData.lastName,
                                units: priceData.quantity,
                                isPremium: priceData.isPremium
                            })
                            setDefaultFormData();
                        }}
                    >Purchase</button>
                </Columns>
            </Row>
        </form>
    )
}

const mapStateToProps = (state: RootStateOrAny) => ({
    location: state.location,
    priceData: state.priceData,
    isLocationFetching: state.isLocationFetching,
    postingOrder: state.postingOrder,
})

const mapDispathToProps = {
    postNewOrder: postNewOrder
}


export const Form = connect(mapStateToProps, mapDispathToProps)(FormComponent)