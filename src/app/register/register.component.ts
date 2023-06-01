import { Component } from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms'
import {ToastrService} from 'ngx-toastr'
import {Router} from "@angular/router";
import {AuthService} from "../service/auth.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: ['mat-card-content form{display: flex; justify-content: center; align-items: center; flex-wrap: wrap} mat-card-header{display: flex; justify-content: center} div{display: flex; justify-content: center; flex-wrap: wrap; align-items: center}']
})
export class RegisterComponent {
  constructor(private builder: FormBuilder, private toastr: ToastrService,
  private service:AuthService, private router: Router) {
  }
  registerform = this.builder.group({
    firstName: this.builder.control('', Validators.compose([Validators.required, Validators.minLength(3)])),
    lastName: this.builder.control('', Validators.compose([Validators.required, Validators.minLength(3)])),
    gender: this.builder.control('male'),
    birth: this.builder.control(''),
    phone: this.builder.control('', Validators.required),
    password: this.builder.control('', Validators.compose([Validators.required, Validators.pattern('^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{6,}$')])),
  })

  proceedRegistration() {
    if (this.registerform.valid) {
      const userData = {
        firstName: this.registerform.value.firstName,
        lastName: this.registerform.value.lastName,
        gender: this.registerform.value.gender,
        birth: this.registerform.value.birth,
        phone: this.registerform.value.phone,
        password: this.registerform.value.password,
      };

      this.service.registerUser(userData).subscribe(res => {
        this.toastr.success( 'Register Successfully');
        this.router.navigate(['login']);
      });
    } else {
      this.toastr.warning('Please enter valid data');
    }
  }

}
