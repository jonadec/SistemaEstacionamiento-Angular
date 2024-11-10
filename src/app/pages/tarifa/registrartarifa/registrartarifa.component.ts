import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { TarifaService } from '../../../services/tarifa.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-registrartarifa',
  standalone: true,
  imports: [RouterLink, FormsModule],
  templateUrl: './registrartarifa.component.html',
  styleUrl: './registrartarifa.component.css'
})
export class RegistrartarifaComponent {
  nuevaTarifa={
    costoHoraAutomovil: 0,
    costoHoraMotocicleta: 0
  }
  private _tarifaService=inject(TarifaService)
  private _router = inject(Router);

  onSubmit() {
    console.log('Datos enviados:', this.nuevaTarifa);
    this._tarifaService.registrarTarifa(this.nuevaTarifa).subscribe(response => {
      console.log('Tarifa registrada exitosamente:', response);
      Swal.fire({
        title: "¡Muy bien!",
        text: "Tarifa registrada exitosamente",
        icon: "success"
      });
      this._router.navigate(['/tarifa/obtenertarifa']);
    }, error => {
      console.error('Error registrando la tarifa:', error);
    });
  }
  
}
