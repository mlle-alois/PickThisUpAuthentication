import {Component, OnInit} from '@angular/core';
import {Http} from '@angular/http';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../../services/user.service';
import {Router} from '@angular/router';
import {catchError} from "rxjs/operators";
import {HttpErrorResponse} from "@angular/common/http";
import {throwError} from "rxjs";
import {getCurrentTokenWithoutQuotes} from "../../Utils/TokenUtils";

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.css']
})
export class AuthenticationComponent implements OnInit {
  loginForm: FormGroup;
  returnedData: any;
  message: any;
  loading = "";

  constructor(
    private http: Http,
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {
    this.loginForm = this.formBuilder.group({
      'email': ['', [Validators.email, Validators.required]],
      'password': ['', Validators.required],
    });
  }

  //TODO le message à l'utilisateur ne se met pas à jour
  // surement à cause de l'asyncrone
  public handleError(error: HttpErrorResponse) {
    this.loading = "";
    this.message = error.statusText;
    return throwError(`Backend returned code ${error.status}, body was: ${error.statusText}`);
  }

  login() {
    this.message = "";
    this.loading = "loading...";
    const credentials = this.loginForm.value;
    this.userService.login(credentials)
      .pipe(catchError(this.handleError))
      .subscribe((result) => {
        this.loading = "";
        this.returnedData = result;
        const jsondata = JSON.parse(this.returnedData._body);
        if (!this.returnedData.ok) {
          this.message = this.returnedData.statusText;
          return;
        } else if (jsondata.token) {
          localStorage.setItem('currentToken', JSON.stringify(jsondata.token));

          window.location.href = `http://localhost:4202?token=${getCurrentTokenWithoutQuotes()}`;
          //this.router.navigate(['dashboard']);
        } else {
          this.message = "An error was occured";
        }
      });
  }

  registerCall() {
    this.router.navigate(['register'])
  }

  forgotPasswordCall() {
    this.router.navigate(['forgot-password'])
  }

  ngOnInit() {
    if (localStorage.getItem('currentToken')) {
      window.location.href = `http://localhost:4202?token=${getCurrentTokenWithoutQuotes()}`;
      //this.router.navigate(['dashboard'])
    }
  }
}
