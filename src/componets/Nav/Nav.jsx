import React from 'react'
import style from './Nav.module.css'
import { NavLink, Link } from 'react-router-dom'
import Profile from '../../assets/images/HeaderIcons/Profile.png'
import Dialog from '../../assets/images/HeaderIcons/Dialog.png'
import Users from '../../assets/images/HeaderIcons/Users.png'
import News from '../../assets/images/HeaderIcons/News.png'
import Music from '../../assets/images/HeaderIcons/Music.png'
import Settings from '../../assets/images/HeaderIcons/Settings.png'
import YouTube from '../../assets/images/HeaderIcons/YouTube.png'
import GitHub from '../../assets/images/HeaderIcons/GitHub.png'
import Site from '../../assets/images/HeaderIcons/Site.png'


const Nav = (props) => {
  if (!props.isAuth) {
    return null
  }
  return <nav className={style.left_sidebar}>
    <div className={style.nav_left}>
      <ul>
        <li><NavLink className={style.active}
          to='/profile' >
          <img src={Profile} alt='Profile' />Profile</NavLink></li>
        <li><NavLink className={style.active}
          to='/dialogs/*'>
          <img src={Dialog} alt='Dialog' />Dialogs</NavLink></li>
        <li><NavLink className={style.active}
          to='/users/*'>
          <img src={Users} alt='Users' />Users</NavLink></li>
        <li><NavLink className={style.active}
          to='/news'>
          <img src={News} alt='News' />News</NavLink></li>
        <li><NavLink className={style.active}
          to='/music'>
          <img src={Music} alt='Music' />Music</NavLink></li>
        <li><NavLink className={style.active}
          to='/settings'>
          <img src={Settings} alt='Settings' />Settings</NavLink></li>
      </ul>
    </div>
    <div className={style.shortcut_links}>
      <p>Project info:</p>
      <Link to='https://github.com/Nai6' target={"_blank"} rel="noopener noreferrer" > <img src={GitHub} alt="GitHub" /> Nai's Social Network Project</Link>
      <Link to='https://www.youtube.com/watch?v=gb7gMluAeao&list=PLcvhF2Wqh7DNVy1OCUpG3i5lyxyBWhGZ8&ab_channel=IT-KAMASUTRA' target={"_blank"} rel="noopener noreferrer"> <img src={YouTube} alt="YouTube" />IT-CAMASUTRA React tutorial</Link>
      <Link to='https://it-incubator.io/' target={"_blank"} rel="noopener noreferrer"><img src={Site} alt="Site" />IT-INCUBATOR</Link>
    </div>
  </nav>
}

export default Nav;