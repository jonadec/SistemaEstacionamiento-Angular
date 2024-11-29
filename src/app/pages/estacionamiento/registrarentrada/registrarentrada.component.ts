import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { EstacionamientoService } from '../../../services/estacionamiento.service';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-registrarentrada',
  standalone: true,
  imports: [FormsModule, RouterLink, CommonModule],
  templateUrl: './registrarentrada.component.html',
  styleUrl: './registrarentrada.component.css'
})
export class RegistrarentradaComponent {
  tipoVehiculo: string = 'Automovil';
  private _registroService=inject(EstacionamientoService);
  private _router = inject(Router);

  registro = {
    entrada: '', // Se asignará en el `onSubmit` o al inicializar
    vehiculo: {
      placa: '',
      tipo: this.tipoVehiculo, // "Automóvil" o "Motocicleta"
      modelo: '',
      tieneCasco: null, // true o false, según el tipo de vehículo
      color: '',
      numeroPuertas: null, // Solo para automóviles
      conductor: {
        nombre: '',
        telefono: ''
      }
    },
    espacio: {
      idEspacio: null,
      "numero": null,
      "tipo": "",
      "disponible": true
    },
    tarifa: {
      idTarifa: 1
    },
    estacionamiento: {
      id: 1 
    }
  };
  espaciosDisponibles: any[] = []; // Lista de espacios disponibles

  ngOnInit() {
    this.cargarEspacios();
  }

  cargarEspacios() {
    this._registroService.getEspacios().subscribe(
      (espacios) => {
        // Filtrar espacios disponibles
        if (Array.isArray(espacios)) {
          this.espaciosDisponibles = espacios.filter((espacio: any) => espacio.disponible);
        } else {
          console.error('Error: espacios no es un arreglo', espacios);
        }
      },
      (error) => {
        console.error('Error cargando los espacios:', error);
      }
    );
  }
  
  onTipoVehiculoChange() {
    if (this.tipoVehiculo === 'automovil') {
      this.registro.vehiculo.numeroPuertas = null;
      this.registro.vehiculo.tieneCasco = null;
    } else {
      this.registro.vehiculo.tieneCasco = null;
      this.registro.vehiculo.numeroPuertas = null;
    }
  }

  onSubmit() {
    this.registro.entrada = new Date().toISOString(); // Asignar la fecha actual en formato ISO
  
    // Llamada al servicio para enviar los datos a la API
    this._registroService.newTicket(this.registro).subscribe(
      response => {
        console.log('Registro de entrada:', this.registro);
        Swal.fire({
          title: "¡Registro Exitoso!",
          text: "Se ha registrado la entrada del vehículo correctamente.",
          icon: "success"
        });
        this._router.navigate(['/estacionamiento/listaregistros']);
      },
      error => {
        console.error('Error registrando la entrada:', error);
        Swal.fire({
          title: "¡Error!",
          text: "Ha ocurrido un error al registrar la entrada del vehículo.",
          icon: "error"
        });
      }
    );
  }
  
}