import { Component, Inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UsersService } from "../service/users.service";

@Component({
  selector: 'app-updatepopup',
  templateUrl: './updatepopup.component.html',
  styleUrls: ['./updatepopup.component.css']
})
export class UpdatepopupComponent {
  constructor(
    private builder: FormBuilder,
    private userService: UsersService,
    @Inject(MAT_DIALOG_DATA) public data: { userId: string },
    private toastr: ToastrService,
    private dialog: MatDialogRef<UpdatepopupComponent>,
  ) {}

  updateUserForm = this.builder.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    birth: ['', Validators.required],
    gender: ['male', Validators.required]
  });

  updateUser() {
    if (this.updateUserForm.valid) {
      const userId = this.data.userId;
      const userData = this.updateUserForm.value

      this.userService.updateUser(userId, userData).subscribe(
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
}
