import axios from 'axios'
import {setFetchError, setIsFetching, setList, setUser} from "../../reducers/pageReducer";
import {setLabels} from "../../reducers/chartReducer";

export const getUsers = () => {
    
    return async (dispatch) => {
        try {
            dispatch(setIsFetching(true))
            const response = await axios.get(`https://oril-coins-test.herokuapp.com/list`)
            dispatch(setList(response.data))
        } catch (e) {
            dispatch(setFetchError(true))
            dispatch(setIsFetching(false))
            setTimeout(()=> {
                dispatch(setFetchError(false))
            }, 2000)
        }

    }
}

export const getCurrentUser = (id) => {
    return async (dispatch) => {
        try {
            dispatch(setIsFetching(true))
            const response = await axios.get(`https://oril-coins-test.herokuapp.com/item/${id}`)
            const sortedAmount = response.data.data.sort( (a, b) => Date.parse(a.date) - Date.parse(b.date));
            dispatch(setUser(sortedAmount));
            dispatch(setLabels(sortedAmount))
        } catch (e) {
            dispatch(setFetchError(true))
            dispatch(setIsFetching(false))
            setTimeout(()=> {
                dispatch(setFetchError(false))
            }, 2000)
        }

    }
}