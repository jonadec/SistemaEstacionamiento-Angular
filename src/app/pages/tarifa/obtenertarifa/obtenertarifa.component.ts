import { Component, inject, Input } from '@angular/core';
import { TarifaService } from '../../../services/tarifa.service';
import { RouterLink } from '@angular/router';
import { CurrencyPipe } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-obtenertarifa',
  standalone: true,
  imports: [RouterLink, CurrencyPipe],
  templateUrl: './obtenertarifa.component.html',
  styleUrl: './obtenertarifa.component.css'
})
export class ObtenertarifaComponent {
  @Input() tarifa:any = {};
  tarifas:any[]=[];
  private _tarifaService=inject(TarifaService)
  constructor() {
    this.getTarifas();
  }
  getTarifas() {
    // Carga todas las tarifas desde el servicio
    this._tarifaService.getTarifas().subscribe((data: any) => {
      this.tarifas = data;
      console.log(this.tarifas);
    });
  }
  onDeleteTarifa(idTarifa: number) {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "Esta acción eliminará la tarifa.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        this._tarifaService.deleteTarifaPorId(idTarifa).subscribe({
          next: () => {
            Swal.fire({
              title: "¡Eliminado!",
              text: "La tarifa ha sido eliminada.",
              icon: "success",
            });
            this.getTarifas();
          },
          error: () => {
            Swal.fire({
              icon: "error",
              title: "Error",
              text: "No se pudo eliminar la tarifa",
            });
          }
        });
      }
    });
  }
}
