import {
    collection,
    getDocs,
    addDocs,
    doc,
    updateDoc,
    deleteDoc,
} from "firebase/firestore";

/**
 * Utility function that gets all documents from a firestore database adn returns an array of objects
 * @param {database instance} db An instance of a Cloud Firestore database
 * @param {string} collectionName The name of a Firestore db collection
 * @returns {array} 
 * @returns an array of objects
 */

async function getAllDocuments(db, collectionName) {
    const querySnapshot = await getDocs(collection(db, collectionName));
    const documents = [];

    querySnapshot.forEach((doc) => {
        documents.push({ id: doc.id, ...doc.data() });
    });
    console.log("Documents from from ", collectionName, documents);

    return documents;
    }

    /**
     * Utility Functions that adds a document to a Google Cloud Firestore Database
     * @param {database instance} db An instance of a Cloud Firestore database
     * @param {string} collectionName The name of a Firestore db collection
     * @param {object} data An object representing a collection document
     */

    async function addDocument(db, collectionName, data) {
        try {
            const docRef = await addDoc(collection(db, collectionName), data);
            console.log("Document written with ID: ", docRef.id);
            
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    }

    /**
     * Upfate a Cloud Firestore db Document
     * @param {database instance} db An instance of a Cloud Firestore database
     * @param {string} collectionName The name of a Firestore db collection
     * @param {string} docId The id of a Firestore db document
     * @param {*} data object of data to be updated within document
     */

    async function updateDocument(db, collectionName, docId, data) {
        try {
            const docRef = doc(db, collectionName, Id);

            if(docRef) {
                await updateDoc(docRef, data);
            }else {
                console.log("NO reference to doc founf with id:", id);
            }
            }catch (error) {
                console.error('Error Updating document', error);
            }
        }

        /**
         * Deletes a document from a Cloud Firestore db
         * @param {database instance} db An instance of a Cloud Firestore database
         * @param {string} collectionName The name of a Firestore db collection
         * @param {string} id id of a cloud Firestore document
         */

        async function deleteDocument(db, collectionName, id) {
            try {
                const docRef =doc(db, collectionName, id);
                if(docRef) {
                    await deleteDoc(docRef);
                    console.log("Doc deleted with ID: ", docRef.id);
                }
            } catch (error) {
                console.error("Error deleting document: ", error);
            }     
        }

        export { getAllDocuments, addDocument, updateDocument, deleteDocument};

