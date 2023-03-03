import { Component, OnInit } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { map } from 'rxjs';
import { AuthenticationService } from 'src/app/_services/authentication.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(public authService: AuthenticationService, private jwtHelper: JwtHelperService) { }

  username: string = '';

  ngOnInit(): void {
  }

  Logout(){
    this.authService.logout();
  }

  isAuthenticated(){
    return this.authService.currentUser$.pipe(map(response => {
      if(response?.token != null && !this.jwtHelper.isTokenExpired(response.token)){
        this.username = response.userName;
        return true;
      }else {
        return false;
      }
    }))
  }
}
