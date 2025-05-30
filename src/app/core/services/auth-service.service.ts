import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Auth, getAuth, onAuthStateChanged, signInAnonymously, signOut, User } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  private auth = inject(Auth);
  private _httpClient = inject(HttpClient)
  private currentUser = new BehaviorSubject<User | null>(null);



  constructor(
    private _router : Router
  ) {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
      console.log('Usuario logueado:', user);
    } else {
      this.login().subscribe()
      console.log('Sin sesión activa');
    }

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



  isAuthenticated(): boolean {
    return this.currentUser.value !== null;
  }

  getCurrentUser(): User | null {
    return this.currentUser.value;
  }

  public getUserActive(): any {
    try {

      const userkey = btoa('user')
      const userActive = sessionStorage.getItem(userkey) || ''
      const user = JSON.parse(atob(userActive))
      return user
    } catch (error) {
      this.cerrarSesion()
    }
  }

  public cerrarSesion(): void {

      sessionStorage.clear()
      this._router.navigateByUrl('/login/auth')

  }






}
