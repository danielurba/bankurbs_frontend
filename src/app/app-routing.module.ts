import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './components/views/home/home.component'
import { RegisterComponent } from './components/views/register/register.component'
import { LoginComponent } from './components/views/login/login.component';
import { AdministrarComponent } from './components/views/administrar/administrar.component';

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
  }, {
    path: "administration",
    component: AdministrarComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
