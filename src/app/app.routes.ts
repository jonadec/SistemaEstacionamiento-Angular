import { Routes } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ObtenertarifaComponent } from './pages/tarifa/obtenertarifa/obtenertarifa.component';
import { RegistrartarifaComponent } from './pages/tarifa/registrartarifa/registrartarifa.component';
import { ActualizartarifaComponent } from './pages/tarifa/actualizartarifa/actualizartarifa.component';
import { ListaregistrosComponent } from './pages/estacionamiento/listaregistros/listaregistros.component';
import { RegistrarentradaComponent } from './pages/estacionamiento/registrarentrada/registrarentrada.component';
import { ActualizarregistroComponent } from './pages/estacionamiento/actualizarregistro/actualizarregistro.component';
import { TicketentradaComponent } from './pages/estacionamiento/ticketentrada/ticketentrada.component';
import { TicketsalidaComponent } from './pages/estacionamiento/ticketsalida/ticketsalida.component';
import { RegistrospasadosComponent } from './pages/estacionamiento/registrospasados/registrospasados.component';
import { tick } from '@angular/core/testing';
import { TicketpagadoComponent } from './pages/estacionamiento/ticketpagado/ticketpagado.component';


export const routes: Routes = [
    {
        path: 'navbar',
        component: NavbarComponent
    },
    {
        path:'tarifa/obtenertarifa',
        component:ObtenertarifaComponent
    },
    {
        path: 'tarifa/registrartarifa',
        component:RegistrartarifaComponent
    },
    {
        path:'tarifa/actualizartarifa',
        component:ActualizartarifaComponent
    },
    { path: 'tarifa/actualizartarifa/:id', 
        component: ActualizartarifaComponent
    },
    {
        path:'estacionamiento/listaregistros',
        component:ListaregistrosComponent
    },
    {
        path:'estacionamiento/registrarentrada',
        component:RegistrarentradaComponent
    },
    {
        path:'estacionamiento/actualizarregistro/:id',
        component:ActualizarregistroComponent
    },
    {
        path:'estacionamiento/ticketentrada/:id',
        component:TicketentradaComponent
    },
    {
        path:'estacionamiento/ticketsalida/:id',
        component:TicketsalidaComponent
    },
    {
        path: 'estacionamiento/registrospasados',
        component: RegistrospasadosComponent
    },
    {
        path: 'estacionamiento/ticketpagado/:id',   
        component:TicketpagadoComponent
    },
    {
        path: '**',
        redirectTo: 'estacionamiento/listaregistros',
        pathMatch: 'full'
    }
];
