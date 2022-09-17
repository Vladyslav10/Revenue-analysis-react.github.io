import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearch } from '../../../custom-hooks/searchAndSort';
import { setSortByActive, setSortByDate } from '../../../reducers/pageReducer';
import { getUsers } from '../../actions/list';
import User from '../../user/User';
import './List.scss';

const List = () => {
    const dispatch = useDispatch();
    const list = useSelector(state => state.list.items);
    const isFetching = useSelector(state => state.list.isFetching);
    const isFetchError = useSelector(state => state.list.isFetchError);
    const sortByDate = useSelector(state => state.list.sortByDate);
    const sortByActive = useSelector(state => state.list.sortByActive);
    
    const [search, setSearch] = useState('');

    useEffect(()=>{
        dispatch(getUsers())
    }, [])

    const sortedList = useSearch(list, sortByDate, search, sortByActive)
    
    return (
        <div className="list">
            <div className="list__container container">
                <div className="list__input">
                    <input value={search} onChange={(e)=> setSearch(e.target.value)} type="text" placeholder='Search' />
                </div>
                { isFetchError &&
                    <h2 className="alert alert-danger" role="alert">
                        Произошла ошибка! Пoжалуйста обновите страницу!
                    </h2>
                }
                <div className="list__table table">
                    <div className="table__main">
                        <p className='table__name'>Name</p>
                        <p 
                            onClick={()=> dispatch(setSortByDate(!sortByDate))} 
                            className={sortByDate ? 'table__date active' : 'table__date'}
                        >
                            Date
                        </p>
                        <p 
                            onClick={()=> dispatch(setSortByActive(!sortByActive))} 
                            className={sortByActive? 'table__status active' : 'table__status'}
                        >
                            state
                        </p>
                    </div>
                    { isFetching && <div className="fetching"></div>}
                    {isFetching === false && !sortedList.length 
                        ? <h2 className="user-error">Posts not Found</h2>
                        : sortedList.map(user =><User key={user._id} user={user}/>)
                    }
                </div>
            </div>
        </div>
    );
};

export default List;