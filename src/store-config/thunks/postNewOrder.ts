import { Dispatch } from "react";
import { POST_ORDER, POST_ORDER_FULFILLED } from "../actions";
import { OrderType } from "../reducers";

export const postNewOrder = (data: OrderType) => (dispatch: Dispatch<any>) => {
    dispatch({
        type: POST_ORDER
    })
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve()
            dispatch({
                type: POST_ORDER_FULFILLED,
                payload: data
            })
        }, 2000)
    })
}