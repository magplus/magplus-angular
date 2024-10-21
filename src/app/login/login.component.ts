import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
toggleSignup() {
throw new Error('Method not implemented.');
}
  form: any = {
    email: null,
    password: null
  };
  isLoginVisible: boolean = true;
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit(): void {
    const { email, password } = this.form;

    this.authService.login(email, password).subscribe(
      data => {
        this.isLoggedIn = true;
        this.roles = data.roles;
        this.isLoginFailed = false;
        // Redirect to a new page after successful login
        this.router.navigate(['/publish']);  // Change 'profile' to the route you want
      },
      err => {
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
      }
    );
  }
  showRegister() {
    this.isLoginVisible = false;
  }
}
