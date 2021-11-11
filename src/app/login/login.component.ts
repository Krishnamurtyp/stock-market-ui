import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthenticationResponse } from '../auth';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup


  constructor(private authService: AuthService, private formBuilder: FormBuilder,
    private _router: Router) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.loginForm = this.formBuilder.group({
      username: '',
      password: ''
    })
  }

  login(): void {
    this.authService.login(this.loginForm.value).subscribe(
      (response: AuthenticationResponse) => {
        localStorage.setItem('token',response.jwt);
        this._router.navigate(['/list-all-companies']);
      },
      (error: HttpErrorResponse) => {
        if (error.status == 401) {
          alert("Incorrect credentials, please check username/password")
          this.authService.logoutUser
        } else {
          alert(error.message);
        }
      }
    )
  }

}
