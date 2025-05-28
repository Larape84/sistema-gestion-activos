import { Routes } from '@angular/router';
import { LoginComponent } from './login.component';
import { CreateUserComponent } from './create-user/create-user.component';
import { AuthUserComponent } from './auth-user/auth-user.component';


export default [
    {
        path     : 'auth',
        component: LoginComponent,
    },
    {
        path     : 'create-user',
        component: CreateUserComponent,
    },
     {
        path     : '**',
        redirectTo : 'auth'
    },
] as Routes;
