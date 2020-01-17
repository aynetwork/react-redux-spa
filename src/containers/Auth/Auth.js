import React, {Component} from "react";
import classes from "./Auth.css"
import Button from "../../components/UI/Button/Button";
import Input from "../../components/UI/Input/Input";
import axios from 'axios'
import {connect} from "react-redux";
import {createQuizQuestionAction} from "../../store/actions/create";
import {auth} from "../../store/actions/auth";

function validateEmail(email) {
    var re = /\S+@\S+\.\S+/;
    return re.test(String(email).toLowerCase());
}

class Auth extends Component {

    state = {
        isFormValid : false,
        formControls : {
            email : {
                value : '',
                type : 'email',
                label : 'Email',
                errorMessage : 'Введите корректный email',
                valid : false,
                touched : false,
                validation : {
                    required : true,
                    email : true
                }
            },
            password : {
                value : '',
                type : 'password',
                label : 'Пароль',
                errorMessage : 'Введите корректный пароль',
                valid : false,
                touched : false,
                validation : {
                    required : true,
                    minLength : 6
                }
            },

        }
    };

    loginHandler =  () => {

        this.props.auth(
            this.state.formControls.email.value,
            this.state.formControls.password.value,
            true
        );

        /*const authData = {
            email : this.state.formControls.email.value,
            password : this.state.formControls.password.value,
            returnSecureToken : true
        }

        try {
            const response = axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAQAjyQ14bTO9wGCF8OLlprritzHTQipyc', authData)
        } catch(e){
            console.log(e)
        }*/
    };
    registerHandler =  () => {

        this.props.auth(
            this.state.formControls.email.value,
            this.state.formControls.password.value,
            false
        );



        /*const authData = {
            email : this.state.formControls.email.value,
            password : this.state.formControls.password.value,
            returnSecureToken : true
        }

        try {
            const response = axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAQAjyQ14bTO9wGCF8OLlprritzHTQipyc', authData)
        } catch(e){
            console.log(e)
        }*/


    };
    validate = (value, validation) => {
        if (!validation) {
            return true;
        }
        let isValid = true;

        if (validation.required) {
            isValid = value.trim() !== '' && isValid;
        }
        if (validation.email) {
            isValid = validateEmail(value)
        }
        if (validation.minLength) {
            isValid = value.trim().length >= validation.minLength  && isValid;
        }

        return isValid;
    }
    onChangeHandler = (event, controlName) => {
        console.log(`${event.target.value}`)
        console.log(`${controlName}`)
        //создали копию
        const formControls = {...this.state.formControls}

        const control = { ...formControls[controlName] }
        control.touched = true;
        control.value = event.target.value;
        control.valid = this.validate(control.value, control.validation);

        formControls[controlName] = control;

        let isFormValid = true;

        Object.keys(formControls).forEach(name=>{
            isFormValid = formControls[name].valid && isFormValid
        })

        this.setState({
            formControls, isFormValid
        })
    }
    renderInputs() {
        return Object.keys(this.state.formControls).map((controlName, index) => {
            const control = this.state.formControls[controlName]
            return (
                <Input
                    key={controlName + index}
                    type={control.type}
                    value={control.value}
                    valid={control.valid}
                    label={control.label}
                    touched={control.touched}
                    shouldValidate={!!control.validation}
                    errorMessage={control.errorMessage}
                    onChange={(event)=>this.onChangeHandler(event, controlName)}
                />
            )
        });
    }

    submitHandler = (event) => {
        event.preventDefault();
    }

    render() {
        console.log(this.state.isFormValid)
        return(
            <div className={classes.Auth}>
                <div>
                    <h1>Авторизация</h1>
                    <form action="" onSubmit={this.submitHandler} className={classes.AuthForm}>

                        {this.renderInputs()}

                       {/* <Input label={"Email"} errorMessage={'Test'}/>
                        <Input label={"Пароль"}/>*/}
                        <Button type={"success"} disabled={!this.state.isFormValid} onClick={this.loginHandler}>Войти</Button>
                        <Button type={"primary"} onClick={this.registerHandler}>Регистрация</Button>
                    </form>
                </div>
            </div>
        )
    }
}

function mapDispatchToProps(dispatch) {
    return {
        auth : (email, password, isLogin) => dispatch(auth(email, password, isLogin))
    }
}
//STATa net poetome mapStateToProps не заявлена

export default connect(null, mapDispatchToProps)(Auth)