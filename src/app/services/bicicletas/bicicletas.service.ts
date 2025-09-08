import { Injectable } from '@angular/core';
import { ApiUrl } from '../../environments/api_url.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BicicletasService {
   private apiUrl: string = ApiUrl.url
  constructor(private http: HttpClient) { }

  getbici(estacion:any){
    return this.http.get(`${this.apiUrl}/bicicletas?estacion=${estacion}`)
  }

  getAllBici(){
    return this.http.get(`${this.apiUrl}/bicicletas`)
  }
}
