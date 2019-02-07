import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'language', pathMatch: 'full' },
  { path: 'home', loadChildren: './home/home.module#HomePageModule' },
  { path: 'login', loadChildren: './pages/login/login.module#LoginPageModule' },
  { path: 'signup', loadChildren: './pages/signup/signup.module#SignupPageModule' },
  { path: 'rest-pass', loadChildren: './pages/rest-pass/rest-pass.module#RestPassPageModule' },
  { path: 'forgot-pass', loadChildren: './pages/forgot-pass/forgot-pass.module#ForgotPassPageModule' },
  { path: 'language', loadChildren: './pages/language/language.module#LanguagePageModule' },  { path: 'business', loadChildren: './pages/business/business.module#BusinessPageModule' },
  { path: 'notification', loadChildren: './pages/notification/notification.module#NotificationPageModule' },



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
