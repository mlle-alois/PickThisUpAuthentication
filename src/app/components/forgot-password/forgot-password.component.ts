import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Http} from "@angular/http";
import {APIcallService} from "../../services/apicall.service";
import {Router} from "@angular/router";
import {HttpErrorResponse} from "@angular/common/http";
import {throwError} from "rxjs";
import {catchError} from "rxjs/operators";

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  loginForm: FormGroup;
  returnedData: any;
  message: any;
  loading = "";

  constructor(
    private http: Http,
    private formBuilder: FormBuilder,
    private userService: APIcallService,
    private router: Router
  ) {
    this.loginForm = this.formBuilder.group({
      'email': ['', [Validators.email, Validators.required]]
    });
  }

  //TODO le message à l'utilisateur ne se met pas à jour
  // surement à cause de l'asyncrone
  public handleError(error: HttpErrorResponse) {
    this.loading = "";
    this.message = error.statusText;
    return throwError(`Backend returned code ${error.status}, body was: ${error.statusText}`);
  }

  resetPassword() {
    this.message = "";
    this.loading = "loading...";
    const credentials = this.loginForm.value;
    this.userService.getUserByMail(credentials)
      .pipe(catchError(this.handleError))
      .subscribe((result) => {
        this.loading = "";
        this.returnedData = result;
        const jsondata = JSON.parse(this.returnedData._body);
        if (!this.returnedData.ok) {
          this.message = this.returnedData.statusText;
          return;
        } else if (jsondata.mail) {
          console.log(jsondata.mail)
          //TODO envoyer le mail de réinitialisation
          this.message = "La fonction de réinitialisation de mot de passe n'est pas encore disponible"
          /*localStorage.setItem('currentToken', JSON.stringify(jsondata.token));
          this.router.navigate(['dashboard']);*/
        } else {
          this.message = "An error was occured";
        }
      });
  }

  registerCall() {
    this.router.navigate(['register'])
  }

  loginCall() {
    this.router.navigate([''])
  }

  ngOnInit() {
    if (localStorage.getItem('currentUser') || localStorage.getItem('googleUser')) {
      this.router.navigate(['dashboard'])
    }
  }
}
