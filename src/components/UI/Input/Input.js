import React from "react";
import classes from "./Input.css"

function isInvalid({valid,touched,shouldValidate}) {
    return !valid && shouldValidate && touched;
}

export default (props) => {

    const inputType = props.type || 'text';

    const cls = [classes.Input]
    if (isInvalid(props)) {
        cls.push(classes.invalid)
    }

    const htmlFor = `${inputType}-${Math.random()}`
    return (
        <div className={cls.join('  ')}>
            <label htmlFor={htmlFor}>{props.label}</label>
            <input
                type={inputType}
                id={htmlFor}
                value={props.value}
                onChange={props.onChange}
            />
            {isInvalid(props)?<span>{props.errorMessage || 'ВВедите верное значение'}</span>:null}
        </div>
    )
}
