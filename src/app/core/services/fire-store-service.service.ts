import { Injectable } from '@angular/core';
import { DocumentData, DocumentReference, Firestore, addDoc, collection, collectionData, doc, docData , getDoc, getDocs, getDocsFromServer, query, setDoc, updateDoc, where  } from '@angular/fire/firestore';
import { from, map, Observable, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FireStoreServiceService {

  constructor(
    private firestore: Firestore,
  ) { }


  createDocumentWithId<T>(collectionName: string, docId: string, data: T): Observable<void> {
    const collectionRef = collection(this.firestore, collectionName);
    const docRef = doc(collectionRef, docId);
    const dataWithId = { ...data, id: docId};
    return from(setDoc(docRef, dataWithId));
  }



}
