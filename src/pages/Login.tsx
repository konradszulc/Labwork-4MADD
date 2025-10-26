import { IonButton, IonContent, IonHeader, IonInput, IonItem, IonPage, IonTitle, IonToast, IonToolbar } from '@ionic/react';
import React, { useState } from 'react';
import { loginUser } from '../firebaseConfig';
import { Redirect } from "react-router-dom"; // For conditional navigation - only after uer is logged in
import './Login.css'; // Linking to Login.css -LK

const Login: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const [loggedIn, setLoggedIn] = useState(false);

    async function loginComplete() {
        //Checking requirements are met
        if (email.trim() === '' || password.trim() === '') {
            alert("Require Email and Password");
            return;
        }

        const resolution = await loginUser(email, password)
        if (resolution) {
            setIsOpen(true)

            setTimeout(() => {
                setLoggedIn(true); // This triggers <Redirect> below
            }, 1000); // 1 second delay
        }
    }

    if (loggedIn) {
    return <Redirect to="/LandingPage" />; // Conditional navigation
  }
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle className='login'>Login</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent className="ion-padding">
                
                <IonItem className='placeholder'>
                    <IonInput placeholder="Enter Email" onIonChange={(e) => setEmail(e.detail.value!)}></IonInput>
                </IonItem>
                <IonItem className='placeholder'>
                    <IonInput type="password" placeholder="Enter Password" onIonChange={(e) => setPassword(e.detail.value!)}></IonInput>
                </IonItem>
                <p className='account'>Don't have an Account?<a href = "/Registration">Click here</a> to Register</p>
                <IonButton className='hover submit' expand="block" onClick={loginComplete}>Submit</IonButton>
                <IonToast isOpen={isOpen} message="Succesfully logged in"
                    onDidDismiss={() => setIsOpen(false)}
                    duration={5000}>
                </IonToast>

            </IonContent>
        </IonPage>
    );
};

export default Login;