
import SignInForm from '../../component/sign-in-form/sign-in-form.component';
import SignUpForm from '../../component/sign-up-form/sign-up-form.component';
import './auth.styles.scss';

const Authentification = () => { 
    
    return (
        <div className='authentication-container'>
            <SignInForm />
            <SignUpForm />
        </div>
    )
}
export default Authentification