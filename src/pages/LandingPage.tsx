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
                    <IonButtons slot = "start">
                        <IonMenuButton></IonMenuButton>
                    </IonButtons>
                    <IonTitle>My Code Snippets</IonTitle>
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
                                    <IonCardTitle>{snippet.title}</IonCardTitle>
                                </IonCardHeader>
                                <IonCardContent>
                                    <pre>{snippet.code}</pre>
                                    <p>{snippet.explanation}</p>
                                </IonCardContent>
                            </IonCard>
                        ))}
                    </IonList>
                )}

                <IonFab vertical="bottom" horizontal="end" slot="fixed">
                    <IonButton shape="round" size="large" routerLink="/AddSnippets">
                        <IonIcon slot="icon-only" icon={addOutline} />
                    </IonButton>
                </IonFab>
            </IonContent>
        </IonPage>
    );
};

export default LandingPage;
