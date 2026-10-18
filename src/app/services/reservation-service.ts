import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { FlightRequest, FlightResponse } from '../models/flight';
import { ReservationRequest } from '../models/reservation';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ReservationService {
  readonly http = inject(HttpClient);

  getFlight(id: number): Observable<FlightResponse> {
    return this.http.get<FlightResponse>(`${environment.flightsUrl}/${id}`);
  }

  findFlights(data: FlightRequest): Observable<FlightResponse[]> {
    return this.http.post<FlightResponse[]>(environment.findFlightsUrl, data);
  }

  saveReservation(data: ReservationRequest): Observable<unknown> {
    return this.http.post(environment.saveReservationUrl, data);
  }

}
