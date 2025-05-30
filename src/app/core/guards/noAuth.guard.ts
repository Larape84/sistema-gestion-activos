import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthServiceService } from '../services/auth-service.service';

export const NoAuthGuard: CanActivateFn  = (route, state) =>
{

 const route_  = inject(Router)

  let user = null
    try {
      const userkey = btoa('user')
      const userActive = sessionStorage?.getItem(userkey) || ''
      user = JSON?.parse(atob(userActive))
    } catch (error) {

    }


      if(!!user){
        route_.navigateByUrl('/app/products')
        return false
      }else{
        return true
      }



};
