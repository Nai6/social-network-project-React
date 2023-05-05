import React from 'react'
import { NavLink } from 'react-router-dom';
import style from './../Dialogs.module.css'

const DialogsItems = (props) => {
    let item = "/dialogs/" + props.id

    return (
        <div className={style.dialogs_item}>
            <div>
                <NavLink to={item}> <img src={props.avatar} alt="DialogItemImg" /> </NavLink>
            </div>

            <div className={style.dialogs_item_names}>
                <NavLink to={item}> {props.name} </NavLink>
            </div>

        </div>
    )
}

export default DialogsItems