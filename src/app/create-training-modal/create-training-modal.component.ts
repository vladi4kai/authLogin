import {Component, Inject} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {AuthService} from "../service/auth.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {ToastrService} from "ngx-toastr";
import {Router} from "@angular/router";

@Component({
  selector: 'app-create-training-modal',
  templateUrl: './create-training-modal.component.html',
  styleUrls: ['./create-training-modal.component.css']
})
export class CreateTrainingModalComponent {
  constructor(private builder: FormBuilder,
              private service: AuthService,
              @Inject(MAT_DIALOG_DATA) public data,
              private toastr: ToastrService,
              private dialog: MatDialogRef<CreateTrainingModalComponent>,
              private router: Router) {
  }
  trainingform = this.builder.group({
    name: ['', Validators.required],
    duration: [null, Validators.required],
    maxPeople: [null, Validators.required],
  });

  uploadtraining(): void {
    if (this.trainingform.valid) {
      const userData = {
        name: this.trainingform.value.name,
        duration: parseInt(this.trainingform.value.duration, 10),
        maxPeople: parseInt(this.trainingform.value.maxPeople, 10)
      };

      this.service.registerTraining(userData).subscribe(
        () => {
          this.dialog.close();
          window.location.reload();
          this.toastr.success('Uploaded successfully');
        },
        (error: any) => {
          this.toastr.error('Upload failed');
        }
      );
    } else {
      this.toastr.warning('Fill required fields', 'Rejected');
    }
  }

}
