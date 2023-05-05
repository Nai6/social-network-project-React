import React, { useState, useEffect } from "react";
import style from './ProfileStatus.module.css'

const ProfileStatus = (props) => {

    let [editMode, setEditMode] = useState(false)
    let [status, setStatus] = useState(props.status)

    useEffect(() => {
        setStatus(props.status)
    }, [props.status])

    const activateEditMode = () => {
        props.isOwner && setEditMode(true)
    }

    const deactivateEditMode = () => {
        setEditMode(false);
        props.updateUserStatus(status);
    }

    const onStatusChange = (e) => {
        setStatus(e.currentTarget.value)
    }

    return (
        <div className={style.user_status}>
            {!editMode &&
                <small onClick={activateEditMode}>{props.status || (props.isOwner
                    ? 'Share your mood'
                    : 'There is no status yet...')}</small>}
            {editMode &&
                <label>
                    <input onChange={onStatusChange} autoFocus={true}
                        onBlur={deactivateEditMode} value={status} />
                </label>}
        </div>
    )
}

export default ProfileStatus;