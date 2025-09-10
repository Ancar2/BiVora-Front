import { Injectable } from '@angular/core';
import { ApiUrl } from '../../environments/api_url.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BicicletasService {
   private apiUrl: string = ApiUrl.url
  constructor(private http: HttpClient) { }

   header() {
    const token = sessionStorage.getItem('token')
    const headers = new HttpHeaders({
      'authorization': `Bearer ${token}`
    })
    return headers
  }

  getbici(estacion:any){
    return this.http.get(`${this.apiUrl}/bicicletas?estacion=${estacion}`)
  }

  getAllBici(){
    return this.http.get(`${this.apiUrl}/bicicletas`)
  }

  createBici(body: any){
    const headers = this.header();
    return this.http.post(`${this.apiUrl}/bicicletas/create`, body, { headers });
  }

  deleteBici(idBici: any){
    const headers = this.header();
    return this.http.delete(`${this.apiUrl}/bicicletas/delete/${idBici}`,{headers})
  }

  getOneBici(idBici:any){
     const headers = this.header();
    return this.http.get(`${this.apiUrl}/bicicletas/${idBici}`,{headers})
  }

  updateBici(idBici:any, body : any){
     const headers = this.header();
    return this.http.put(`${this.apiUrl}/bicicletas/update/${idBici}`,body, {headers})
  }
  }

