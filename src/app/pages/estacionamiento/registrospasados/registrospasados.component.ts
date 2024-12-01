import { Component, inject } from '@angular/core';
import { EstacionamientoService } from '../../../services/estacionamiento.service';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-registrospasados',
  standalone: true,
  imports: [RouterLink, CommonModule, NgxPaginationModule],
  templateUrl: './registrospasados.component.html',
  styleUrl: './registrospasados.component.css'
})
export class RegistrospasadosComponent {
  tickets: any[] = [];
  page: number = 1;

  private _estacionamientoService = inject(EstacionamientoService);

  constructor() {
    this.getTickets();
  }

  trackByTicketId(index: number, ticket: any): number {
    return ticket.idTicket;
  }

  getTickets() {
    // Cargar registros con hora de salida
    this._estacionamientoService.getTickets().subscribe((data: any) => {
      // Filtrar tickets que tienen salida definida
      this.tickets = data.filter((ticket: any) => ticket.salida);
      console.log('Tickets con salida:', this.tickets);
    });
  }

  onDeleteTicket(idTicket: number) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esta acción eliminará el registro.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this._estacionamientoService.deleteTicketById(idTicket).subscribe({
          next: () => {
            Swal.fire({
              title: '¡Eliminado!',
              text: 'El registro ha sido eliminado.',
              icon: 'success',
            });
            this.getTickets(); // Actualizar la lista después de eliminar
          },
          error: () => {
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'No se pudo eliminar el registro',
            });
          },
        });
      }
    });
  }
}
