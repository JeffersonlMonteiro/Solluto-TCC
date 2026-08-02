import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';
import { HomePageComponent } from './features/home-page/home-page.component';
import { LoginPageComponent } from './features/login-page/login-page.component';    
import { SignupPageComponent } from './features/signup-page/signup-page.component';
import { RecoveryPageComponent } from './features/recovery-page/recovery-page.component';
import { LandingPageComponent } from './features/landing-page/landing-page/landing-page.component';

export const routes: Routes = [
  {
    path: '',
    component: LandingPageComponent
  },
  {
    path: 'home',
    component: HomePageComponent,
    canActivate: [authGuard]
  },
  {
    path: 'login',
    component: LoginPageComponent
  },
  {
    path: 'signup',
    component: SignupPageComponent
  },
  {
    path: 'recovery',
    component: RecoveryPageComponent
  }
];
