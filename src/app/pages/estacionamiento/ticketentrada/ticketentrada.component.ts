import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import Swal from 'sweetalert2';
import { EstacionamientoService } from '../../../services/estacionamiento.service';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-ticketentrada',
  standalone: true,
  imports: [RouterLink, CommonModule, FormsModule],
  templateUrl: './ticketentrada.component.html',
  styleUrl: './ticketentrada.component.css'
})
export class TicketentradaComponent implements OnInit {
  private _estacionamientoService = inject(EstacionamientoService);
  private _router = inject(Router);
  private _route = inject(ActivatedRoute);
  ticket: any = {
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

  constructor() {
  }

  ngOnInit(): void {
    const id = +this._route.snapshot.paramMap.get('id')!;
    this.loadTicket(id);
  }

  loadTicket(id: number): void {
    this._estacionamientoService.getTicket(id).subscribe({
      next: (response) => {
        console.log('Datos del ticket recibidos:', response);
        this.ticket = response.data; // Acceso a los datos del ticket
      },
      error: (error) => {
        console.error('Error al cargar el ticket:', error);
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'No se pudo cargar el ticket',
        });
        this._router.navigate(['/estacionamiento/listaregistros']);
      }
    });
  }

}
