import { useState } from "react";
import { useDispatch } from 'react-redux';

import FormInput from '../form-input/form-input.component';
import Button, { BUTTON_TYPE_CLASSES } from '../button/button.component'

import {SignInContainer, SignInTitle, WrapButtonContainer} from './sign-in-form.styles.jsx'
import { googleSignInStart, emailSignInStart } from '../../store/user/user.action'


const defaultFormFields  = {
    email : '',
    password : '',
}


const SignInForm = () => {
    const dispatch = useDispatch();
    const [formFields, setFormFields] = useState(defaultFormFields);
    const {  email, password } = formFields;

    //google sign in popup code
    const logGoogleUser = async () => {
        dispatch(googleSignInStart());
    }

    const resetFormField = () => {
        setFormFields(defaultFormFields);
    }

    const handleLogin= async (event) => {
        event.preventDefault();
       //console.log(email,password);
        try {
            dispatch(emailSignInStart(email, password));
            resetFormField();
        } catch (error) {
            switch(error.code){
                case 'auth/invalid-login-credentials':
                    alert('username or password is incorrect');   
                    console.log('user login encountered and error', error); 
                    break;
                case 'auth/wrong-password':
                    alert('username or password is incorrect');   
                    console.log('user login encountered and error', error); 
                    break;
                case 'auth/auth-not-found':
                    alert('auth username or password not found');   
                    console.log('user login encountered and error', error); 
                    break;
              default:
                console.log('user login encountered and error', error); 
            }
        }

    }

    const handleChange = (event) => {
        const {name, value} = event.target;
        setFormFields({...formFields, [name]: value});
        
    }


    return (
        <SignInContainer>
            <SignInTitle>Already have an account?</SignInTitle>
            <span>Sign In with your username and password</span>
            <form onSubmit={handleLogin}>
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
            
                
                <WrapButtonContainer>
                    <Button buttonType={BUTTON_TYPE_CLASSES.signIn} type="submit">Sign in</Button>
                    <Button type='button' buttonType={BUTTON_TYPE_CLASSES.google} onClick={logGoogleUser}>
                        Sign in with google
                    </Button>
                </WrapButtonContainer>
            </form>
        </SignInContainer>
    );
}

export default SignInForm;