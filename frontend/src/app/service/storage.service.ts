import { Injectable } from '@angular/core';

const TOKEN_KEY = 'token';
const USERNAME_KEY = 'AuthUsername';
const AUTHORITIES_KEY = 'AuthAuthorities';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  private roles: Array<string> = [];
  constructor() { }

  signOut() {
    localStorage.clear();
  }

  public saveToken(token: string) {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.setItem(TOKEN_KEY, token);
  }

  public getToken(): any {
    return localStorage.getItem(TOKEN_KEY);
  }

  public saveUsername(username: string) {
    window.localStorage.removeItem(USERNAME_KEY);
    window.localStorage.setItem(USERNAME_KEY, username);
  }

  public getUsername(): any {
    return localStorage.getItem(USERNAME_KEY);
    
  }

  public saveAuthorities(authorities: string[]) {
   localStorage.removeItem(AUTHORITIES_KEY);
   localStorage.setItem(AUTHORITIES_KEY, JSON.stringify(authorities));
  }

  // public getAuthorities(): string[] {
  //   this.roles = [];

  //   if (sessionStorage.getItem(TOKEN_KEY)?.toString()) {
  //     JSON.parse(sessionStorage.getItem(AUTHORITIES_KEY)).forEach((authority: { authority: string; }) => {
  //       this.roles.push(authority.authority);
  //     });
  //   }

  //   return this.roles;
  // }
}
