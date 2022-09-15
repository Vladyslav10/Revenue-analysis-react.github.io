import axios from 'axios'
import {setFetchError, setIsFetching, setList} from "../../reducers/pageReducer";

export const getRepos = (searchQuery = "stars:%3E1", currentPage, perPage) => {
    if (searchQuery === "") {
        searchQuery = "stars:%3E1";
    }
    return async (dispatch) => {
        try {
            dispatch(setIsFetching(true))
            const response = await axios.get(``)
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

export const getCurrentRepo = async (setList) => {
    const response = await axios.get(``)
    setList(response.data)
}