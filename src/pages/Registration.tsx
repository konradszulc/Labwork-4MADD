import { IonButton, IonContent, IonHeader, IonInput, IonItem, IonPage, IonTitle, IonToast, IonToolbar } from '@ionic/react';
import React, { useState } from 'react';
import { registerUser } from '../firebaseConfig'

const Registration: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [conPassword, setConPassword] = useState('');
    const [isOpen, setIsOpen] = useState(false);

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
        }
    }

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Registration</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent className="ion-padding">
                <IonItem>
                    <IonInput placeholder="Enter Email" onIonChange={(e) => setEmail(e.detail.value!)}></IonInput>
                </IonItem>

                <IonItem>
                    <IonInput type="password" placeholder="Enter Password" onIonChange={(e) => setPassword(e.detail.value!)}></IonInput>
                </IonItem>

                <IonItem>
                    <IonInput type="password" placeholder="Confirm Password" onIonChange={(e) => setConPassword(e.detail.value!)}></IonInput>
                </IonItem>

                <br /><br />
                
                <IonButton expand="full" onClick={registerComplete}>Submit</IonButton>
                
                <IonToast isOpen={isOpen} message="User Created Succesfully"
                    onDidDismiss={() => setIsOpen(false)}
                    duration={5000}></IonToast>
            </IonContent>
        </IonPage>
    );
};

export default Registration;