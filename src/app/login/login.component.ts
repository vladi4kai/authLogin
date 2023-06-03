import { Component } from '@angular/core';
import { FormBuilder, Validators } from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import { AuthService } from "../service/auth.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: ['mat-card-content form{display: flex; justify-content: center; align-items: center; flex-wrap: wrap} mat-card-header{display: flex; justify-content: center} div{display: flex; justify-content: center; flex-wrap: wrap; align-items: center}']
})
export class LoginComponent {
  constructor(
    private builder: FormBuilder,
    private toastr: ToastrService,
    private service: AuthService,
    private router: Router
  ) {
    sessionStorage.clear();
  }

  loginForm = this.builder.group({
    login: ['', Validators.required],
    password: ['', Validators.required]
  });

  proceedLogin() {
    if (this.loginForm.valid) {
      const { login, password } = this.loginForm.value;
      this.service.loginUser(login, password).subscribe(
        (res: any) => {
          const token = res.token;
          console.log(token);
          this.toastr.success('Login success');
          localStorage.setItem('token', token);
          console.log(localStorage.getItem('token'));
          this.router.navigate(['']);
        },
        error => {
          if (error.status === 400) {
            this.toastr.warning('Invalid password or username');
          } else {
            this.toastr.error('Server error');
          }
        }
      );
    } else {
      this.toastr.warning('Please enter valid data');
    }
  }
}
