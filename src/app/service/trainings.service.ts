import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class TrainingsService {
  trainingGroupUrl: string = 'training-group'
  trainingUrl: string = 'training'

  constructor(private http: HttpClient) { }

  registerTraining(userData: object) {
    return this.http.post(this.trainingUrl, userData)
  }

  getTrainingForId() {
    return this.http.get(`${this.trainingUrl}?organizationId=1`)
  }

  registerTrainingGroup(userData: object) {
    return this.http.post(this.trainingGroupUrl, userData)
  }

  getTrainingGroup(id: string) {
    const url = `${this.trainingGroupUrl}/${id}`
    return this.http.get(url)
  }

  getAllTrainingGroups() {
    return this.http.get(this.trainingGroupUrl)
  }

  getAllTrainings() {
    return this.http.get(this.trainingUrl)
  }
}
