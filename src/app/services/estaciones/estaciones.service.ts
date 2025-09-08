import { Injectable } from '@angular/core';
import { ApiUrl } from '../../environments/api_url.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EstacionesService {
  private apiUrl: string = ApiUrl.url

  constructor(private http: HttpClient){

  }

  getEstaciones(){
    return this.http.get(`${this.apiUrl}/estaciones`)
  }


}
