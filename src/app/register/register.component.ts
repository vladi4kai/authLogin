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
    id: this.builder.control('',Validators.compose([Validators.required, Validators.minLength(5)])),
    name: this.builder.control('', Validators.required),
    password: this.builder.control('', Validators.compose([Validators.required, Validators.pattern('^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$')])),
    email: this.builder.control('',Validators.compose([Validators.required,Validators.email])),
    gender: this.builder.control('male'),
    role: this.builder.control(''),
    isactive: this.builder.control(false)
  })

  proceedregistation(){
    if (this.registerform.valid){
      this.service.ProceedRegister(this.registerform.value).subscribe(res => {
        this.toastr.success('Please contact admin for more permissions','Register Successfully')
        this.router.navigate(['login'])
      })
    } else {
      this.toastr.warning('Please enter valid data')
    }
  }
}
