import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonItem, IonLabel, IonList, IonMenu, IonMenuToggle, IonRouterOutlet, IonTitle, IonToast, IonToolbar, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import Home from './pages/Home';
import Registration from './pages/Registration';
import { closeOutline, personCircleOutline } from 'ionicons/icons';
import { userSignOut } from './firebaseConfig';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/**
 * Ionic Dark Mode
 * -----------------------------------------------------
 * For more info, please see:
 * https://ionicframework.com/docs/theming/dark-mode
 */

/* import '@ionic/react/css/palettes/dark.always.css'; */
/* import '@ionic/react/css/palettes/dark.class.css'; */
import '@ionic/react/css/palettes/dark.system.css';

/* Theme variables */
import './theme/variables.css';
import Login from './pages/Login';
import LandingPage from './pages/LandingPage';
import AddSnippets from './pages/AddSnippets';
import { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';


setupIonicReact();

const App: React.FC = () => {
  const auth = getAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [redirectToLogin, setRedirectToLogin] = useState(false); // Track redirect
  const [email, setEmail] = useState<string | null>(null);

  async function signedOut() {

    const resolution = await userSignOut()
    if (resolution) {
      setIsOpen(true)
      setRedirectToLogin(false);

      setTimeout(() => {
        setRedirectToLogin(true);
      }, 1000);
    }
  };

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setEmail(user.email);
      } else {
        setEmail("No User Signed In");
      }
    });
  });


  return (
    <IonApp>
      <IonReactRouter>
        <IonMenu contentId="main-pages">
          <IonHeader>
            <IonToolbar>
              <IonTitle>Snippet List Menu</IonTitle>
              <IonButtons slot="end">
                <IonMenuToggle autoHide>
                  <IonButton>
                    <IonIcon icon={closeOutline} size="large"></IonIcon>
                  </IonButton>
                </IonMenuToggle>
              </IonButtons>
            </IonToolbar>
          </IonHeader>
          <IonContent>
            <IonList>
              <IonItem lines="none">
                <IonLabel>{email}</IonLabel>
                <IonIcon icon={personCircleOutline} slot="end" size="large"></IonIcon>
              </IonItem>
              <IonMenuToggle autoHide>
                <IonItem button routerLink="/LandingPage">
                  <IonLabel>My Code Snippets</IonLabel>
                </IonItem>
                <IonItem button routerLink="/AddSnippets" lines = "none">
                  <IonLabel>Add Snippets</IonLabel>
                </IonItem>
                <IonButton expand="block" onClick={signedOut}>Sign Out</IonButton>
              </IonMenuToggle>
            </IonList>
            <IonToast isOpen={isOpen} message="Signed Out"
              onDidDismiss={() => setIsOpen(false)}
              duration={5000}></IonToast>
            {redirectToLogin && (
              <Redirect to="/Login" />
            )}
          </IonContent>
        </IonMenu>



        <IonRouterOutlet id="main-pages">
          <Route exact path="/Home">
            <Home />
          </Route>
          <Route exact path="/Registration">
            <Registration />
          </Route>
          <Route exact path="/Login">
            <Login />
          </Route>
          <Route exact path="/LandingPage">
            <LandingPage />
          </Route>
          <Route exact path="/AddSnippets">
            <AddSnippets />
          </Route>
          <Route exact path="/">
            <Redirect to="/Home" />
          </Route>

        </IonRouterOutlet>
      </IonReactRouter>
    </IonApp>
  )
};

export default App;
