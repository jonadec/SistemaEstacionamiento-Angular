import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import Swal from 'sweetalert2';
import { EstacionamientoService } from '../../../services/estacionamiento.service';
import { CommonModule, CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-ticketpagado',
  standalone: true,
  imports: [RouterLink, CurrencyPipe, CommonModule],
  templateUrl: './ticketpagado.component.html',
  styleUrl: './ticketpagado.component.css'
})
export class TicketpagadoComponent {
  private _estacionamientoService = inject(EstacionamientoService);
  private _route = inject(ActivatedRoute);
  private _router = inject(Router);

  ticket: any = {
    idTicket: null,
    entrada: '',
    salida: '',
    costoTotal: null,
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
      idEspacio: null,
    },
    tarifa: {
      idTarifa: 1,
    },
    estacionamiento: {
      id: 1
    }
  };

  constructor() {}

  ngOnInit(): void {
    const id = +this._route.snapshot.paramMap.get('id')!;
    this.loadTicket(id);
  }

  // Cargar ticket desde la API
  loadTicket(id: number): void {
    this._estacionamientoService.getTicket(id).subscribe({
      next: (response) => {
        console.log('Datos del ticket recibidos:', response);
        this.ticket = response.data; // Cargar datos directamente
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

  // Función para imprimir el ticket
  imprimirTicket(): void {
    window.print(); // Llama a la función de impresión del navegador
  }
}
