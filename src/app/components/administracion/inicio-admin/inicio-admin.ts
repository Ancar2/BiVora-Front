import { Component, inject } from '@angular/core';
import { BicicletasService } from '../../../services/bicicletas/bicicletas.service';
import { EstacionesService } from '../../../services/estaciones/estaciones.service';
import { UserService } from '../../../services/user/user.service';
import { AlquilerService } from '../../../services/alquiler/alquiler.service';

@Component({
  selector: 'app-inicio-admin',
  imports: [],
  templateUrl: './inicio-admin.html',
  styleUrl: './inicio-admin.css'
})
export class InicioAdmin {
  serviceBici = inject(BicicletasService)
  serviceEstacion = inject(EstacionesService)
  serviceUser = inject(UserService)
  serviceAlquiler = inject(AlquilerService)

  bicisDisponibles: number = 0;
  bicicletas: any[] = [];

  estacionesActivas: number = 0;
  estaciones: any[] = [];

  usersActivos: number = 0;
  users: any[] = [];

  alquilerTotal: number = 0;
  alquileres: any[] = [];

  ngOnInit() {
    this.countBici()
    this.countEstaciones()
    this.countUsers()
    this.countAlquiler()
  }

  countBici() {
    this.serviceBici.getAllBici().subscribe({
      next: (res: any) => {
        this.bicicletas = res.data;
        for (let i = 0; i < this.bicicletas.length; i++) {
          if (this.bicicletas[i].estado == 'disponible') {
            this.bicisDisponibles++;
          }
        }
        console.log("Total disponibles:", this.bicisDisponibles);


      },
      error: (err) => {
        console.error(err);
      }
    });
  }

  countEstaciones() {
    this.serviceEstacion.getEstaciones().subscribe({
      next: (res: any) => {
        this.estaciones = res.data;
        for (let i = 0; i < this.estaciones.length; i++) {
          if (this.estaciones[i].activo == true) {
            this.estacionesActivas++;
          }
        }
        console.log("Total Estaciones activas:", this.estacionesActivas);


      },
      error: (err) => {
        console.error(err);
      }
    });
  }

  countUsers(){
    this.serviceUser.getUsers().subscribe({
      next: (res: any) => {
        console.log(res);
        this.users = res;
        for (let i = 0; i < this.users.length; i++) {
          if (this.users[i].activo == true && this.users[i].role != 'owner') {
            this.usersActivos++;
          }
        }
        console.log("Total Usuarios activos:", this.usersActivos);

      },
      error: (err) => {
        console.error(err);
      }
    })
  }

  countAlquiler(){
    this.serviceAlquiler.getAlquiler().subscribe({
      next: (res: any) => {

        this.alquileres = res.data;

        for (let i = 0; i < this.alquileres.length; i++) {
            this.alquilerTotal += this.alquileres[i].costo;
        }

        console.log("Total en alquileres:", this.alquilerTotal);

      },
      error: (err) => {
        console.error(err);
      }
    })
  }

  formatNumber(num: number): string {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

}
