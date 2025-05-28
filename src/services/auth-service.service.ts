import { inject, Injectable } from '@angular/core';
import { Auth, onAuthStateChanged, signInAnonymously, signOut, User } from '@angular/fire/auth';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  private auth = inject(Auth);
  private currentUser = new BehaviorSubject<User | null>(null);


  constructor() {
 onAuthStateChanged(this.auth, (user) => {
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



}
