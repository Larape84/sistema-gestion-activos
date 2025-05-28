import { Routes } from '@angular/router';
import { ProductsComponent } from './products.component';



export default [
    {
        path     : 'products',
        component: ProductsComponent,
    },
     {
        path     : '**',
        redirectTo : 'products'
    },
] as Routes;
