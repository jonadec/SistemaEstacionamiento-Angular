import { Component, inject, Input } from '@angular/core';
import { EstacionamientoService } from '../../../services/estacionamiento.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-listaregistros',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './listaregistros.component.html',
  styleUrl: './listaregistros.component.css'
})
export class ListaregistrosComponent {
  @Input() ticket:any = {};
  tickets:any[]=[];
  private _estacionamientoService=inject(EstacionamientoService)
  constructor() {
    this.getTickets();
  }

  getTickets() {
    // Carga todos los registros desde el servicio
    this._estacionamientoService.getTickets().subscribe((data: any) => {
      this.tickets = data;
      console.log(this.tickets);
    });
  }
  
}
