import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { BoardUserComponent } from './board-user/board-user.component';
import { BoardModeratorComponent } from './board-moderator/board-moderator.component';
import { BoardAdminComponent } from './board-admin/board-admin.component';
import { PublishComponent } from './publish/publish.component';
import { AccountsComponent } from './publish/admin/accounts/accounts.component';
import { NewComponent } from './publish/admin/accounts/new/new.component';
import { AdminComponent } from './publish/admin/admin.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: HomeComponent },
  { path: 'register', component: HomeComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'user', component: BoardUserComponent },
  { path: 'mod', component: BoardModeratorComponent },
  { path: 'admin', component: AdminComponent},
  { path: 'publish', component: AdminComponent},
  { path: 'accounts', component: AccountsComponent},
  { path: 'new',component: NewComponent},

  { path: 'publish', redirectTo: 'admin', pathMatch: 'full' }, // Redirect to AdminDashboard on empty path
  { path: '**', redirectTo: 'home', pathMatch: 'full' }  // Wildcard route to handle undefined routes
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
