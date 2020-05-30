import { Dispatch } from "react";
import { GET_IP_ADDRESS, GET_IP_ADDRESS_FULFILLED } from "../actions";

const url = 'https://extreme-ip-lookup.com/json'

export const getIpAddressThunk = () => (dispatch: Dispatch<any>) => {
    dispatch({
        type: GET_IP_ADDRESS
    })
    return fetch(url).then(res => res.json()).then(response => {
        dispatch({ type: GET_IP_ADDRESS_FULFILLED, payload: response })
    })
}