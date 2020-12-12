import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AuthComponent} from './pages/auth/auth.component';
import {MainComponent} from './pages/main/main.component';
import {ProfileComponent} from './components/profile/profile.component';
import { UsersComponent } from './components/users/users.component';
import {FirstPageComponent} from './components/first-page/first-page.component';


const routes: Routes = [
  { path: '' , component: AuthComponent},
  {
    path: 'main', component: MainComponent,
    children: [
      {path: 'profile/:username', component: ProfileComponent},
      {path: 'users', component: UsersComponent },
      {path: '', component: FirstPageComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
