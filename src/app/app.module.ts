import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { AuthComponent } from './pages/auth/auth.component';
import { RegisterComponent } from './components/register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';




import {InputTextModule} from 'primeng/inputtext';
import {ButtonModule} from 'primeng/button';
import { MainComponent } from './pages/main/main.component';
import {MenubarModule} from 'primeng/menubar';
import { ProfileComponent } from './components/profile/profile.component';
import {MessagesModule} from 'primeng/messages';
import {MessageModule} from 'primeng/message';
import { FooterComponent } from './components/footer/footer.component';
import {CardModule} from 'primeng/card';
import {HttpClientModule} from '@angular/common/http';
import { UsersComponent } from './components/users/users.component';
import {TableModule} from 'primeng/table';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {TooltipModule} from 'primeng/tooltip';
import { FirstPageComponent } from './components/first-page/first-page.component';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AuthComponent,
    RegisterComponent,
    MainComponent,
    ProfileComponent,
    FooterComponent,
    UsersComponent,
    FirstPageComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    InputTextModule,
    ButtonModule,
    MenubarModule,
    MessagesModule,
    MessageModule,
    CardModule,
    TableModule,
    TooltipModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
