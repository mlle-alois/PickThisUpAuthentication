import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, FormControl, Validators} from '@angular/forms';
import {userModel} from '../../models/user.model';
import {Router} from '@angular/router';
import {APIcallService} from '../../services/apicall.service';
import {catchError} from "rxjs/operators";
import {HttpErrorResponse} from "@angular/common/http";
import {throwError} from "rxjs";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup; //declare the reactive forms group for register
  passwordMatched: boolean = false;
  userModel = new userModel();
  returnedData: any;
  message: any;
  loading = "";

  constructor(
    private fb: FormBuilder,
    private userService: APIcallService,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      'fullName': ['', Validators.required],
      'firstName': ['', Validators.required],
      'password': ['', [Validators.pattern('^(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*()])[a-zA-Z0-9!@#$%^&*()]{8,}$'), Validators.required]],
      'confirmPassword': ['', Validators.required],
      'email': ['', [Validators.email, Validators.required]],
      'mobile': ['', [Validators.minLength(10), Validators.required, Validators.pattern('0[0-9]{9}')]]

    });
  }

  //TODO le message à l'utilisateur ne se met pas à jour
  // surement à cause de l'asyncrone
  public handleError(error: HttpErrorResponse) {
    this.loading = "";
    this.message = error.statusText;
    return throwError(`Backend returned code ${error.status}, body was: ${error.statusText}`);
  }

  register() {
    this.message = "";
    this.loading = "loading...";
    const data = this.registerForm.value;
    this.userService.register(data)
      .pipe(catchError(this.handleError))
      .subscribe(res => {
        this.loading = "";
        this.returnedData = res;
        let jsondata = JSON.parse(this.returnedData._body);
        if (!this.returnedData.ok) {
          this.message = this.returnedData.statusText;
          return;
        } else if (jsondata.session && jsondata.session.token) {
          localStorage.setItem('currentToken', JSON.stringify(jsondata.session.token));
          this.router.navigate(['dashboard']);
        } else {
          this.message = "An error was occured";
        }
      })
  }

  checkPasswordMatch(password) {
    this.passwordMatched = password == this.userModel.confirmPassword;
  }

  checkConfirmPasswordMatch(confirmedPassword) {
    this.passwordMatched = confirmedPassword == this.userModel.password;
  }

  loginCall() {
    this.router.navigate([''])
  }

  ngOnInit() {
  }

}
