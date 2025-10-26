import { useEffect, useState } from "react";
import {
    IonPage,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonList,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonFab,
    IonButton,
    IonIcon,
    IonButtons,
    IonMenuButton,
} from "@ionic/react";
import { addOutline } from "ionicons/icons";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebaseConfig";
import './LandingPage.css'; // Linking to Login.css -LK

interface Snippet {
    id?: string;
    title: string;
    code: string;
    explanation: string;
}

const LandingPage: React.FC = () => {
    const [snippets, updateSnippets] = useState<Snippet[]>([]);

    useEffect(() => {
        const fetchSnippets = async () => {
            const snippetsFromDB = await getDocs(collection(db, "snippets"));

            const snippetsList: Snippet[] = snippetsFromDB.docs.map((doc) => ({
                id: doc.id,
                ...(doc.data() as Snippet),
            }));

            updateSnippets(snippetsList);
        };

        fetchSnippets();
    }, []);

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons className='nav' slot = "start">
                        <IonMenuButton></IonMenuButton>
                    </IonButtons>
                    <IonTitle className="landing-title">My Code Snippets</IonTitle>
                </IonToolbar>
            </IonHeader>

            <IonContent className="ion-padding">
                {snippets.length === 0 ? (
                    <p>No snippets saved yet. Click the "+" button to add one!</p>
                ) : (
                    <IonList>
                        {snippets.map((snippet) => (
                            <IonCard key={snippet.id}>
                                <IonCardHeader>
                                    <IonCardTitle className="snippet-title">{snippet.title}</IonCardTitle>
                                </IonCardHeader>
                                <IonCardContent>
                                    <pre className="snippet-code">{snippet.code}</pre>
                                    <p className="snippet-exp">{snippet.explanation}</p>
                                </IonCardContent>
                            </IonCard>
                        ))}
                    </IonList>
                )}

                <IonFab className="plus-button click" vertical="bottom" horizontal="end" slot="fixed">
                    <IonButton shape="round" size="large" routerLink="/AddSnippets">
                        <IonIcon slot="icon-only" icon={addOutline} />
                    </IonButton>
                </IonFab>
            </IonContent>
        </IonPage>
    );
};

export default LandingPage;
