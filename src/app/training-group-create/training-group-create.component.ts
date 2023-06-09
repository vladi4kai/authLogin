import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { TrainingsService } from '../service/trainings.service';

@Component({
  selector: 'app-training-group-create',
  templateUrl: './training-group-create.component.html',
  styles: ['mat-card-content form{display: flex; justify-content: center; align-items: center; flex-wrap: wrap} mat-card-header{display: flex; justify-content: center} div{display: flex; justify-content: center; flex-wrap: wrap; align-items: center}']
})
export class TrainingGroupCreateComponent implements OnInit {
  trainings: any[] = [];
  currentPage = '';

  constructor(
    private trainingService: TrainingsService,
    private http: HttpClient,
    private toastr: ToastrService,
    private router: Router,
    private builder: FormBuilder
  ) {
    this.currentPage = this.router.url;
  }

  trainingGroupForm = this.builder.group({
    name: ['', Validators.required],
    price: [null, Validators.required],
    maxPeople: [null, Validators.required],
    duration: [null, Validators.required],
    trainingId: [null, Validators.required],
  });

  uploadGroup() {
    if (this.trainingGroupForm.valid) {
      const { name, price, maxPeople, duration, trainingId } = this.trainingGroupForm.value;
      const userData = {
        name,
        price: parseInt(price, 10),
        maxPeople: parseInt(maxPeople, 10),
        duration: parseInt(duration, 10),
        trainingId: parseInt(trainingId, 10),
        organizationId: 1
      };

      this.trainingService.registerTrainingGroup(userData).subscribe(
        () => {
          this.router.navigate(['trainings/group']);
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

  ngOnInit() {
    this.loadTrainings();
    this.updateFormFieldsForSelectedTraining();
  }

  updateFormFieldsForSelectedTraining() {
    const selectedTrainingId = this.trainingGroupForm.value.trainingId;
    const selectedTraining = this.trainings.find(training => training.id === selectedTrainingId);

    if (selectedTraining) {
      this.trainingGroupForm.patchValue({
        name: selectedTraining.name,
        price: selectedTraining.price,
        maxPeople: selectedTraining.maxPeople,
        duration: selectedTraining.duration
      });
    }
  }

  loadTrainings() {
    this.trainingService.getTrainingForId().subscribe(
      (trainings: string[]) => {
        this.trainings = trainings;
      },
      (error: any) => {
        this.toastr.error('Failed to load trainings');
      }
    );
  }
}
