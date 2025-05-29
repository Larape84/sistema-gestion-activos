import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { LayoutComponent } from './components/layout/layout.component';

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
    component : LayoutComponent,
    children : [

      {path: '', loadChildren: () => import('./components/products/products.routes')},

    ]

  },

  {path: '**', redirectTo:'login'},



];
