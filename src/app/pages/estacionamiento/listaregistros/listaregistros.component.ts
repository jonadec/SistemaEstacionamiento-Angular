import { Component, inject, Input } from '@angular/core';
import { EstacionamientoService } from '../../../services/estacionamiento.service';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-listaregistros',
  standalone: true,
  imports: [RouterLink, CommonModule, NgxPaginationModule],
  templateUrl: './listaregistros.component.html',
  styleUrl: './listaregistros.component.css'
})
export class ListaregistrosComponent {
  @Input() ticket:any = {};
  tickets:any[]=[];
  page: number = 1;

  trackByTicketId(index: number, ticket: any): number {
    return ticket.idTicket;
  }
  private _estacionamientoService=inject(EstacionamientoService);
  constructor() {
    this.getTickets();
  }

  getTickets() {
    // Carga todos los registros desde el servicio
    this._estacionamientoService.getTickets().subscribe((data: any) => {
      // this.tickets = data;
      this.tickets = data.filter((ticket: any) => !ticket.salida);
      console.log(this.tickets);
    });
  }

  onDeleteTicket(idTicket: number) {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "Esta acción eliminará el registro.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        this._estacionamientoService.deleteTicketById(idTicket).subscribe({
          next: () => {
            Swal.fire({
              title: "¡Eliminado!",
              text: "El registro ha sido eliminada.",
              icon: "success",
            });
            this.getTickets();
          },
          error: () => {
            Swal.fire({
              icon: "error",
              title: "Error",
              text: "No se pudo eliminar el registro",
            });
          }
        });
      }
    });
  }
  
}
