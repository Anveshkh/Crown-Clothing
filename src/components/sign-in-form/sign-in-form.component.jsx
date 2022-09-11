import './sign-in-form.styles.scss'

import { useState, useContext } from "react";
import { UserContext } from '../../contexts/user.context';

import { signInWithGooglePopup, createUserDocumentFromAuth, signInAuthUserWithEmailAndPassword } from "../../utils/firebase/firebase.utils";

import FormInput from "../form-input/form-input.component";
import Button from '../button/button.component';

const defaultFormFields = {

    email: '',
    password: '',

}

const SignInForm = () => {

    const [formFields, setFormFields] = useState(defaultFormFields);
    const { email, password } = formFields;

    const {setCurrentUser } = useContext(UserContext);

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    };

    const signInWithGoogle = async () => {
        const { user } = await signInWithGooglePopup();
        await createUserDocumentFromAuth(user);
    };


    const handleSubmit = async (event) => {
        event.preventDefault();


        try {
            const { user } = await signInAuthUserWithEmailAndPassword(email, password);
            
            resetFormFields();
        } catch (error) {
           switch (error.code){
            case 'auth/wrong-password': 
                alert("incorrect password for email");
                break;

            case 'auth/user-not-found':
                alert("no user associated with this email");
                break;
            
            default:
                console.log(error);
           }
        }

    }

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormFields({ ...formFields, [name]: value });
    }

    return (
        <div className="sign-up-container">
            <h2>Already have an account?</h2>
            <span>Sign in with your email and password</span>
            <form onSubmit={handleSubmit}>


                <FormInput
                    label="Email"
                    inputOptions={{
                        type: 'email',
                        required: true,
                        onChange: handleChange,
                        name: 'email',
                        value: email,
                    }}
                />


                <FormInput
                    label="Password"
                    inputOptions={{
                        type: 'password',
                        required: true,
                        onChange: handleChange,
                        name: 'Password',
                        value: password,
                    }}
                />

                <div className='buttons-container'>
                    
                <Button type='submit'>Sign In</Button>
                {/* By default buttons are of type submit inside of forms */}
                <Button onClick={signInWithGoogle} buttonType='google' type='button' >Google sign in</Button>

                </div>



                
            </form>
        </div>
    )
}

export default SignInForm;