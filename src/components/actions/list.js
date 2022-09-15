import axios from 'axios'
import {setFetchError, setIsFetching, setList} from "../../reducers/pageReducer";

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

export const getCurrentRepo = async (setList, id) => {
    const response = await axios.get(`https://oril-coins-test.herokuapp.com/item/${id}`)
    setList(response.data)
}