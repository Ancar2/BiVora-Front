import { Component, inject } from '@angular/core';
import { EstacionesService } from '../../../services/estaciones/estaciones.service';
import { CommonModule } from '@angular/common';
import { BicicletasService } from '../../../services/bicicletas/bicicletas.service';
import { AlquilerService } from '../../../services/alquiler/alquiler.service';
import flashy from '@pablotheblink/flashyjs';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-estaciones',
  imports: [CommonModule, RouterLink],
  templateUrl: './estaciones.html',
  styleUrl: './estaciones.css'
})
export class Estaciones {
  estacionService = inject(EstacionesService)
  alquilerService = inject(AlquilerService)
  estaciones!: any[]

  bicicletas!: any[]
  estacionId!: any
  biciId!: any


  ngOnInit() {
    this.renderEstaciones()
    this.renderBici(this.bicicletas)
  }


  renderEstaciones() {
    this.estacionService.getEstaciones().subscribe({
      next: (dataApi: any) => {
        this.estaciones = dataApi.data
      },
      error: (error) => {
        console.log(error);
      }
    })
  }


  obtenerEstacion(estacion: any) {
    this.estacionId = estacion
    this.renderBici(this.bicicletas)
  }



  renderBici(bicicletasArray:any[]){
    this.bicicletas = []
    this.bicicletas = bicicletasArray
    this.renderEstaciones()
  }


  obtenerBiciId(bici: any) {
    this.biciId = bici
    this.alquilar(this.biciId)
    this.renderBici(this.bicicletas)
  }



  alquilar(bici:any){
    this.alquilerService.postAlquilar(bici, this.estacionId).subscribe({
      next: (dataApi: any) => {
         this.renderBici(this.bicicletas)
         console.log(this.bicicletas);

        console.log(dataApi.data);
         flashy(`alquiler adquirido correctamente!`, {
          type: 'success',
          position: 'bottom-right',
          duration: 4000,
          closable: true,
          animation: 'bounce',
          theme: 'dark',
          icon: '<svg xmlns="http://www.w3.org/2000/svg"       fill="none"       viewBox="0 0 24 24"       stroke-width="2"       stroke="currentColor"       style="width:24px;height:24px;color:#22c55e;">   <circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="2"/>   <path stroke-linecap="round" stroke-linejoin="round"          d="M9 12l2 2 4-4" /> </svg>',

        });
      },

      error: (error) => {
        console.log(error);
        flashy(`${error.error?.msj || 'Error al adquirir alquiler'}`, {
          type: 'error',
          position: 'bottom-right',
          duration: 4000,
          closable: true,
          animation: 'bounce',
          theme: 'dark',
          icon: '<svg xmlns="http://www.w3.org/2000/svg"       fill="none"       viewBox="0 0 24 24"       stroke-width="2"       stroke="currentColor"       style="width:24px;height:24px;color:#ef4444;">   <path stroke-linecap="round" stroke-linejoin="round"          d="M6 18L18 6M6 6l12 12" />   <circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="2"/> </svg>',
        });
      }
    })
  }
}
