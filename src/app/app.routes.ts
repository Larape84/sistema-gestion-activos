import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { LayoutComponent } from './components/layout/layout.component';
import { AuthGuard } from './core/guards/auth.guard';
import { NoAuthGuard } from './core/guards/noAuth.guard';

export const routes: Routes = [

  {
    path:'login',
    canActivate : [NoAuthGuard],
    component : AppComponent,
    children : [

      {path: '', loadChildren: () => import('./components/login/logint.routes')},

    ]

  },
  {
    path:'app',
    canActivate : [AuthGuard],
    component : LayoutComponent,
    children : [

      {path: '', loadChildren: () => import('./components/products/products.routes')},

    ]

  },

  {path: '**', redirectTo:'login'},



];
