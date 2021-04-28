import {BrowserModule} from '@angular/platform-browser';
import {AppComponent} from './app.component';
import {AuthenticationComponent} from './components/authentication/authentication.component';
import {AppRoutingModule} from './app-routing.module';
import {HttpClientModule} from '@angular/common/http';
import {HttpClient} from "@angular/common/http";
import {HttpModule} from '@angular/http';
import {ReactiveFormsModule} from '@angular/forms';
import {HeaderComponent} from './components/header/header.component';
import {FooterComponent} from './components/footer/footer.component';
import {DashboardComponent} from './components/dashboard/dashboard.component';
import {RegisterComponent} from './components/register/register.component';
import {NgxLoadingModule} from 'ngx-loading';
import {NgModule} from "@angular/core";
import {ButtonModule} from "primeng/button";
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';

@NgModule({
  declarations: [
    AppComponent,
    AuthenticationComponent,
    HeaderComponent,
    FooterComponent,
    DashboardComponent,
    RegisterComponent,
    ForgotPasswordComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    HttpModule,
    ReactiveFormsModule,
    NgxLoadingModule.forRoot({}),
    ButtonModule

  ],
  providers: [HttpClient],
  bootstrap: [AppComponent]
})
export class AppModule {
}
