import { Injectable } from '@angular/core';
import { ApiUrl } from '../../environments/api_url.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EstacionesService {
  private apiUrl: string = ApiUrl.url

  constructor(private http: HttpClient){

  }

  header() {
    const token = sessionStorage.getItem('token')
    const headers = new HttpHeaders({
      'authorization': `Bearer ${token}`
    })
    return headers
  }

  getEstaciones(){
    return this.http.get(`${this.apiUrl}/estaciones`)
  }

  createEstaciones(fNombre: any, fDireccion: any, fLatitud: any, fLongitud: any){
    const headers = this.header();
    const body = {
      nombre: fNombre,
      ubicacion: {
        direccion: fDireccion,
        latitud: fLatitud,
        longitud:fLongitud
      }
    };

    return this.http.post(`${this.apiUrl}/estaciones/create`, body, { headers });
  }

  deleteEstacion(idEstacion:any){
    const headers = this.header();
    return this.http.delete(`${this.apiUrl}/estaciones/delete/${idEstacion}`,{headers})
  }

  getOneEstacion(idEstacion:any){
     const headers = this.header();
    return this.http.get(`${this.apiUrl}/estaciones/${idEstacion}`,{headers})
  }

  updateEstacion(idEstacion:any, body: any){
     const headers = this.header();
    return this.http.put(`${this.apiUrl}/estaciones/update/${idEstacion}`,body,{headers})
  }

}
