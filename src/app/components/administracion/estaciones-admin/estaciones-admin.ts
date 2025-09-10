import { Component, inject } from '@angular/core';
import { EstacionesService } from '../../../services/estaciones/estaciones.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import flashy from '@pablotheblink/flashyjs';

@Component({
  selector: 'app-estaciones-admin',
  imports: [ReactiveFormsModule],
  templateUrl: './estaciones-admin.html',
  styleUrl: './estaciones-admin.css'
})
export class EstacionesAdmin {
  estacionService = inject(EstacionesService)
  formEstacion!: FormGroup

  estaciones : any [] = []
  drop = true

  constructor(private fb: FormBuilder){
    this.formEstacion = fb.group({
      nombre:['',[Validators.required]],
      direccion:['',[Validators.required]],
      latitud:['',[Validators.required]],
      longitud:['',[Validators.required]]
    })
  }

  ngOnInit(){
    this.renderEstacion()
  }

  renderEstacion(){
    this.estacionService.getEstaciones().subscribe({
      next: (res: any) => {
        console.log(res.data);
         this.estaciones = res.data.sort((a: any, b: any) => {
        const fechaA = new Date(a.updatedAt || a.createdAt).getTime();
        const fechaB = new Date(b.updatedAt || b.createdAt).getTime();
        return fechaB - fechaA;
      });

      },
      error: (err) => {
        console.log(err);
      }
    })
  }


  estacionCreate(){

    this.drop = true
    // this.formEstacion.reset()
    // console.log(this.formEstacion);

    const f = this.formEstacion.value

    this.estacionService.createEstaciones(f.nombre, f.direccion, f.latitud, f.longitud).subscribe({
       next: (res: any) => {
        console.log(res);
         flashy(`${res.msj}`, {
              type: 'success',
              position: 'bottom-right',
              duration: 4000,
              closable: true,
              animation: 'bounce',
              theme: 'dark',
              icon: '<svg xmlns="http://www.w3.org/2000/svg"  fill="none"   viewBox="0 0 24 24" stroke-width="2"       stroke="currentColor" style="width:24px;height:24px;color:#22c55e;"> <circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="2"/> <path stroke-linecap="round" stroke-linejoin="round"d="M9 12l2 2 4-4" /> </svg>',
              onClick: () => console.log('Notificación clickeada'),
              onClose: () => this.formEstacion.reset(),
            });
            this.renderEstacion()
      },
      error: (err) => {
        console.log(err);
        flashy(`${err.error?.msj}`, {
              type: 'error',
              position: 'bottom-right',
              duration: 2000,
              closable: true,
              animation: 'bounce',
              theme: 'dark',
              icon: '<svg xmlns="http://www.w3.org/2000/svg"       fill="none"       viewBox="0 0 24 24"       stroke-width="2"       stroke="currentColor"       style="width:24px;height:24px;color:#ef4444;">   <path stroke-linecap="round" stroke-linejoin="round"          d="M6 18L18 6M6 6l12 12" />   <circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="2"/> </svg>',
            });
      }
    })
  }


  eliminarEstacion(idEstacion: any){
     const confirmacion = confirm('esta seguro de eliminar esta estacion?')

     if (!confirmacion) {
      return
     }
    this.estacionService.deleteEstacion(idEstacion).subscribe({
      next: (res: any) => {
        console.log(res.data);
        this.renderEstacion()

      },
      error: (err) => {
        console.log(err);
      }
    })
  }


  estacionIdEditando!:any

  editarEstacion(id:any){
    this.drop = false
    this.estacionIdEditando = id
    this.estacionService.getOneEstacion(id).subscribe({
      next: (dataApi:any) => {
        console.log(dataApi);

        this.formEstacion.patchValue({
          nombre: dataApi.nombre,
          direccion: dataApi.ubicacion.direccion,
          latitud: dataApi.ubicacion.latitud,
          longitud: dataApi.ubicacion.longitud
        })
      },
      error: (error: any) => {
        console.log('Error al editar la Estacion', error);

      }
    })
  }

  guardarEditado(){
    this.estacionService.updateEstacion(this.estacionService, this.formEstacion.value).subscribe({
      next: (dataApi:any) => {
        console.log(dataApi.data);
         this.renderEstacion()

      },
      error: (error: any) => {
        console.log('Error al modificar la Bicicleta', error);

      }
    })
  }



}
