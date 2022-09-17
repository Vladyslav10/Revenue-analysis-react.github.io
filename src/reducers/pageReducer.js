const SET_LIST = "SET_LIST";
const SET_USER = "SET_USER";
const SET_IS_FETCHING = "SET_IS_FETCHING";
const SET_FETCH_ERROR = "SET_FETCH_ERROR";
const SET_SORT_BY_DATE = "SET_SORT_BY_DATE"; 
const SET_SORT_BY_ACTIVE = "SET_SORT_BY_ACTIVE"; 

const defaultState = {
    items: [],
    user: [],
    isFetching: true,
    isFetchError: false,
    sortByDate: false,
    sortByActive: false,
}


export default function reposReducer(state = defaultState, action) {
    switch (action.type) {
        case SET_LIST:
            return {
                ...state,
                items: action.payload,
                isFetching: false
            }
        case SET_USER:
            return {
                ...state,
                user: action.payload,
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
        case SET_SORT_BY_DATE:
            return {
                ...state,
                sortByDate: action.payload
            }
        case SET_SORT_BY_ACTIVE:
            return {
                ...state,
                sortByActive: action.payload
            }
        default:
            return state
    }
}

export const setList = (list) => ({type:SET_LIST, payload:list})
export const setUser = (user) => ({type:SET_USER, payload:user})
export const setIsFetching = (bool) => ({type:SET_IS_FETCHING, payload:bool})
export const setFetchError = (bool) => ({type:SET_FETCH_ERROR, payload:bool})
export const setSortByDate = (bool) => ({type:SET_SORT_BY_DATE, payload:bool})
export const setSortByActive = (bool) => ({type:SET_SORT_BY_ACTIVE, payload:bool})
