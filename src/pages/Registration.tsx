import { IonBackButton, IonButton, IonButtons, IonContent, IonHeader, IonInput, IonItem, IonPage, IonTitle, IonToast, IonToolbar } from '@ionic/react';
import React, { useState } from 'react';
import { registerUser } from '../firebaseConfig'
import { Link, Redirect } from "react-router-dom"; // For redirecting after registration
import './Registration.css'; // Linking to Registration.css -LK


const Registration: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [conPassword, setConPassword] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const [redirectToLogin, setRedirectToLogin] = useState(false); // Track redirect

    async function registerComplete() {
        //error with match, due to slow useState render
        console.log(password, conPassword)

        //Checking requirements are met
        if (email.trim() === '' || password.trim() === '') {
            alert("Require Email and Password");
            return;
        }
        if (password !== conPassword) {
            alert("Passwords DO NOT MATCH");
            return;
        }

        const resolution = await registerUser(email, password)
        if (resolution) {
            setIsOpen(true)

            setTimeout(() => {
                setRedirectToLogin(true);
            }, 1000);
        }
    }

    if (redirectToLogin) {
        return <Redirect to="/Login" />; // Conditional redirecting
    }
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot='start'>
                        <IonBackButton className='back-button' defaultHref='/Home'></IonBackButton>
                    </IonButtons>
                    <IonTitle className='registration'>Register</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent className="ion-padding">
            <div className='placeholder-padding'></div>
                <IonItem className='placeholder'>
                    <IonInput placeholder="Enter Email" onIonChange={(e) => setEmail(e.detail.value!)}></IonInput>
                </IonItem>

                <IonItem className='placeholder'>
                    <IonInput type="password" placeholder="Enter Password" onIonChange={(e) => setPassword(e.detail.value!)}></IonInput>
                </IonItem>

                <IonItem className='placeholder'>
                    <IonInput type="password" placeholder="Confirm Password" onIonChange={(e) => setConPassword(e.detail.value!)}></IonInput>
                </IonItem>
                <p className='register-account'>Already have an Account? <Link to = {`login`}>Click here</Link> to Login</p>

                <IonButton className='submit hover' expand="block" onClick={registerComplete}>Sign up</IonButton>

                <IonToast isOpen={isOpen} message="User Created Succesfully"
                    onDidDismiss={() => setIsOpen(false)}
                    duration={5000}></IonToast>
            </IonContent>
        </IonPage>
    );
};

export default Registration;