import { PriceDataType } from '../reducers'
export const UPDATE_PRICE = 'UPDATE_PRICE';
export const GET_IP_ADDRESS = 'GET_IP_ADDRESS';
export const GET_IP_ADDRESS_FULFILLED = 'GET_IP_ADDRESS_FULFILLED';
export const POST_ORDER = 'POST_ORDER';
export const POST_ORDER_FULFILLED = 'POST_ORDER_FULFILLED';
export const GET_ORDERS = 'GET_ORDERS';
export const GET_ORDERS_FULFILLED = 'GET_ORDERS_FULFILLED';


export const updatePrice = (priceData: PriceDataType) => (
    {
        type: UPDATE_PRICE,
        payload: priceData
    }
)