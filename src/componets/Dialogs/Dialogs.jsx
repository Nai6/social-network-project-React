import React from 'react';
import style from './Dialogs.module.css'
import DialogsItems from './DialogsItem/DialogsItem';
import Message from './Message/Message';
import { Navigate } from 'react-router-dom';
import AddMessageFormRedux from './AddMessageForm/AddMessageForm';

const Dialogs = (props) => {
    let dialogsElement = props.dialogsPage.dialogsData.map(d => <DialogsItems name={d.name} id={d.id} avatar={d.avatar} key={d.id} />);
    let messageElement = props.dialogsPage.messageData.map(m => <Message message={m.message} key={m.id} />);

    let addNewMessage = (values) => {
        props.NewMessageActionCreator(values.message)

    }
    if (!props.isAuth) return <Navigate to={'/login'} />
    return (
        <div className={style.dialogs}>

            <div className={style.dialogs_users}>
                {dialogsElement}
            </div>

            <div className={style.dialogs_messages}>
                <div className={style.dialogs_messages_box}>
                    {messageElement}
                </div>
                <div className={style.dialogs_messages_input}>
                    <AddMessageFormRedux onSubmit={addNewMessage} />
                </div>
            </div>



        </div>
    )
}

export default Dialogs;