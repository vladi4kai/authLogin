import { Component, Inject } from '@angular/core';
import { FormBuilder, Validators } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { ToastrService } from "ngx-toastr";
import { TrainingsService } from "../service/trainings.service";

@Component({
  selector: 'app-create-training-modal',
  templateUrl: './create-training-modal.component.html',
  styleUrls: ['./create-training-modal.component.css']
})
export class CreateTrainingModalComponent {
  trainingForm = this.builder.group({
    name: ['', Validators.required],
    duration: [null, Validators.required],
    maxPeople: [null, Validators.required],
  });

  constructor(
    private builder: FormBuilder,
    private trainingService: TrainingsService,
    @Inject(MAT_DIALOG_DATA) public data: string,
    private toastr: ToastrService,
    private dialog: MatDialogRef<CreateTrainingModalComponent>,
  ) { }

  uploadTraining(): void {
    if (this.trainingForm.valid) {
      const formData = this.trainingForm.value;

      this.trainingService.registerTraining(formData).subscribe(
        () => {
          this.dialog.close();
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
