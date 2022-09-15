const SET_LIST = "SET_LIST"
const SET_IS_FETCHING = "SET_IS_FETCHING"
const SET_FETCH_ERROR = "SET_FETCH_ERROR"

const defaultState = {
    items: [],
    isFetching: true,
    isFetchError: false
}


export default function reposReducer(state = defaultState, action) {
    switch (action.type) {
        case SET_LIST:
            return {
                ...state,
                items: action.payload,
                isFetching: false
            }
        case SET_IS_FETCHING:
            return {
                ...state,
                isFetching: action.payload
            }
        case SET_FETCH_ERROR:
            return {
                ...state,
                isFetchError: action.payload
            }
        default:
            return state
    }
}

export const setList = (list) => ({type:SET_LIST, payload:list})
export const setIsFetching = (bool) => ({type:SET_IS_FETCHING, payload:bool})
export const setFetchError = (bool) => ({type:SET_FETCH_ERROR, payload:bool})
