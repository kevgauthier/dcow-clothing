import { useState, useContext } from "react";
import { 
    signInWithGooglePopup, 
    createUserDocumentFromAuth, 
    signInWithUserEmailAndPassword,
} from '../../utils/firebase/firebase.utils'

import FormInput from '../form-input/form-input.component';
import Button from '../button/button.component'


import './sign-in-form.styles.scss'


const defaultFormFields  = {
    email : '',
    password : '',
}


const SignInForm = () => {
    
    //google sign in popup code
    const logGoogleUser = async () => {
        try {
             await signInWithGooglePopup();
            
        } catch (error) {
            switch(error.code){
                case 'auth/popup-closed-by-user':
                        console.log("user closed google popup auth");
                    break;
                default:
                console.log("didn't work", error);
            }
        }
    }

    const [formFields, setFormFields] = useState(defaultFormFields);
    const {  email, password } = formFields;
    
       

    const resetFormField = () => {
        setFormFields(defaultFormFields);
    }

    const handleLogin= async (event) => {
        event.preventDefault();
       //console.log(email,password);
        try {
            const {user} = await signInWithUserEmailAndPassword(email, password); //this will first call to check authorization firebase

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
        <div className='sign-in-container'>
            <h2>Already have an account?</h2>
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
            
                
                <div className="wrap-button-container">
                    <Button buttonType='signIn' type="submit">Sign in</Button>
                    <Button type='button' buttonType='google' onClick={logGoogleUser}>
                        Sign in with google
                    </Button>
                </div>
            </form>
        </div>
    );
}

export default SignInForm;