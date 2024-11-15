import { Routes } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ObtenertarifaComponent } from './pages/tarifa/obtenertarifa/obtenertarifa.component';
import { RegistrartarifaComponent } from './pages/tarifa/registrartarifa/registrartarifa.component';
import { ActualizartarifaComponent } from './pages/tarifa/actualizartarifa/actualizartarifa.component';
import { ListaregistrosComponent } from './pages/estacionamiento/listaregistros/listaregistros.component';
import { RegistrarentradaComponent } from './pages/estacionamiento/registrarentrada/registrarentrada.component';


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
        path: '**',
        redirectTo: 'estacionamiento/listaregistros',
        pathMatch: 'full'
    }
];
