import { inject } from '@angular/core';
import { CanActivateChildFn, CanActivateFn, Router } from '@angular/router';
import { AuthServiceService } from '../services/auth-service.service';

export const AuthGuard: CanActivateFn = (route, state) =>
{

  const _auth  = inject(AuthServiceService)

  const user = _auth.getUserActive()
  if(!!user){
    return true
  }else{
    return false
  }



}





