import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Mascota } from 'src/app/interfaces/mascota';
import { MascotaService } from 'src/app/services/mascota.service';

@Component({
  selector: 'app-listado-mascotas',
  templateUrl: './listado-mascotas.component.html',
  styleUrls: ['./listado-mascotas.component.css']
})
export class ListadoMascotasComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = ['nombre', 'edad', 'raza', 'color', 'peso', 'acciones'];
  dataSource = new MatTableDataSource<Mascota>();
  loading: boolean = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private _snackBar: MatSnackBar, private _mascotaService: MascotaService) { }

  ngOnInit(): void {
    this.obtenerMascotas();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    if (this.dataSource.data.length > 0) {
      this.paginator._intl.itemsPerPageLabel = 'Items por pagina'
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  eliminarMascota(id: number) {
    this.loading = true;
    this._mascotaService.deleteMascota(id).subscribe({
      next: () => {
        setTimeout(() => {
          this.loading = false;
          this.mensajeExito();
        }, 3000);
        this.obtenerMascotas();
      },
      error: error => {
        console.error(error);
        alert('Ocurrio un error al eliminar la mascota');
        this.loading = false;
      }
    });
  }

  mensajeExito() {
    this._snackBar.open('La mascota fue eliminada con exito', '', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'top'
    });
  }

  obtenerMascotas() {
    this.loading = true;
    this._mascotaService.getMascotas().subscribe({
      next: (data) => {
        this.dataSource.data = data;
        this.loading = false;
      },
      error: error => {
        console.error(error);
        alert('Ocurrio un error al obtener las mascotas');
        this.loading = false;
      }
    });
  }

}
