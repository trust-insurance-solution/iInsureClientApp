import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren: './home/home.module#HomePageModule' },  { path: 'login', loadChildren: './pages/login/login.module#LoginPageModule' },
  { path: 'signup', loadChildren: './pages/signup/signup.module#SignupPageModule' },
  { path: 'lost-pass', loadChildren: './pages/lost-pass/lost-pass.module#LostPassPageModule' },
  { path: 'rest-pass', loadChildren: './pages/rest-pass/rest-pass.module#RestPassPageModule' },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
