import {
    UPDATE_PRICE,
    GET_IP_ADDRESS,
    GET_IP_ADDRESS_FULFILLED,
    POST_ORDER,
    POST_ORDER_FULFILLED,
    GET_ORDERS,
    GET_ORDERS_FULFILLED
} from '../actions';

export const CURRENT_PRICE = 27.49;

export type PriceDataType = {
    amount: number,
    isPremium: boolean,
    quantity: number
}

export type IpAddressType = {
    businessName: string,
    businessWebsite: string,
    city: string,
    continent: string,
    country: string,
    countryCode: string,
    ipName: string,
    ipType: string,
    isp: string,
    lat: string,
    lon: string,
    org: string,
    query: string,
    region: string,
    status: string
}

type RootStateType = {
    priceData: PriceDataType,
    isLocationFetching: boolean,
    isOrdersFetching: boolean,
    postingOrder: boolean,
    ordersList: OrderType[],
    isOrdersFetched: boolean,
    location?: any,
}

export type OrderType = {
    createdAt: string,
    country: string,
    firstName: string,
    lastName: string,
    units: number,
    isPremium: boolean
    id?: string,
}

export type ActionType = {
    type: string,
    payload: any
}

const initialState: RootStateType = {
    priceData: {
        amount: CURRENT_PRICE,
        isPremium: false,
        quantity: 1
    },
    ordersList: [],
    postingOrder: false,
    isLocationFetching: false,
    isOrdersFetching: true,
    isOrdersFetched: false,
}

const rootReducer = (state = initialState, action: ActionType) => {
    switch (action.type) {
        case UPDATE_PRICE:
            return {
                ...state,
                priceData: action.payload
            }
        case GET_IP_ADDRESS:
            return {
                ...state,
                isLocationFetching: true
            }
        case GET_IP_ADDRESS_FULFILLED:
            return {
                ...state,
                isLocationFetching: false,
                location: action.payload
            }
        case POST_ORDER:
            return {
                ...state,
                postingOrder: true
            }
        case POST_ORDER_FULFILLED:
            return {
                ...state,
                postingOrder: false,
                priceData: initialState.priceData,
                ordersList: [...state.ordersList, action.payload]
            }
        case GET_ORDERS:
            return {
                ...state,
                isOrdersFetching: true
            }
        case GET_ORDERS_FULFILLED:
            return {
                ...state,
                isOrdersFetching: false,
                isOrdersFetched: true,
                ordersList: [...state.ordersList, ...action.payload]
            }
        default:
            return { ...state }
    }
}
export default rootReducer;