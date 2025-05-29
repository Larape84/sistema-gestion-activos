import { Injectable } from '@angular/core';
import { DocumentData, DocumentReference, Firestore, addDoc, collection, collectionData, doc, docData , getDoc, getDocs, getDocsFromServer, query, setDoc, updateDoc, where  } from '@angular/fire/firestore';
import { catchError, from, map, Observable, switchMap } from 'rxjs';
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
    imageFile: File,
  ): Observable<boolean> {
    const newDocRef = doc(collection(this.firestore, collectionName));
    const documentId = newDocRef.id;

    const storageRef = ref(this.storage, `${collectionName}${documentId}_${imageFile.name}`);

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

      map(() => true),

      catchError(error => {
        console.error('Error al crear documento con imagen:', error);

        throw false;
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



}
