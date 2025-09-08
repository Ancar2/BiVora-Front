import { Component, inject } from '@angular/core';
import { TokenService } from '../../services/auth/token/token.service';
import { AlquilerService } from '../../services/alquiler/alquiler.service';
import { CommonModule } from '@angular/common';
import { EstacionesService } from '../../services/estaciones/estaciones.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-alquiler',
  imports: [CommonModule, RouterLink],
  templateUrl: './alquiler.html',
  styleUrl: './alquiler.css'
})
export class Alquiler {
tokenService= inject(TokenService)
alquilerService = inject(AlquilerService)
estacionService = inject(EstacionesService)

arrayAlquiler! : any []
estaciones!: any[]
drop = false

ngOnInit(){
  this.decodeIdUser()
}

decodeIdUser(){
  let user = this.tokenService.getFromToken('id')
  this.getAlquiler(user)
}

getAlquiler(user:any){
  this.alquilerService.getAlquilerUser(user).subscribe({
    next: (res: any) => {
        console.log(res);
        this.arrayAlquiler = res.data.sort
        ((a: any, b: any) => {
        if (!a.fechaFin && b.fechaFin) return -1;
        if (a.fechaFin && !b.fechaFin) return 1;
        if (a.fechaFin && b.fechaFin) {
          return new Date(b.fechaFin).getTime() - new Date(a.fechaFin).getTime();
        }
        return 0;
      });

      },
      error: (err) => {
        console.log(err);
      }
  })
}

finalizarAlquiler(idAlquiler:any, idEstacion:any){
  this.alquilerService.updateAlquiler(idAlquiler, idEstacion).subscribe({

    next: (res: any) => {
        console.log(res);
        this.decodeIdUser()

      },
      error: (err) => {
        console.log(err);
      }

  })
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
}
