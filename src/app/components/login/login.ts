import { Component, inject } from '@angular/core';
import { LoginService } from '../../services/auth/login/login.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import flashy from '@pablotheblink/flashyjs';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  loginService = inject(LoginService)
  formLogin!: FormGroup

  constructor(private fb: FormBuilder){
    this.formLogin = fb.group ({
      correo:['', [Validators.required, Validators.email]],
       password: ['', [Validators.required, Validators.minLength(6)]],
    })
  }

  login(){
    if (this.formLogin.valid) {
      this.loginService.loginRout(this.formLogin.value).subscribe({
          next: (dataApi: any) => {
          console.log(dataApi);

          sessionStorage.setItem('token', dataApi.token);

          flashy(`Bienvenido a BiVora ${dataApi.Welcome}!`, {
            type: 'success',
            position: 'bottom-right',
            duration: 4000,
            closable: true,
            animation: 'bounce',
            theme: 'dark',
            icon: '<svg xmlns="http://www.w3.org/2000/svg"       fill="none"       viewBox="0 0 24 24"       stroke-width="2"       stroke="currentColor"       style="width:24px;height:24px;color:#22c55e;">   <circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="2"/>   <path stroke-linecap="round" stroke-linejoin="round"          d="M9 12l2 2 4-4" /> </svg>',
            onClick: () => {
              console.log('Notificación clickeada');
            },
            onClose: () => {
              // this.router.navigate(['//']);
            },
          });
        },

        error(error: any) {

          flashy(`${error.error.error}`, {
            type: 'error',
            position: 'bottom-right',
            duration: 4000,
            closable: true,
            animation: 'bounce',
            theme: 'dark',
            icon: '<svg xmlns="http://www.w3.org/2000/svg"       fill="none"       viewBox="0 0 24 24"       stroke-width="2"       stroke="currentColor"       style="width:24px;height:24px;color:#ef4444;">   <path stroke-linecap="round" stroke-linejoin="round"          d="M6 18L18 6M6 6l12 12" />   <circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="2"/> </svg>',
          });
        },

      })

    }
  }




}
