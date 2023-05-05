import React from "react";
import style from './RightSidebarConversations.module.css'

const RightSidebarConversations = (props) => {
    return props.dialogsData
        .filter(d => d.id <= 3)
        .map(d => {
            return <div key={d.id} className={style.conversation_list}>
                <div className={style.online}>
                    <img src={d.avatar} alt='Avatar' />
                </div>
                <p>{d.name}</p>
            </div>
        })
}

export default RightSidebarConversations;