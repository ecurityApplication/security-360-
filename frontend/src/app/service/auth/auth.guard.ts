
import {inject} from "@angular/core";
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, CanActivateFn, UrlTree } from '@angular/router';
import { StorageService } from "../storage.service";
import { Observable, map, take } from "rxjs";


// export const authGuard: CanActivateFn = () => {
//   const router = inject(Router);//inject is a way to inject dependencies
//   if(!localStorage.getItem('token')) {
//     // @ts-ignore
//     router.navigate(['login'])
//     return false
//   }
//   return true;
// };
export class AuthGuard implements CanActivate {

  constructor(private router: Router) {}
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    throw new Error("Method not implemented.");
  }

  // canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
  //   const router = inject(Router);
  //   if(!localStorage.getItem('token')) {
  //     this.router.navigate(['/login']); // Redirect to login if the condition is not met
  //     return false
  //       }
  //        return true;
  //     }
}
// export class AuthGuard implements CanActivate {
//   constructor(private storageService: StorageService, private router: Router) {}

//   canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
//     return this.storageService.isLoggedIn.pipe(
//       take(1),
//       map((isLoggedIn: boolean) => {
//         if (!isLoggedIn) {
//           this.router.navigate(['/login']);
//           return false;
//         }
//         return true;
//       })
//     );
//   }
// }
