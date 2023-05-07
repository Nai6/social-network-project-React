import React, { useRef } from 'react'
import { Field, reduxForm } from 'redux-form'
import { Input } from '../../common/FormsControl/FormsControl'
import style from './ProfileDataForm.module.css'
import { required } from '../../../utils/validators/validators'
import userPhoto from '../../../assets/images/CommonIcons/userPhoto.png'

const ProfileForm = (props) => {
    const inputFile = useRef(null)
    const onImgClick = () => {
        inputFile.current.click();
    };


    return <form onSubmit={props.handleSubmit}>
        <div className={style.profile_edit}>
            {props.error && <div className={style.formSummaryError}>
                {props.error}
            </div>}

            <div className={style.profile_edit_info}>
                <img src={props.profile.photos.large || userPhoto} onClick={() => { onImgClick() }} alt='UserImg' />
                <input type={"file"} ref={inputFile} onChange={props.onMainPhotoSelected} style={{ display: 'none' }} />
                <Field placeholder={'Your name'} name={"fullName"} component={Input} validate={required} />
                <button>edit</button>
            </div>

            <div className={style.profile_edit_contacts}>
                <b>Your contacts</b> {Object.keys(props.profile.contacts).map(key => {
                    debugger
                    return <div className={style.profile_edit_contacts_info}>
                        <img src={props.imagesArray[key]} alt='ContactImages' />
                        <Field placeholder={key} type={'url'} name={"contacts." + key} component={Input} target="blank" />
                    </div>
                })}
            </div>

        </div>

    </form>
}

const ProfileDataForm = reduxForm({ form: "edit-profile" })(ProfileForm)

export default ProfileDataForm