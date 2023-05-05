import React from "react"
import styles from './AddMessageForm.module.css'
import { Field, reduxForm } from 'redux-form'
import { maxLengthCreator, required } from '../../../utils/validators/validators'
import { Textarea } from '../../common/FormsControl/FormsControl'


let maxLength200 = maxLengthCreator(200)

const AddMessageForm = (props) => {


    return (<form onSubmit={props.handleSubmit}>
        <Field
            placeholder='Enter your message...'
            name={'message'}
            component={Textarea}
            validate={[required, maxLength200]}
        />
        <div className={styles.dialogs_messages_button}>
            <button>Send</button>
        </div>
    </form>)
}

const AddMessageFormRedux = reduxForm({ form: "dialogAddMessageForm" })(AddMessageForm)

export default AddMessageFormRedux