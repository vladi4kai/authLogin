import { Component } from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms'
import {ToastrService} from 'ngx-toastr'
import {AuthService} from "../service/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-createnewuser',
  templateUrl: './createnewuser.component.html',
  styles: ['mat-card-content form{display: flex; justify-content: center; align-items: center; flex-wrap: wrap} mat-card-header{display: flex; justify-content: center} div{display: flex; justify-content: center; flex-wrap: wrap; align-items: center}']
})
export class CreatenewuserComponent {
  constructor(private builder: FormBuilder, private toastr: ToastrService,
              private service:AuthService,
              private router: Router) {
  }
  customUserForm = this.builder.group({
    firstName: this.builder.control('', Validators.compose([Validators.required, Validators.minLength(3)])),
    lastName: this.builder.control('', Validators.compose([Validators.required, Validators.minLength(3)])),
    gender: this.builder.control('male'),
    birth: this.builder.control(''),
    phone: this.builder.control('', Validators.required),
    password: this.builder.control('', Validators.compose([Validators.required, Validators.pattern('^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{6,}$')]))
  })

  customUserCreating(){
    if (this.customUserForm.valid){
      this.service.registerUser(this.customUserForm.value).subscribe(res => {
        this.toastr.success('New user was added to table','Successfully created')
        this.router.navigate(['user'])
      })
    } else {
      this.toastr.error('Enter valid data', 'Failed')
    }
  }
}


