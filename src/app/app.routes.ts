import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';

export const routes: Routes = [

  {
    path:'login',
    component : AppComponent,
    children : [

      {path: '', loadChildren: () => import('../app/login/logint.routes')},

    ]

  },

  {path: '**', redirectTo:'login'},



];
