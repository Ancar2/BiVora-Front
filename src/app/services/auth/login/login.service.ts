import { Injectable } from '@angular/core';
import { ApiUrl } from '../../../environments/api_url.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private apiURL: string = ApiUrl.url

  constructor(private http: HttpClient, private router: Router) {}

  loginRout(body: any){
    return this.http.post(`${this.apiURL}/login`, body)
  }

   logout() {
    sessionStorage.clear();
    this.router.navigate(['/home']);
  }

}
