import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from './_services/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{

  constructor(private authService: AuthenticationService) { }

  ngOnInit(): void {
    this.authService.setCurrentUser(JSON.parse(localStorage.getItem("authResult") || 'null'));
  }
  title = 'CRM-Client';
}
