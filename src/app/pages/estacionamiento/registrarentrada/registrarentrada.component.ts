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
    entrada: '', 
    vehiculo: {
      placa: '',
      tipo: this.tipoVehiculo,
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
      idEspacio: 0,
      numero: null,
      tipo: "",
      disponible: true
    },
    tarifa: {
      idTarifa: 1
    },
    estacionamiento: {
      id: 1 
    }
  };
  espaciosDisponibles: any[] = []; 

  ngOnInit() {
    this.cargarEspacios();
  }

  cargarEspacios() {
    this._registroService.getEspacios().subscribe(
      (espacios) => {
        if (Array.isArray(espacios)) {
          this.espaciosDisponibles = espacios.filter((espacio: any) => espacio.disponible);
        } 
        else {
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
     const horaEntrada= new Date();
     this.registro.entrada = horaEntrada.toISOString(); 
    this._registroService.newTicket(this.registro).subscribe(
      response => {
        console.log('Registro de entrada:', this.registro);
        this.actualizarEstadoEspacio(this.registro.espacio.idEspacio);
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
  actualizarEstadoEspacio(idEspacio: number) {
    const espacioSeleccionado = this.espaciosDisponibles.find(e => e.idEspacio === idEspacio);
  
    if (!espacioSeleccionado) {
      console.error(`Espacio con id ${idEspacio} no encontrado en la lista.`);
      return;
    }
  
    const espacioActualizado = { 
      ...espacioSeleccionado, 
      disponible: false 
    };
  
    console.log('Espacio que se enviará al backend:', espacioActualizado);
  
    this._registroService.updateEspacio(idEspacio, espacioActualizado).subscribe(
      (response) => {
        console.log('Espacio actualizado correctamente:', response);
      },
      (error) => {
        console.error('Error actualizando el estado del espacio:', error);
      }
    );
  }
  

  
}