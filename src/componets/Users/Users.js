import React from 'react';
import Paginator from '../common/Paginator/Paginator';
import User from './User';


let Users = (props) => {
    return <div>
        <Paginator totalItemCount={props.totalUserCount}
            pageSize={props.pageSize}
            portionSize={props.portionSize}
            currentPage={props.currentPage}
            onPageChange={props.onPageChange} />
        {
            props.users.map(u => <User user={u}
                followingInProgress={props.followingInProgress}
                unfollow={props.unfollow}
                follow={props.follow}
                key={u.id} />)
        }
    </div>
}

export default Users;