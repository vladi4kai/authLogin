import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-createnewuser',
  templateUrl: './createnewuser.component.html',
  styles: [
    'mat-card-content form{display: flex; justify-content: center; align-items: center; flex-wrap: wrap}',
    'mat-card-header{display: flex; justify-content: center}',
    'div{display: flex; justify-content: center; flex-wrap: wrap; align-items: center}',
  ],
})
export class CreatenewuserComponent {
  customUserForm = this.builder.group({
    firstName: ['', [Validators.required, Validators.minLength(3)]],
    lastName: ['', [Validators.required, Validators.minLength(3)]],
    gender: ['male'],
    birth: [''],
    phone: ['', Validators.required],
    password: ['', [Validators.required, Validators.pattern('^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{6,}$')]],
  });

  constructor(
    private builder: FormBuilder,
    private toastr: ToastrService,
    private service: AuthService,
    private router: Router
  ) {}

  customUserCreating() {
    if (this.customUserForm.valid) {
      this.service.registerUser(this.customUserForm.value).subscribe(
        () => {
          this.toastr.success('New user was added to table', 'Successfully created');
          this.router.navigate(['user']);
        },
        () => {
          this.toastr.error('Enter valid data', 'Failed');
        }
      );
    } else {
      this.toastr.error('Enter valid data', 'Failed');
    }
  }
}
