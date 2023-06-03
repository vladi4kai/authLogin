import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  userApiUrl: string = 'user'

  constructor(private http: HttpClient) { }

  deleteUser(id: string) {
    const url = `${this.userApiUrl}/${id}`
    return this.http.delete(url)
  }

  updateUser(id: string, inputData: object) {
    const url = `${this.userApiUrl}/${id}`
    return this.http.patch(url, inputData)
  }

  getAllUsers() {
    return this.http.get(this.userApiUrl)
  }

  getSingleUser(id: string) {
    const url = `${this.userApiUrl}/${id}`
    return this.http.get(url)
  }
}
