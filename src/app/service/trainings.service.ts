import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class TrainingsService {
  trainingGroupUrl: string = 'https://my-training-backend.herokuapp.com/api/training-group'
  trainingUrl: string = 'https://my-training-backend.herokuapp.com/api/training'

  constructor(private http: HttpClient) { }
  registerTraining(userData: object){
    return this.http.post(this.trainingUrl, userData)
  }
  getTrainingForId(){
    return this.http.get('https://my-training-backend.herokuapp.com/api/training?organizationId=1')
  }
  registerTrainingGroup(userData: object){
    return this.http.post(this.trainingGroupUrl, userData)
  }
  getTrainingGroup(id: string){
    const url = `${this.trainingGroupUrl}/${id}`
    return this.http.get(url)
  }
  getAllTrainingGroups(){
    return this.http.get(this.trainingGroupUrl)
  }
  getAllTrainings(){
    return this.http.get(this.trainingUrl)
  }
}
