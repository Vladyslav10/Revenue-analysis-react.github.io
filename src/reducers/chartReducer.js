const SET_WEEK_SORT = "SET_WEEK_SORT"; 
const SET_MONTH_SORT = "SET_MONTH_SORT"; 
const SET_YEAR_SORT = "SET_YEAR_SORT"; 
const SET_LABELS = "SET_LABELS"; 

const defaultState = {
    weekSort: false,
    monthSort: false,
    yearSort: false,
    labels: [],
}


export default function reposReducer(state = defaultState, action) {
    switch (action.type) {
        case SET_LABELS:
            return {
                ...state,
                labels: action.payload
            }
        case SET_WEEK_SORT:
            return {
                ...state,
                weekSort: action.payload
            }
        case SET_MONTH_SORT:
            return {
                ...state,
                monthSort: action.payload
            }
        case SET_YEAR_SORT:
            return {
                ...state,
                yearSort: action.payload
            }
        default:
            return state
    }
}

export const setWeekSort = (bool) => ({type:SET_WEEK_SORT, payload:bool})
export const setMonthSort = (bool) => ({type:SET_MONTH_SORT, payload:bool})
export const setYearSort = (bool) => ({type:SET_YEAR_SORT, payload:bool})
export const setLabels = (arr) => ({type:SET_LABELS, payload:arr})