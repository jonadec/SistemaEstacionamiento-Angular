import { Component, inject, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { EstacionamientoService } from '../../../services/estacionamiento.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CommonModule, CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-ticketsalida',
  standalone: true,
  imports: [RouterLink, CurrencyPipe, CommonModule],
  templateUrl: './ticketsalida.component.html',
  styleUrl: './ticketsalida.component.css'
})
export class TicketsalidaComponent implements OnInit {
  private _estacionamientoService = inject(EstacionamientoService);
  private _route = inject(ActivatedRoute);
  private _router = inject(Router);

  ticket: any = {
    idTicket: null,
    entrada: '',
    salida: '',
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
      idTarifa: 1,
    },
    estacionamiento: {
      id: 1 
    }
  };
  costoTotal: number = 0;

  constructor() { }

  ngOnInit(): void {
    const id = +this._route.snapshot.paramMap.get('idTicket')!;
    this.loadTicket(id);
  }

  // Cargar ticket de entrada
  loadTicket(id: number): void {
    this._estacionamientoService.getTicket(id).subscribe({
      next: (response) => {
        console.log('Datos del ticket recibidos:', response);
        this.ticket = response.data;
        this.calcularCosto();  // Calcular el costo total al cargar el ticket
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

  // Calcular costo total (diferencia de horas * costo por hora)
  calcularCosto(): void {
    const horaEntrada = new Date(this.ticket.entrada);
    const horaSalida = new Date();  // La hora actual es la hora de salida
    this.ticket.salida = horaSalida.toISOString();  // Actualizamos la hora de salida
    const tiempoEstacionado = (horaSalida.getTime() - horaEntrada.getTime()) / (1000 * 3600);
    if(this.ticket.vehiculo.tipo === 'Motocicleta' ) {
      this.costoTotal = tiempoEstacionado * this.ticket.tarifa.costoHoraMotocicleta;
    } 
    else if(this.ticket.vehiculo.tipo === 'Automovil') {
      this.costoTotal = tiempoEstacionado * this.ticket.tarifa.costoHoraAutomovil;
    } 
  }

  // Registrar la salida del vehículo
  registrarSalida(): void {
    this._estacionamientoService.updateTicket(this.ticket).subscribe({
      next: (response) => {
        Swal.fire({
          title: 'Ticket de salida registrado',
          text: 'Gracias por usar nuestros servicios',
          icon: 'success',
        });
        this._router.navigate(['/estacionamiento/listaregistros']);
      },
      error: (error) => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Error al registrar la salida',
        });
      }
    });
  }

  // Función para imprimir el ticket
  imprimirTicket(): void {
    window.print();  // Llama a la función de impresión del navegador
  }

}
