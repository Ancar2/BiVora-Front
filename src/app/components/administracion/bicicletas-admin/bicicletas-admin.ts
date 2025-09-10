import { Component, inject } from '@angular/core';
import { BicicletasService } from '../../../services/bicicletas/bicicletas.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { EstacionesService } from '../../../services/estaciones/estaciones.service';
import flashy from '@pablotheblink/flashyjs';


@Component({
  selector: 'app-bicicletas-admin',
  imports: [ReactiveFormsModule],
  templateUrl: './bicicletas-admin.html',
  styleUrl: './bicicletas-admin.css'
})
export class BicicletasAdmin {
estacionService = inject(EstacionesService)
biciService = inject(BicicletasService)
formBici!: FormGroup


bicicletas : any [] = []
estaciones : any [] = []
drop = true

  constructor(private fb: FormBuilder){
    this.formBici = fb.group({
      serial:['',[Validators.required]],
      img:['',[Validators.required]],
      estacion:['',[Validators.required]],
      estado:['',[Validators.required]],
    })
  }

ngOnInit(){
  this.renderBici()
  this.renderEstacion()
}

renderBici(){
  this.biciService.getAllBici().subscribe({
    next: (res: any) => {
        console.log(res);
         this.bicicletas = res.data.sort((a: any, b: any) => {
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

bicicletaCreate(){
  this.drop =true
  this.biciService.createBici(this.formBici.value).subscribe({
    next: (res: any) => {
        console.log(res);
        this.renderBici()
        flashy(`${res.msj}`, {
              type: 'success',
              position: 'bottom-right',
              duration: 4000,
              closable: true,
              animation: 'bounce',
              theme: 'dark',
              icon: '<svg xmlns="http://www.w3.org/2000/svg"  fill="none"   viewBox="0 0 24 24" stroke-width="2"       stroke="currentColor" style="width:24px;height:24px;color:#22c55e;"> <circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="2"/> <path stroke-linecap="round" stroke-linejoin="round"d="M9 12l2 2 4-4" /> </svg>',
              onClick: () => console.log('Notificación clickeada'),
              onClose: () => this.formBici.reset(),
            });

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

eliminarBici(idBici: any){
    const confirmacion = confirm('esta seguro de eliminar esta Bicicleta?')

     if (!confirmacion) {
      return
     }
    this.biciService.deleteBici(idBici).subscribe({
      next: (res: any) => {
        console.log(res.data);
        this.renderBici()

      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  biciIdEditando!:any
  editarBici(id:any){
    this.drop = false
    this.biciIdEditando = id
    this.biciService.getOneBici(id).subscribe({
      next: (dataApi:any) => {
        console.log(dataApi.data);

        this.formBici.patchValue({
          serial: dataApi.data.serial,
          img: dataApi.data.img,
          estacion: dataApi.data.estacion.nombre,
          estado: dataApi.data.estado
        })


      },
      error: (error: any) => {
        console.log('Error al editar la Bicicleta', error);

      }
    })
  }

  guardarEditado(){
    this.biciService.updateBici(this.biciIdEditando, this.formBici.value).subscribe({
      next: (dataApi:any) => {
        console.log(dataApi.data);
         this.renderBici()

      },
      error: (error: any) => {
        console.log('Error al modificar la Bicicleta', error);

      }
    })
  }

}
