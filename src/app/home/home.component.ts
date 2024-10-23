import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services/user.service';
import { TokenStorageService } from '../_services/token-storage.service'; // Import TokenStorageService

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  content?: string;
  
  // Properties from AppComponent
  private roles: string[] = [];
  isLoggedIn = false;
  showAdminBoard = false;
  showModeratorBoard = false;
  username?: string;

  constructor(
    private userService: UserService,             // UserService for fetching public content
    private tokenStorageService: TokenStorageService  // TokenStorageService for auth info
  ) {}

  ngOnInit(): void {
    // Logic from AppComponent (checking if user is logged in)
    this.isLoggedIn = !!this.tokenStorageService.getToken();

    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.roles = user.roles;

      this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
      this.showModeratorBoard = this.roles.includes('ROLE_MODERATOR');

      this.username = user.username;
    }

    // Logic from HomeComponent (fetching public content)
    this.userService.getPublicContent().subscribe({
      next: data => {
        this.content = data;
      },
      error: err => {
        this.content = JSON.parse(err.error).message;
      }
    });
  }

  // Logout method from AppComponent
  logout(): void {
    this.tokenStorageService.signOut();
    window.location.reload();
  }
  isLoginVisible: boolean = true; // Initially show login component
  isLoggedInPage: boolean = false; // Track whether the user is logged in

  // Show Login component
  showLogin() {
    this.isLoginVisible = true;
  }

  // Show Register component
  showRegister() {
    this.isLoginVisible = false;
  }

  // Method to handle successful login
  onLoginSuccess() {
    this.isLoggedIn = true;
    this.isLoginVisible = true; // Show login component after login
  }

  // Optionally, you can create a method for logout
  logOut() {
    this.isLoggedIn = false;
    this.isLoginVisible = true; // Show login component after logout
  }
}
