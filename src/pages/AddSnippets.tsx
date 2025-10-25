import { useState } from "react";
import {
    IonPage,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonInput,
    IonTextarea,
    IonButton,
    IonItem,
    IonLabel,
    IonButtons,
    IonMenuButton,
} from "@ionic/react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";

const AddSnippet: React.FC = () => {
    const [title, setTitle] = useState("");
    const [code, setCode] = useState("");
    const [explanation, setExplanation] = useState("");

    const handleSave = async () => {
        if (title.trim() === "" || code.trim() === "") {
            alert("Please fill in title and code!");
            return;
        }

        try {
            await addDoc(collection(db, "snippets"), {
                title,
                code,
                explanation,
            });
            alert("Snippet saved!");
            setTitle("");
            setCode("");
            setExplanation("");
        } catch (error) {
            console.error("Error saving snippet:", error);
            alert("Failed to save snippet.");
        }
    };

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonMenuButton></IonMenuButton>
                    </IonButtons>
                    <IonTitle>Add Snippet</IonTitle>
                </IonToolbar>
            </IonHeader>

            <IonContent className="ion-padding">
                <IonItem>
                    <IonLabel position="stacked">Title</IonLabel>
                    <IonInput
                        value={title}
                        placeholder="Enter title"
                        onIonChange={(e) => setTitle(e.detail.value!)}
                    />
                </IonItem>

                <IonItem>
                    <IonLabel position="stacked">Code</IonLabel>
                    <IonTextarea
                        value={code}
                        placeholder="Paste your code here"
                        onIonChange={(e) => setCode(e.detail.value!)}
                        autoGrow
                    />
                </IonItem>

                <IonItem>
                    <IonLabel position="stacked">Explanation</IonLabel>
                    <IonTextarea
                        value={explanation}
                        placeholder="Write an explanation (optional)"
                        onIonChange={(e) => setExplanation(e.detail.value!)}
                        autoGrow
                    />
                </IonItem>

                <IonButton expand="block" onClick={handleSave}>
                    Save Snippet
                </IonButton>
            </IonContent>
        </IonPage>
    );
};

export default AddSnippet;
