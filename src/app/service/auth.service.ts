import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }
  trainingGroupUrl:any = 'https://my-training-backend.herokuapp.com/api/training-group'
  trainingurl: any = 'https://my-training-backend.herokuapp.com/api/training'
  userapiurl: any = 'https://my-training-backend.herokuapp.com/api/user';
  userinfo: any = 'https://my-training-backend.herokuapp.com/api/user';
  apiurl: any = 'https://my-training-backend.herokuapp.com/api/auth/login';
  deleteUser(id: any){
    const url = `${this.userapiurl}/${id}`
    return this.http.delete(url);
  }
  GetUser(id: string) {
    const url = `${this.userinfo}/${id}`;
    return this.http.get(url);
  }

  registerTraining(userData: any){
    return this.http.post(this.trainingurl, userData)
  }
  getTrainingForId(){
    return this.http.get('https://my-training-backend.herokuapp.com/api/training?organizationId=1')
  }
  registerTrainingGroup(userData: any){
    return this.http.post(this.trainingGroupUrl, userData)
  }
  GetTrainingGroup(id: any){
    const url = `${this.trainingGroupUrl}/${id}`
    return this.http.get(url)
  }
  GetAllTrainingGroups(){
    return this.http.get(this.trainingGroupUrl)
  }
  GetAllTrainings(){
    return this.http.get(this.trainingurl)
  }
  GetAll(): Observable<any> {
    return this.http.get(this.userapiurl)
  }
  registerUser(userData: any) {
    return this.http.post('https://my-training-backend.herokuapp.com/api/auth/register', userData);
  }

  Login(login: string, password: string) {
    const body = { login , password };
    return this.http.post(this.apiurl, body);
  }
  UpdateUser(code: any, inputdata: any) {
    const url = `${this.userapiurl}/${code}`;
    return this.http.patch(url, inputdata);
  }

}
