import React, { FC, useEffect } from 'react';
import { connect, RootStateOrAny } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner, faCheck, faTimes } from '@fortawesome/free-solid-svg-icons'

import { getOrdersList } from '../../store-config/thunks/getOrders';
import { OrderType } from '../../store-config/reducers';
import globalStyles from '../../index.module.scss';
import styles from './order-list.module.scss';
import { calculatePrice } from '../quantity-data/quantity-data';

type Props = {
    isOrdersFetching: boolean,
    ordersList: OrderType[],
    getOrderList: () => void,
    isOrdersFetched: boolean,
}

const OrderListComponent: FC<Props> = ({ getOrderList, ordersList, isOrdersFetching, isOrdersFetched }) => {

    useEffect(() => {
        if (!isOrdersFetched) {
            getOrderList();
        }
    }, [])
    if (isOrdersFetching) {
        return (
            <div className={globalStyles.spinnerContainer}>
                <FontAwesomeIcon size="lg" spin icon={faSpinner} />
            </div>
        )
    }
    return (
        <div className={styles.orderListContainer}>
            <table>
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Name</th>
                        <th>Units</th>
                        <th>Price</th>
                        <th>Premium service</th>
                    </tr>
                </thead>
                <tbody>
                    {ordersList.sort((order1, order2) => new Date(order1.createdAt).getTime() - new Date(order2.createdAt).getTime()).map((order) => (
                        <tr className={styles.orderListRow} key={order.id || order.createdAt}>
                            <td>{order.createdAt}</td>
                            <td>{order.firstName} {order.lastName}</td>
                            <td>{order.units}</td>
                            <td>{calculatePrice(order.units, order.isPremium).toFixed(2)}$</td>
                            <td>{order.isPremium ?
                                <FontAwesomeIcon color="green" size="sm" icon={faCheck} /> :
                                <FontAwesomeIcon color="red" size="sm" icon={faTimes} />}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

        </div>
    )
}

const mapStateToProps = (state: RootStateOrAny) => ({
    isOrdersFetching: state.isOrdersFetching,
    ordersList: state.ordersList,
    isOrdersFetched: state.isOrdersFetched
})

const mapDispatchToProps = {
    getOrderList: getOrdersList
}

export const OrderList = connect(mapStateToProps, mapDispatchToProps)(OrderListComponent)