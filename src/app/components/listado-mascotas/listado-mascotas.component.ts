import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Mascota } from 'src/app/interfaces/mascota';

const ELEMENT_DATA: Mascota[] = [
  { nombre: 'Lucas', edad: 5, raza: 'Pastor Alemán', color: 'Amarillo', peso: 10 },
  { nombre: 'Bella', edad: 3, raza: 'Labrador Retriever', color: 'Negro', peso: 12 },
  { nombre: 'Max', edad: 2, raza: 'Bulldog Francés', color: 'Marrón', peso: 8 },
  { nombre: 'Luna', edad: 4, raza: 'Golden Retriever', color: 'Dorado', peso: 11 },
  { nombre: 'Rocky', edad: 6, raza: 'Rottweiler', color: 'Negro y marrón', peso: 15 },
  { nombre: 'Coco', edad: 1, raza: 'Chihuahua', color: 'Marrón claro', peso: 3 },
  { nombre: 'Daisy', edad: 4, raza: 'Bulldog Inglés', color: 'Blanco y marrón', peso: 14 },
  { nombre: 'Leo', edad: 7, raza: 'Dálmata', color: 'Blanco y negro', peso: 12 },
  { nombre: 'Lola', edad: 2, raza: 'Boxer', color: 'Atigrado', peso: 9 },
  { nombre: 'Milo', edad: 3, raza: 'Poodle', color: 'Blanco', peso: 7 }
];


@Component({
  selector: 'app-listado-mascotas',
  templateUrl: './listado-mascotas.component.html',
  styleUrls: ['./listado-mascotas.component.css']
})
export class ListadoMascotasComponent implements OnInit, AfterViewInit  {

  displayedColumns: string[] = ['nombre', 'edad', 'raza', 'color', 'peso', 'acciones'];
  dataSource = new MatTableDataSource<Mascota>(ELEMENT_DATA);
  loading: boolean = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private _snackBar: MatSnackBar) {}

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.paginator._intl.itemsPerPageLabel = 'Elementos por página';
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  eliminarMascota() {
    this.loading = true;

    setTimeout(() => {
      this.loading = false;
      this._snackBar.open('La mascota fue eliminada con exito', '', {
        duration: 3000,
        horizontalPosition: 'center',
        verticalPosition: 'top'
      
      });
    }, 3000);
  }

  ngOnInit(): void {
  }

}
