import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-updatepopup',
  templateUrl: './updatepopup.component.html',
  styleUrls: ['./updatepopup.component.css']
})
export class UpdatepopupComponent implements OnInit {
  constructor(
    private builder: FormBuilder,
    private service: AuthService,
    @Inject(MAT_DIALOG_DATA) public data: { userId: string },
    private toastr: ToastrService,
    private dialog: MatDialogRef<UpdatepopupComponent>,
    private router: Router
  ) {}

  registerform = this.builder.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    birth: ['', Validators.required],
    gender: ['male', Validators.required]
  });

  updateuser(): void {
    if (this.registerform.valid) {
      const userId = this.data.userId;
      const userData = {
        firstName: this.registerform.value.firstName,
        lastName: this.registerform.value.lastName,
        birth: this.registerform.value.birth,
        gender: this.registerform.value.gender
      };

      this.service.UpdateUser(userId, userData).subscribe(
        () => {
          this.toastr.success('Updated successfully');
          this.dialog.close();
          window.location.reload();
        },
        (error: any) => {
          this.toastr.error('Update failed');
        }
      );
    } else {
      this.toastr.warning('Fill required fields', 'Rejected');
    }
  }

  ngOnInit(): void {}
}
