import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user = {
    username: '',
    password: ''
  }
  constructor( private router: Router) { }

  ngOnInit() {
  }

  logIn(){
    console.log ( this.user );
    this.router.navigate(['/home'], {queryParams: { 'username': this.user.username },});
  }

}
