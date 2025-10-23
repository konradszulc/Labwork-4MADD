import { IonButton, IonContent, IonHeader, IonInput, IonItem, IonPage, IonTitle, IonToast, IonToolbar } from '@ionic/react';
import React, { useState } from 'react';
import { loginUser } from '../firebaseConfig';

const Login: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isOpen, setIsOpen] = useState(false);


    async function loginComplete() {
        //Checking requirements are met
        if (email.trim() === '' || password.trim() === '') {
            alert("Require Email and Password");
            return;
        }

        const resolution = await loginUser(email, password)
        if (resolution) {
            setIsOpen(true)
        }
    }
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Login</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent className="ion-padding">
                <IonItem>
                    <IonInput placeholder="Enter Email" onIonChange={(e) => setEmail(e.detail.value!)}></IonInput>
                </IonItem>

                <IonItem>
                    <IonInput type="password" placeholder="Enter Password" onIonChange={(e) => setPassword(e.detail.value!)}></IonInput>
                </IonItem>
                <br /><br />
                <IonButton expand = "full" onClick={loginComplete}>Submit</IonButton>
                <IonToast isOpen={isOpen} message="Succesfully logged in"
                    onDidDismiss={() => setIsOpen(false)}
                    duration={5000}>
                </IonToast>

            </IonContent>
        </IonPage>
    );
};

export default Login;