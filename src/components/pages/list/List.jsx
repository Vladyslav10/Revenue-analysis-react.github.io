import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUsers } from '../../actions/list';
import User from '../../user/User';
import './List.scss';

const List = () => {
    const dispatch = useDispatch();
    const list = useSelector(state => state.list.items);
    const isFetching = useSelector(state => state.list.isFetching);
    const isFetchError = useSelector(state => state.list.isFetchError);

    useEffect(()=>{
        dispatch(getUsers())
    }, [])


    return (
        <div className="list">
            <div className="list__container container">
                <div className="list__input">
                    <input type="text" placeholder='Search' />
                </div>
                { isFetchError &&
                    <h2 className="alert alert-danger" role="alert">
                        Произошла ошибка! Пoжалуйста обновите страницу!
                    </h2>
                }
                <div className="list__table table">
                    <div className="table__main">
                        <p className='table__name'>Name</p>
                        <p className='table__date'>Date</p>
                        <p className='table__status'>state</p>
                    </div>
                    {
                        isFetching === false
                        ?
                        list.map(user =><User key={user._id} user={user}/>)
                        :
                        <div className="fetching"></div>
                    }
                </div>
            </div>
        </div>
    );
};

export default List;