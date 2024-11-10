import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { TarifaService } from '../../../services/tarifa.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-actualizartarifa',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './actualizartarifa.component.html',
  styleUrls: ['./actualizartarifa.component.css']
})
export class ActualizartarifaComponent implements OnInit {
  tarifa = {
    idTarifa: null,
    costoHoraAutomovil: null,
    costoHoraMotocicleta: null
  };

  private _tarifaService = inject(TarifaService);
  private _router = inject(Router);
  private _route = inject(ActivatedRoute);

  constructor() {}

  ngOnInit(): void {
    const id = +this._route.snapshot.paramMap.get('id')!;
    this.loadTarifa(id);
  }

  loadTarifa(id: number): void {
    this._tarifaService.getTarifaById(id).subscribe({
      next: (response) => {
        console.log('Datos de la tarifa recibidos:', response);
        this.tarifa = response.data; // Acceso a los datos de tarifa
      },
      error: (error) => {
        console.error('Error al cargar la tarifa:', error);
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'No se pudo cargar la tarifa',
        });
        this._router.navigate(['/tarifa/obtenertarifa']);
      }
    });
  }

  onSubmit() {
    this._tarifaService.updateTarifa(this.tarifa).subscribe(
      response => {
        console.log('Tarifa actualizada:', response);
        Swal.fire({
          title: "¡Muy bien!",
          text: "Tarifa actualizada exitosamente",
          icon: "success"
        });
        this._router.navigate(['/tarifa/obtenertarifa']);
      },
      error => {
        console.error('Error al actualizar la tarifa:', error);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "No se pudo actualizar la tarifa",
        });
      }
    );
  }
}
