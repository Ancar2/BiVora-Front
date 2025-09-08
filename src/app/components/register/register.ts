import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../../services/user/user.service';
import flashy from '@pablotheblink/flashyjs';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class Register {
  userService =inject(UserService)

  formRegister!: FormGroup

  constructor(private fb: FormBuilder, private router: Router) {
    this.formRegister = fb.group({
      nombre: ["", [Validators.required, Validators.minLength(4), Validators.pattern(/^[A-Za-zÁÉÍÓÚáéíóúÑñ0-9\s]+$/)]],
      apellido: ["", [Validators.required, Validators.minLength(4,), Validators.pattern(/^[A-Za-zÁÉÍÓÚáéíóúÑñ0-9\s]+$/)]],
      correo: ["", [Validators.required, Validators.minLength(6), Validators.pattern(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/)]],
      password: ["", [Validators.required, Validators.minLength(5)]],
    })
  }


  register(){
    if (this.formRegister.valid) {
      this.userService.postRegister(this.formRegister.value).subscribe({
        next: (dataApi: any) => {
          flashy(dataApi?.msj || "Tu cuenta ha sido creada correctamente", {
            type: 'success',
            position: 'bottom-right',
            duration: 4000,
            closable: true,
            animation: 'bounce',
            theme: 'dark',
            icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none"
                      viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"
                      style="width:24px;height:24px;color:#22c55e;">
                      <circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="2"/>
                      <path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4" /></svg>`,
            onClose: () => {
              this.router.navigate(['/login']);
            }
          });
        },

        error: (error: any) => {
          flashy(error?.error?.msj || "Ocurrio un error inesperado. Intentalo nuevamente", {
            type: 'error',
            position: 'bottom-right',
            duration: 4000,
            closable: true,
            animation: 'bounce',
            theme: 'dark',
            icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none"
                      viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"
                      style="width:24px;height:24px;color:#ef4444;">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                      <circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="2"/></svg>`
          });
        }
      });
    } else {
      flashy('Error al registrarse. Verifica los campos.', {
        type: 'warning',
        position: 'bottom-right',
        duration: 4000,
        closable: true,
        animation: 'bounce',
        theme: 'dark',
        icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none"
                  viewBox="0 0 24 24" stroke-width="1.8" stroke="currentColor"
                  style="width:24px;height:24px;color:#f59e0b;">
                  <path stroke-linecap="round" stroke-linejoin="round"
                        d="M12 9v3.75m0 3.75h.007M10.29 3.86c.77-1.33
                        2.65-1.33 3.42 0l7.35 12.68c.75 1.3-.19
                        2.96-1.71 2.96H4.65c-1.52 0-2.46-1.66-1.71-2.96L10.29 3.86z" /></svg>`
      });
    }
  }

}
