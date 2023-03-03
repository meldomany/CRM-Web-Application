import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ReplaySubject, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthResultModel } from '../_models/authentication/auth-result.model';
import { LoginModel } from '../_models/authentication/login.model';
import { RegisterModel } from '../_models/authentication/register.model';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private baseUrl = environment.baseUrl + 'Authentication/';
  private currentUser = new ReplaySubject<AuthResultModel | null>(1);
  currentUser$ = this.currentUser.asObservable();

  constructor(private http: HttpClient, private router: Router) { }

  login(loginModel: LoginModel){
    return this.http.post<AuthResultModel>(this.baseUrl + 'Login', loginModel).pipe(map(response => {
      if(response.token != null){
        localStorage.setItem('authResult', JSON.stringify(response));
        this.currentUser.next(response);
      }
    }));
  }

  register(registerModel: RegisterModel){
    return this.http.post<AuthResultModel>(this.baseUrl + 'Register', registerModel).pipe(map(response => {
      if(response.token != null){
        localStorage.setItem('authResult', JSON.stringify(response));
        this.currentUser.next(response);
      }
    }));
  }

  setCurrentUser(authResult: AuthResultModel){
    this.currentUser.next(authResult);
  }

  logout(){
    localStorage.removeItem("authResult");
    this.router.navigateByUrl('/login');
    this.currentUser.next(null);
  }
}
