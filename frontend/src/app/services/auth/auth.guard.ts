import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";

export const authGuard: CanActivateFn = () => {
  const router = inject(Router);//inject is a way to inject dependencies
  if(!localStorage.getItem('token')) {
    router.navigate(['login'])
    return false
  }
  return true;
};
