import { Injectable } from '@angular/core';
import { CollectionReference, DocumentData, DocumentReference, Firestore, addDoc, collection, collectionData, doc, docData , getDoc, getDocs, getDocsFromServer, query, setDoc, updateDoc, where  } from '@angular/fire/firestore';
import { catchError, from, map, Observable, switchMap, throwError } from 'rxjs';
import { Storage, ref, uploadBytes, getDownloadURL } from '@angular/fire/storage';

@Injectable({
  providedIn: 'root'
})
export class FireStoreServiceService {

  constructor(
    private firestore: Firestore,
    private storage: Storage
  ) { }


  createDocumentWithId<T>(collectionName: string, docId: string, data: T): Observable<void> {
    const collectionRef = collection(this.firestore, collectionName);
    const docRef = doc(collectionRef, docId);
    const dataWithId = { ...data, id: docId};
    return from(setDoc(docRef, dataWithId));
  }


  createDocumentWithImage(
  collectionName: string,
  documentData: any,
  imageFile: File
): Observable<string> {
  const newDocRef = doc(collection(this.firestore, collectionName));
  const documentId = newDocRef.id;

  const storageRef = ref(this.storage, `${collectionName}/${documentId}_${imageFile.name}`);

  return from(uploadBytes(storageRef, imageFile)).pipe(
    switchMap(uploadResult => from(getDownloadURL(uploadResult.ref))),
    switchMap(imageUrl => {
      const dataToSave = {
        ...documentData,
        imageUrl: imageUrl,
        id: documentId
      };
      return from(setDoc(newDocRef, dataToSave));
    }),
    map(() => documentId),
    catchError(error => {
      console.error('Error al crear documento con imagen:', error);
      return throwError(() => error);
    })
  );
}


  getCollection<T>(collectionName: string): Observable<T[]> {
    const ref = collection(this.firestore, collectionName);
    const q = query(ref);
    return from(getDocs(q).then(snapshot =>
      snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as T))
    ));
  }


  updateDocument(collectionName: string, docId: string, data: any): Observable<void> {
    const docRef = doc(this.firestore, `${collectionName}/${docId}`);
    return from(updateDoc(docRef, {...data}));
  }


  getDocumentId(collectionName: string, userId: string): Observable<any> {
    const userRef = collection(this.firestore, collectionName);
    const q = query(userRef,
        where("__name__", "==", String(userId)))

    return from(getDocs(q).then(querySnapshot => {
        if (!querySnapshot.empty) {
            return { id: querySnapshot.docs[0].id, ...querySnapshot.docs[0].data() };
        }
        return null;
    }));
  }

  getDocumentLogin(collectionName: string, userId: string, pass : string): Observable<any> {
    const userRef = collection(this.firestore, collectionName);
    const q = query(userRef,
        where("password", "==", String(pass)),
        where("__name__", "==", String(userId)))

    return from(getDocs(q).then(querySnapshot => {
        if (!querySnapshot.empty) {
            return { id: querySnapshot.docs[0].id, ...querySnapshot.docs[0].data() };
        }
        return null;
    }));
}

  crearDocumentoAutoID$<T>(nombreColeccion: string, data: any): Observable<string> {
    const coleccionRef = collection(this.firestore, nombreColeccion);
    return from(
      addDoc(coleccionRef, data).then((docRef) => docRef.id)
    );
  }


    getDocumentsByKey(
    collectionName: string,
    key: string,
    value: any
  ): Observable<any[]> {
    const colRef = collection(this.firestore, collectionName) as CollectionReference;
    const q = query(colRef, where(key, '==', value));

    return from(getDocs(q)).pipe(
      map(snapshot =>
        snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }))
      )
    );
  }







}
