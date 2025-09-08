import { Injectable } from '@angular/core';
import { ApiUrl } from '../../environments/api_url.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AlquilerService {
  private apiUrl: string = ApiUrl.url
  constructor(private http: HttpClient) { }

  header() {
    const token = sessionStorage.getItem('token')
    const headers = new HttpHeaders({
      'authorization': `Bearer ${token}`
    })
    return headers
  }

  postAlquilar(bodyB: any, bodyE: any) {
    const headers = this.header();
    const body = {
      bicicleta: bodyB,
      estacionInicio: bodyE
    };
    return this.http.post(`${this.apiUrl}/alquiler/create`, body, { headers });
  }

  getAlquilerUser(idUser: any){
    const headers = this.header();
    return this.http.get(`${this.apiUrl}/alquiler?usuario=${idUser}`,{ headers })
  }

  updateAlquiler(idAlquiler:any, idEstacion:any){

    const headers = this.header();
    let body = {
      estacionFin: idEstacion
    };

     return this.http.put(`${this.apiUrl}/alquiler/finalizar/${idAlquiler}`, body,{ headers })
  }

  getAlquiler(){
    return this.http.get(`${this.apiUrl}/alquiler`)
  }
}
