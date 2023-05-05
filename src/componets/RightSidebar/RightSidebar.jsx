import React from 'react'
import style from './RightSidebar.module.css'
import RightSidebarConversations from './RightSidebarConverstaions/RightSidebarConversations'
import { NavLink } from 'react-router-dom'


    

const RightSidebar = (props) => {
    if(!props.isAuth) {
        return null
    }

    return <div className={style.right_sidebar}>
        <div className={style.sidebar_title}>
            <h4>Event</h4>
            <NavLink to='/profile'>see all</NavLink>
        </div>

        <div className={style.event}>
            <div className={style.left_event}>
                <h3>30</h3>
                <span>April</span>
            </div>
            <div className={style.right_event}>
                <h4>Meeting with Bogdan</h4>
                <p>Discord</p>
                <NavLink to='/profile'>More info</NavLink>
            </div>
        </div>


        <div className={style.event}>
            <div className={style.left_event}>
                <h3>18</h3>
                <span>March</span>
            </div>
            <div className={style.right_event}>
                <h4>Social media</h4>
                <p>Willson Tech Park</p>
                <NavLink to='/profile'>More info</NavLink>
            </div>
        </div>
        <div className={style.sidebar_title}>
            <h4>Conversations</h4>
            <NavLink to='/dialogs'>see all</NavLink>
        </div>
        <RightSidebarConversations dialogsData={props.dialogsData}/>
    </div>
}

export default RightSidebar