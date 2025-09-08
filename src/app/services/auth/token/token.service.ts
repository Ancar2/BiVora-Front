import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  token = sessionStorage.getItem('token');

  getFromToken(variable: any) {

    if (!this.token) {
      return 'no hay token valido'
    };

    try {
      const decoded: any = jwtDecode(this.token);
      return decoded?.[variable] || null;
    } catch (error) {
      console.log('Error al decodificar el token:', error);
      return null;
    }
  }

}
