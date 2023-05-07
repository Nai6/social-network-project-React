import React, { useState } from 'react'
import style from './Header.module.css'
import Preloader from '../common/Preloader/Preloader'
import { NavLink } from 'react-router-dom';
import Profile from '../../assets/images/HeaderIcons/Profile.png'
import Dialog from '../../assets/images/HeaderIcons/Dialog.png'
import Users from '../../assets/images/HeaderIcons/Users.png'
import Logo from '../../assets/images/HeaderIcons/Logo.png'
import Search_icon from '../../assets/images/HeaderIcons/Search.png'
import Exit from '../../assets/images/HeaderIcons/Exit.png'
import userPhoto from '../../assets/images/CommonIcons/userPhoto.png'

const Header = (props) => {
    return <header>
        <div className={style.header_left}>
            <img className={style.logo} src={Logo} alt="Logo" />
            {props.isAuth ? <HeaderNav /> : ''}
        </div>
        {props.isAuth
            ? <UserProfile
                isAuth={props.isAuth}
                profile={props.profile}
                logout={props.logout} />
            : <SignIn
                isAuth={props.isAuth}
                login={props.login}
                logout={props.logout} />}
    </header>
}

const HeaderNav = (props) => {
    return (<ul>
        <li><NavLink to='/profile'>
            <img src={Profile} alt='Profile' /></NavLink></li>
        <li><NavLink to='/dialogs/*'>
            <img src={Dialog} alt='Dialog' /></NavLink></li>
        <li><NavLink to='/users/*'>
            <img src={Users} alt='Users' /></NavLink></li>
    </ul>)
}

const UserProfile = (props) => {
    let [profilePhoto, setProfilePhoto] = useState(null)
    debugger

    if(!profilePhoto && props.profile) {
        if(props.profile.photos.small && props.profile.photos.small !=null) setProfilePhoto(props.profile.photos.small)
        else setProfilePhoto(userPhoto)
    }
    
    return <div className={style.header_right}>
        <div className={style.search_box}>
            <img src={Search_icon} alt='search_box' />
            <input type='text' placeholder='Search' />
        </div>


        <div className={props.isAuth ? style.header_user_icon + ' ' + style.online : style.header_user_icon}>
            <NavLink to={`/profile`}>
                {profilePhoto
                    ? <img src={profilePhoto} alt='user_icon' />
                    : <Preloader />}
            </NavLink>
        </div>
        <img id={style['exit']} src={Exit} onClick={props.logout} alt='logout' />
    </div>
}

const SignIn = (props) => {
    return <div className={style.header_right}>
        <NavLink to={`/login`}>Sing In</NavLink>
    </div>
}

export default Header;