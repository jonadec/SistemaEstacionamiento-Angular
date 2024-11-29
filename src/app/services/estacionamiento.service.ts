import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
const APIURL='http://localhost:8081/api/v1/';

@Injectable({
  providedIn: 'root'
})
export class EstacionamientoService {
  private _http=inject(HttpClient);
  constructor() { }
  getTickets(){
    return this._http.get(APIURL+'ticket/registros')
  }
  getTicket(id:any){
    return this._http.get<any>(`${APIURL}ticket/${id}`); 
  }
  updateTicket(ticket:any){
    return this._http.put(APIURL + `ticket/${ticket.idTicket}/actualizar`, ticket);
  }
  newTicket(ticket:any){
    return this._http.post(APIURL+'ticket/registro',ticket)
  }
  deleteTicketById(id: number) {
    return this._http.delete(`${APIURL}ticket/${id}/borrar`);
  }
}
