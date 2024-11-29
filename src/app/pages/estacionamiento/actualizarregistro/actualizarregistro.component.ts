import { Component, inject, OnInit } from '@angular/core';
import { EstacionamientoService } from '../../../services/estacionamiento.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import Swal from 'sweetalert2';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-actualizarregistro',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './actualizarregistro.component.html',
  styleUrl: './actualizarregistro.component.css'
})
export class ActualizarregistroComponent implements OnInit {
  private _estacionamientoService=inject(EstacionamientoService);
  private _router = inject(Router);
  private _route = inject(ActivatedRoute);
  registro = {
    entrada: '', 
    vehiculo: {
      placa: '',
      tipo: '', 
      modelo: '',
      tieneCasco: null, 
      color: '',
      numeroPuertas: null,
      conductor: {
        nombre: '',
        telefono: ''
      }
    },
    espacio: {
      idEspacio: null
    },
    tarifa: {
      idTarifa: 1
    },
    estacionamiento: {
      id: 1 
    }
  };
  constructor() { }

  ngOnInit(): void {
    const id = +this._route.snapshot.paramMap.get('id')!;
    this.loadTicket(id);
  }


  loadTicket(id: number): void {
    this._estacionamientoService.getTicket(id).subscribe({
      next: (response) => {
        console.log('Datos del registro recibidos:', response);
        this.registro = response.data; // Acceso a los datos de ticket
      },
      error: (error) => {
        console.error('Error al cargar el registro:', error);
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'No se pudo cargar la tarifa',
        });
        this._router.navigate(['/estacionamiento/listaregistros']);
      }
    });
  }
  actualizarRegistro() {
    this._estacionamientoService.updateTicket(this.registro).subscribe(
      response => {
        console.log('Registro actualizado:', response);
        Swal.fire({
          title: "¡Muy bien!",
          text: "Registro actualizado exitosamente",
          icon: "success"
        });
        this._router.navigate(['/estacionamiento/listaregistros']);
      },
      error => {
        console.error('Error al actualizar el registro:', error);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "No se pudo actualizar el registro",
        });
      }
    );
  }
}
