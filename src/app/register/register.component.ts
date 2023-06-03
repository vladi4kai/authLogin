import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: ['mat-card-content form{display: flex; justify-content: center; align-items: center; flex-wrap: wrap} mat-card-header{display: flex; justify-content: center} div{display: flex; justify-content: center; flex-wrap: wrap; align-items: center}']
})
export class RegisterComponent {
  constructor(
    private builder: FormBuilder,
    private toastr: ToastrService,
    private authService: AuthService,
    private router: Router
  ) {}

  registerForm = this.builder.group({
    firstName: ['', Validators.compose([Validators.required, Validators.minLength(3)])],
    lastName: ['', Validators.compose([Validators.required, Validators.minLength(3)])],
    gender: ['male'],
    birth: [''],
    phone: ['', Validators.required],
    password: ['', Validators.compose([Validators.required, Validators.pattern('^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{6,}$')])]
  });

  proceedRegistration() {
    if (this.registerForm.valid) {
      const userData = this.registerForm.value;

      this.authService.registerUser(userData).subscribe(
        () => {
          this.toastr.success('Registered successfully');
          this.router.navigate(['login']);
        },
        (error: any) => {
          this.toastr.error('Registration failed');
        }
      );
    } else {
      this.toastr.warning('Please enter valid data');
    }
  }
}
