import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Mascota } from '../../interfaces/mascota';
import { MascotaService } from 'src/app/services/mascota.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-agregar-editar-mascota',
  templateUrl: './agregar-editar-mascota.component.html',
  styleUrls: ['./agregar-editar-mascota.component.css']
})
export class AgregarEditarMascotaComponent implements OnInit {
  loading: boolean = false;
  id: number;
  form: FormGroup;
  operacion: string = 'Agregar';

  constructor(private fb: FormBuilder,
    private _mascotaService: MascotaService,
    private _snackBar: MatSnackBar,
    private router: Router,
    private aRoute: ActivatedRoute
  ) {
    this.form = this.fb.group({
      nombre: ['', Validators.required],
      edad: ['', Validators.required],
      raza: ['', Validators.required],
      color: ['', Validators.required],
      peso: ['', Validators.required]
    });
    this.id = Number(this.aRoute.snapshot.paramMap.get('id'));
   }

  ngOnInit(): void {
    if(this.id != 0){
      this.operacion = 'Editar';
      this.obtenerMascota(this.id);
    }
  }

  obtenerMascota(id:number) {
    this.loading = true;
    this._mascotaService.getMascota(id).subscribe({
      next: data => {
        this.loading = false;
        this.form.patchValue({
          nombre: data.nombre,
          edad: data.edad,
          raza: data.raza,
          color: data.color,
          peso: data.peso
        });
      },
      error: error => {
        console.error(error);
        alert('Ocurrio un error al obtener la mascota');
      }
    });
  }

  agregarEditarMascota() {
    // const nombre = this.form.get('nombre')?.value;

    const mascota: Mascota = {
      nombre : this.form.value.nombre,
      edad : this.form.value.edad,
      raza : this.form.value.raza,
      color : this.form.value.color,
      peso : this.form.value.peso
    }

    if (this.id === 0) {
      this.agregarMascota(mascota);
    }
    else {
      mascota.id = this.id;
      this.editarMascota(this.id, mascota);
    }
  }

  editarMascota(id: number, mascota: Mascota) {
    this.loading = true;
    this._mascotaService.updateMascota(id, mascota).subscribe({
      next: (data) => {
        this.loading = false;
        this.mensajeExito('editada');
        this.router.navigate(['/listMascotas']);
      },
      error: error => {
        console.error(error);
        alert('Ocurrio un error al editar la mascota');
      }
    });
  }

  agregarMascota(mascota: Mascota){
    this._mascotaService.addNewMascota(mascota).subscribe({
      next: (data) => {
        this.mensajeExito('registrada');
        this.router.navigate(['/listMascotas']);
      },
      error: error => {
        console.error(error);
        alert('Ocurrio un error al agregar la mascota');
      }
    });
  }

  mensajeExito(text: string) {
    this._snackBar.open(`La mascota fue ${text} con exito`, '', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'top'
    });
  }

}
