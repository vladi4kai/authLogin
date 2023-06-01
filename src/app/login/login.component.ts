import { Component } from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {ToastrService} from "ngx-toastr";
import {AuthService} from "../service/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: ['mat-card-content form{display: flex; justify-content: center; align-items: center; flex-wrap: wrap} mat-card-header{display: flex; justify-content: center} div{display: flex; justify-content: center; flex-wrap: wrap; align-items: center}']
})
export class LoginComponent {
  constructor(private builder: FormBuilder, private toastr: ToastrService,
              private service: AuthService, private router: Router) {
    sessionStorage.clear();
  }

  userdata: any;
  loginform = this.builder.group({
    login: this.builder.control('', Validators.required),
    password: this.builder.control('', Validators.required)
  })

  proceedlogin() {
    if (this.loginform.valid) {
      this.service.Login(this.loginform.value.login, this.loginform.value.password).subscribe(
        res => {
          this.userdata = res;
          console.log(this.userdata);
          this.toastr.success('Login success');
          localStorage.setItem('token', this.userdata.token);
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

