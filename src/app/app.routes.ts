import { Routes } from '@angular/router';
import { AppComponent } from './app.component';

export const routes: Routes = [

  {
    path:'login',
    component : AppComponent,
    children : [

      {path: '', loadChildren: () => import('./components/login/logint.routes')},

    ]

  },
  {
    path:'app',
    component : AppComponent,
    children : [

      {path: '', loadChildren: () => import('./components/products/products.routes')},

    ]

  },

  {path: '**', redirectTo:'login'},



];
