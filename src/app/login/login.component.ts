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
              private service:AuthService, private router: Router) {
    sessionStorage.clear();
  }
  userdata: any;
  loginform = this.builder.group({
    username:this.builder.control('', Validators.required),
    password:this.builder.control('', Validators.required)
  })
  proceedlogin() {
    if (this.loginform.valid) {
    this.service.GetbyCode(this.loginform.value.username).subscribe(res=> {
      this.userdata=res;
      console.log(this.userdata);
      if (this.userdata.password === this.loginform.value.password){
        if (this.userdata.isactive){
          sessionStorage.setItem('username', this.userdata.id);
          sessionStorage.setItem('userrole', this.userdata.role);
          this.router.navigate([''])

        } else {
          this.toastr.error('Please contact admin','No access')
        }
      } else {
        this.toastr.error('Invalid information')
      }
    })
    } else {
      this.toastr.warning('Please enter valid data')
    }
  }
}
