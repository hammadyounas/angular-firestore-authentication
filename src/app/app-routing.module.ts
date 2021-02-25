import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from  './admin/login/login.component';
import { RegisterComponent } from  './admin/register/register.component';
import { ForgotPasswordComponent } from  './admin/forgot-password/forgot-password.component';
import { VerifyEmailComponent } from  './admin/verify-email/verify-email.component';
import { ProfileComponent } from './admin/profile/profile.component';

const routes: Routes = [
  { path:  'login',component:  LoginComponent},
  { path:  'register', component:  RegisterComponent },
  { path:  'forgot-password', component:  ForgotPasswordComponent },
  { path:  'verify-email', component:  VerifyEmailComponent },
  { path:  'profile', component:  ProfileComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
