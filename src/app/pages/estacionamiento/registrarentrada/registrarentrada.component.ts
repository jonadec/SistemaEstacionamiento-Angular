import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { EstacionamientoService } from '../../../services/estacionamiento.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registrarentrada',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './registrarentrada.component.html',
  styleUrl: './registrarentrada.component.css'
})
export class RegistrarentradaComponent {
  tipoVehiculo: string = 'automovil';
  private _registroService=inject(EstacionamientoService);
  private _router = inject(Router);

  registro = {
    modelo: '',
    placa: '',
    color: '',
    numPuertas: null,
    tieneCasco: null,
    nombreConductor: '',
    telefonoConductor: '',
    numEspacio: null,
    entrada: ''
  };

  onTipoVehiculoChange() {
    if (this.tipoVehiculo === 'automovil') {
      this.registro.numPuertas = null;
      this.registro.tieneCasco = null;
    } else {
      this.registro.tieneCasco = null;
      this.registro.numPuertas = null;
    }
  }

  onSubmit() {
    this.registro.entrada = new Date().toISOString();
    this._registroService.newTicket(this.registro).subscribe(response => {
    console.log('Registro de entrada:', this.registro);
    Swal.fire({
      title: "¡Registro Exitoso!",
      text: "Se ha registrado la entrada del vehículo correctamente.",
      icon: "success"
    });
    this._router.navigate(['/estacionammiento/listaregistros']);
  }, error => {
    console.error('Error registrando la tarifa:', error);
    Swal.fire({
      title: "¡Error!",
      text: "Ha ocurrido un error al registrar la entrada del vehículo.",
      icon: "error"
  });
});
}
}