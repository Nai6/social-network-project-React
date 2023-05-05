import React from 'react'
import style from './FormsControl.module.css'

export const FormControl = ({input, meta,child, ...props}) => {
    const hasEror = meta.touched && meta.error
    return (
        <div className={style.formControl + " " + (hasEror ? style.error : "")}>
            <div >
                {props.children}
            </div>
            {hasEror && <span>{meta.error}</span>}
        </div>
    )
} 

export const Textarea = (props) => {
    const {input, meta,child, ...restProps} = props
    return <FormControl {...props}><textarea {...input} {...restProps}/></FormControl>
}

export const Input = (props) => {
    const {input, meta,child, ...restProps} = props
    return <FormControl {...props}><input {...input} {...restProps}/></FormControl>
}