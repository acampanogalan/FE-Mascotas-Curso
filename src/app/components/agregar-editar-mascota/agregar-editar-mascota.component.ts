import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Mascota } from '../../interfaces/mascota';
import { MascotaService } from 'src/app/services/mascota.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-agregar-editar-mascota',
  templateUrl: './agregar-editar-mascota.component.html',
  styleUrls: ['./agregar-editar-mascota.component.css']
})
export class AgregarEditarMascotaComponent implements OnInit {
  loading: boolean = false;

  form: FormGroup

  constructor(private fb: FormBuilder,
    private _mascotaService: MascotaService,
    private _snackBar: MatSnackBar,
    private router: Router
  ) {
    this.form = this.fb.group({
      nombre: ['', Validators.required],
      edad: ['', Validators.required],
      raza: ['', Validators.required],
      color: ['', Validators.required],
      peso: ['', Validators.required]
    });

   }

  ngOnInit(): void {
  }

  agregarMascota() {
    // const nombre = this.form.get('nombre')?.value;

    const mascota: Mascota = {
      nombre : this.form.value.nombre,
      edad : this.form.value.edad,
      raza : this.form.value.raza,
      color : this.form.value.color,
      peso : this.form.value.peso
    }

    this._mascotaService.addNewMascota(mascota).subscribe({
      next: (data) => {
        this.mensajeExito();
        this.router.navigate(['/listMascotas']);
      },
      error: error => {
        console.error(error);
        alert('Ocurrio un error al agregar la mascota');
      }
    });
  }

  mensajeExito() {
    this._snackBar.open('La mascota fue registrada con exito', '', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'top'
    });
  }

}
