import React from 'react';
import { useNavigate } from 'react-router-dom';
import './User.scss';


const User = (props) => {
    const user = props.user;
    const router = useNavigate();

    function modifyStr(str) {
        return str.slice(0, 10).split('-').reverse().join('.');
    }
    const date = modifyStr(user.date);
    
    return (
        <div onClick={()=> router(`/item/${user.id}`)} className='table__user user-table'>
            <p className='user-table__name'>{user.name}</p>
            <p className='user-table__date'>{date}</p>
            <p className={user.isActive ? 'user-table__status' : 'user-table__status false'}>{user.isActive? "Active" : "Disable"}</p>
        </div>
    );
};

export default User;