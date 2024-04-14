import { ActivatedRouteSnapshot, CanActivate, CanActivateFn, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {inject} from "@angular/core";
import { StorageService } from '../storage.service';
import { Observable } from 'rxjs';
import { UserService } from '../user.service';

export const authGuard: CanActivateFn = () => {
  const router = inject(Router);//inject is a way to inject dependencies
  if(!localStorage.getItem('token')) {
    // @ts-ignore
    router.navigate(['login'])
    return false
  }
  return true;
};
// export class AuthGuard implements CanActivate {
//   constructor(
//     private userAuthService: StorageService, 
//     private router: Router,
//     private userService: UserService
//   ) {}

//   canActivate(
//     route: ActivatedRouteSnapshot,
//     state: RouterStateSnapshot
//   ):
//     | Observable<boolean | UrlTree>
//     | Promise<boolean | UrlTree>
//     | boolean
//     | UrlTree {
//     if (this.userAuthService.getToken() !== null) {
//       const role = route.data['1'] as Array<string>;

//       if (role) {
//         const match = this.userService.roleMatch(role);

//         if (match) {
//           return true;
//         } else {
//           this.router.navigate(['/forbidden']);
//           return false;
//         }
//       }
//     }

//     this.router.navigate(['/login']);
//     return false;
//   }
// }
