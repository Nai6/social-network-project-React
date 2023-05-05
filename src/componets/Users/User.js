import React from 'react';
import userPhoto from '../../assets/images/CommonIcons/userPhoto.png'
import { NavLink } from 'react-router-dom';
import style from './User.module.css'
import Follow from '../../assets/images/CommonIcons/Follow.png'
import Unfollow from '../../assets/images/CommonIcons/Unfollow.png'


let User = ({ user, followingInProgress, unfollow, follow }) => {
    return <div className={style.user}>
        
        <NavLink to={'/profile/' + user.id}>
            <img src={user.photos.small != null ? user.photos.small : userPhoto}
                alt="userPhoto" />
        </NavLink>

        <div className={style.user_info}>
            <ul>
                <li><p>{user.name}</p></li>
                <li><p>Status: {user.status ? user.status : 'I`m not in the mood to share my status...'}</p></li>
            </ul>
            {user.followed
                    ? <button disabled={followingInProgress.some(id => id === user.id)}
                        onClick={() => {
                            unfollow(user.id)
                        }}><img src={Unfollow} alt='FollowButton'/> <p>Unfollow user</p></button>

                    : <button disabled={followingInProgress.some(id => id === user.id)}
                        onClick={() => {
                            follow(user.id)
                        }}><img src={Follow} alt='UnfollowButton' /> <p>Follow user</p></button>}
        </div>

    </div>

}

export default User;