import { IonButton, IonCol, IonContent, IonGrid, IonHeader,IonPage, IonRow, IonTitle, IonToolbar } from '@ionic/react';
import './Home.css'; // CSS link to Home.tsx -LK
import React from 'react';


const Home: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle className='title centered-content'>
            <p className='welcome'>Welcome to</p>
            CodAtlas</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className='ion-padding'>
        <IonGrid>
          <IonRow>
            <IonCol size="12">
              <IonButton className='hover submit' routerLink="/Registration">Register Now</IonButton>
              <p className='font1'>Already have an account?</p>
              <p className='font2'>Click below to go to login</p>
              <IonButton className='hover submit' routerLink="/Login">Login</IonButton>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Home;
