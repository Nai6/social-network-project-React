import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Preloader from '../../common/Preloader/Preloader'
import style from './ProfileInfo.module.css'
import ProfileStatus from './ProfileStatus/ProfileStatus'
import userPhoto from '../../../assets/images/CommonIcons/userPhoto.png'
import ProfileDataForm from './ProfileDataForm'
import YouTube from '../../../assets/images/ProfileIcons/YouTube_profile.png'
import FaceBook from '../../../assets/images/ProfileIcons/Facebook_profile.png'
import GitHub from '../../../assets/images/ProfileIcons/GitHub_profile.png'
import Instagram from '../../../assets/images/ProfileIcons/Instagram_profile.png'
import Twitter from '../../../assets/images/ProfileIcons/Twitter_profile.png'
import VK from '../../../assets/images/ProfileIcons/VK_profile.png'
import WebSite from '../../../assets/images/ProfileIcons/WebSite_profile.png'
import MainLink from '../../../assets/images/ProfileIcons/MainLink_profile.png'

const ProfileInfo = (props) => {

  let [editMode, setEditMode] = useState(false)

  const onMainPhotoSelected = (e) => {
    if (e.target.files.length)
      props.savePhoto(e.target.files[0])
  }

  const onSubmit = (profileData) => {
    props.updateProfile(profileData)
    if (props.isProfileUpdated) {
      setEditMode(false)
    }
  }
  const imagesArray = {
    facebook: FaceBook,
    website: WebSite,
    vk: VK,
    twitter: Twitter,
    instagram: Instagram,
    youtube: YouTube,
    github: GitHub,
    mainLink: MainLink
  }

  if (editMode) {
    return <ProfileDataForm 
    initialValues={props.profile} 
    profile={props.profile} 
    onSubmit={onSubmit} 
    onMainPhotoSelected={onMainPhotoSelected}
    imagesArray={imagesArray} />
  }
  else {
    return (
      <div className={style.user_profile}>

        <div className={style.profile_image}>
          {props.isFetching
            ? <Preloader />
            : <img src={props.profile.photos.large || userPhoto} alt='largePhoto' />}
        </div>

        <div className={style.user_profile_info}>
          <p>{props.profile.fullName}</p>
          <ProfileStatus aboutMe={props.profile.aboutMe}
            status={props.status}
            updateUserStatus={props.updateUserStatus}
            isOwner={props.isOwner} />
        </div>

        <div className={style.edit_button}>
          {props.isOwner && <button onClick={() => setEditMode(true)}>edit</button>}
        </div>

        <ProfileDescription isOwner={props.isOwner} 
        goToEditMode={() => { setEditMode(true) }} 
        profile={props.profile} 
        imagesArray={imagesArray}/>
      </div>
    )
  }
}


const Contacts = ({ contactValue, image }) => {
  return <div className={contactValue ? style.contacts_icons : style.contacts_icons_none}>
    <button disabled={!contactValue}>
      <Link to={contactValue} target={"_blank"} rel="noopener noreferrer"><img src={image} alt="LinksImg" /></Link>
    </button>
  </div>
}


const ProfileDescription = (props) => {  
  return <div>
    <div className={style.user_profile_links}>
      {Object.keys(props.profile.contacts).map(key => {
        return <Contacts key={key} contactValue={props.profile.contacts[key]} image={props.imagesArray[key]} />
      })}
    </div>

  </div>
}
export default ProfileInfo;