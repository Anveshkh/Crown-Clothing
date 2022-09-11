import './authentication.styles.scss';

import SignUpForm from '../../components/sign-up/sign-up-form.components';
import SignInForm from '../../components/sign-in-form/sign-in-form.component';


const Authentication = () => {
    return(
         <div className='authentication-container'>
            <SignInForm />
            <SignUpForm />
         </div>
    );

};

export default Authentication;