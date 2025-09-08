import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiUrl } from '../../environments/api_url.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl: string = ApiUrl.url
  constructor(private http: HttpClient) { }

  postRegister(bodyRegister: any) {
    return this.http.post(`${this.apiUrl}/users/create`, bodyRegister)
  }

  getUsers(){
    return this.http.get(`${this.apiUrl}/users`)
  }
}
