import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Auth, onAuthStateChanged, signInAnonymously, signOut, User } from '@angular/fire/auth';
import { BehaviorSubject, Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  private auth = inject(Auth);
  private _httpClient = inject(HttpClient)
  private currentUser = new BehaviorSubject<User | null>(null);


  constructor() {

 onAuthStateChanged(this.auth, (user: User | null) => {

  if (user?.isAnonymous) {
        console.log('Usuario anónimo activo:', user.uid);
      } else if (user) {
        console.log('Usuario autenticado con proveedor:', user.providerId);
      } else {
        console.log('No hay usuario autenticado');
      }
      this.currentUser.next(user);
    });



  }

 public login(): Observable<any> {
    return new Observable((observer) => {
      signInAnonymously(this.auth)
        .then((result) => {
          observer.next(result);
          observer.complete();
        })
        .catch((error) => observer.error(error));
    });
  }

  logout(): Observable<any> {

     return new Observable((observer) => {
      signOut(this.auth)
        .then((result) => {
          observer.next(result);
          observer.complete();
        })
        .catch((error) => observer.error(error));
    });



  }

  isAuthenticated(): boolean {
    return this.currentUser.value !== null;
  }

  getCurrentUser(): User | null {
    return this.currentUser.value;
  }






}
