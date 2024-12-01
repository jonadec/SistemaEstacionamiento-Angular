import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
const APIURL='https://powerful-spire-52656-e4f5afd298e9.herokuapp.com/api/v1/';
@Injectable({
  providedIn: 'root'
})
export class TarifaService {
  private _http=inject(HttpClient);
  constructor() { }
  getTarifas(){
    return this._http.get(APIURL+'tarifa/registros')
  }
  getTarifaById(id: number) {
    return this._http.get<any>(`${APIURL}tarifa/${id}`); 
}
  
  registrarTarifa(tarifa: any) {
    return this._http.post(APIURL+'tarifa/registro',tarifa)
  }
  updateTarifa(tarifa: any) {
    return this._http.put(APIURL + `tarifa/${tarifa.idTarifa}/actualizar`, tarifa);
  }
  deleteTarifa(Tarifa:any){
    return this._http.delete(APIURL + `tarifa/${Tarifa.idTarifa}/borrar`, Tarifa);
  }
  deleteTarifaPorId(id: number) {
    return this._http.delete(`${APIURL}tarifa/${id}/borrar`);
  }
  
}
