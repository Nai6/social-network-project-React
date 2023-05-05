import React from 'react'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import { required } from '../../utils/validators/validators'
import { Input } from '../common/FormsControl/FormsControl'
import { login, logout } from '../../redux/auth_reducer'
import { Navigate } from 'react-router-dom';
import errorStyle from '../common/FormsControl/FormsControl.module.css'
import style from './Login.module.css'

const LoginForm = (props) => {
    return (
        <form className={style.login_form} onSubmit={props.handleSubmit}>
            <div>
                <Field placeholder={'Email'} name={"email"} component={Input} validate={required} />
            </div>
            <div>
                <Field placeholder={'Password'} name={"password"} component={Input} validate={required} type={'password'} />
            </div>
            <div className={style.login_form_rememberme}>
                <p>Remember me</p><Field type={'checkbox'} name={"rememberMe"} component={Input} />
            </div>
            {props.captchaURL && <div>
                <img src={props.captchaURL} alt='captcha' />
                <Field placeholder={'captcha'} name={"captcha"} component={Input} validate={required} />
            </div>}
            {props.error && <div className={errorStyle.formSummaryError}>
                {props.error}
            </div>}
            <div className={style.login_form_button}>
                <button>Sing in</button>
            </div>
        </form>)
}

const LoginReduxForm = reduxForm({ form: "login" })(LoginForm)

const Login = (props) => {
    const onSubmit = (formData) => {
        props.login(formData.email, formData.password, formData.rememberMe, formData.captcha)
    }

    if (props.isAuth) return <Navigate to={'/profile'} />

    return <div className={style.login}>
        <div className={style.login_box}>
            <h1>Log in</h1>
            <LoginReduxForm onSubmit={onSubmit} captchaURL={props.captchaURL} />
        </div>
    </div>
}

const mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth,
    captchaURL: state.auth.captchaURL
})

export default connect(mapStateToProps, { login, logout })(Login);