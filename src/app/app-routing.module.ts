import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './components/views/home/home.component'
import { RegisterComponent } from './components/views/register/register.component'
import { LoginComponent } from './components/views/login/login.component';

const routes: Routes = [
  {
    path: "",
    component: HomeComponent
  }, {
    path: "register",
    component: RegisterComponent
  }, {
    path: "login",
    component: LoginComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
