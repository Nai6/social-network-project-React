import React from 'react'
import MyPostContainer from './MyPosts/MyPostContainer'
import style from './Profile.module.css'
import ProfileInfo from './ProfileInfo/ProfileInfo'

const Profile = (props) => {
  return (
    <div>
      <div className={style.profile_container}>
        <ProfileInfo profile={props.profile}
          status={props.status}
          updateUserStatus={props.updateUserStatus}
          isOwner={props.isOwner}
          savePhoto={props.savePhoto}
          isFetching={props.isFetching}
          updateProfile={props.updateProfile}
          isProfileUpdated={props.isProfileUpdated} />
      </div>
      
      {props.isOwner && <MyPostContainer
        profile={props.profile} />}
    </div>
  )
}

export default Profile;