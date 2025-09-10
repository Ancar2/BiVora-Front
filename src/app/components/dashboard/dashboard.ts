import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { LoginService } from '../../services/auth/login/login.service';
import { TokenService } from '../../services/auth/token/token.service';

@Component({
  selector: 'app-dashboard',
  imports: [RouterOutlet, RouterLink],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard {
  serviceLogin = inject(LoginService)
  tokenService = inject (TokenService)

  constructor(private router: Router) {}

    nombre = this.tokenService.getFromToken('nombre')
    apellido = this.tokenService.getFromToken('apellido')

  closeMenu() {
    const checkbox = document.getElementById('main-navigation-toggle') as HTMLInputElement;
    if (checkbox) checkbox.checked = false;
  }

  logOut() {
    this.serviceLogin.logout()
  }
}
