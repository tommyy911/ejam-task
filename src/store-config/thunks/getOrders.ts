import { Dispatch } from "react";
import { GET_ORDERS, GET_ORDERS_FULFILLED } from "../actions";

const url = 'https://api.jsonbin.io/b/5ecd438ca2a6e10f7bc644c3'

export const getOrdersList = () => (dispatch: Dispatch<any>) => {
    dispatch({
        type: GET_ORDERS
    })
    return fetch(url).then(res => res.json()).then(response => {
        dispatch({ type: GET_ORDERS_FULFILLED, payload: response })
    })
}