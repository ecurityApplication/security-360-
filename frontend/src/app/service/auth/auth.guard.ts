
import {inject} from "@angular/core";
import { Router, CanActivateFn,  } from '@angular/router';
import { StorageService } from "../storage.service";
export const AuthGuard : CanActivateFn = () => {

  const storageService  = inject(StorageService );
  const router = inject(Router);
  if (storageService .isTokenNotValid()) {
    router.navigate(['login']);
    return false;
  }
  return true;
  }
