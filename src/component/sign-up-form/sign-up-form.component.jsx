import { useState } from "react";
import { useDispatch } from "react-redux";
import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from "../../utils/firebase/firebase.utils";
import {SignUpContainer, SignUpTitle} from './sign-up-form.styles.jsx';

import FormInput from '../form-input/form-input.component';
import Button from "../button/button.component";

import { signUpStart } from "../../store/user/user.action.js";

const defaultFormFields  = {
    displayName : '',
    email : '',
    password : '',
    confirmPassword : ''
}

const SignUpForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const { displayName, email, password, confirmPassword} = formFields;

    const dispatch = useDispatch();

    
    console.log('hit');

    const resetFormField = () => {
        setFormFields(defaultFormFields);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        if(password !== confirmPassword){
            console.log("pw dont match");
            return;  
        }

        try {
            dispatch(signUpStart(displayName, email, password));
            resetFormField();
        } catch (error) {
            //if the user auth is already authorized then there is a chance that they already have account 
            if(error.code === 'auth/email-already-in-use'){
                alert('cannot create user email already in uses');
            }else{
                console.log('user creation encountered and error', error);
            }
        }
    }

    const handleChange = (event) => {
        const {name, value} = event.target;
        setFormFields({...formFields, [name]: value})
    }

    return (
        <SignUpContainer>
            <SignUpTitle>Don't have account?</SignUpTitle>
            <span>Sign up with your email and password</span>    
            <form onSubmit={handleSubmit}>
                
                <FormInput
                    label= 'Display Name'
                    name="displayName" 
                    type="text" 
                    required 
                    onChange={handleChange} 
                    value={displayName}
                />
                
                <FormInput 
                    label="Email"
                    name="email" 
                    type="email" 
                    required 
                    onChange={handleChange} 
                    value={email}
                />
                
                <FormInput 
                    label="Password"
                    name="password" 
                    type="password" 
                    required 
                    onChange={handleChange} 
                    value={password}
                />
                
                <FormInput 
                    label="Confirm Password"
                    name="confirmPassword" 
                    type="password" 
                    required 
                    onChange={handleChange} 
                    value={confirmPassword}
                />
                <Button type="submit">Sign up</Button>
            </form>
        </SignUpContainer>
    );
}

export default SignUpForm;