import { Component, inject, input } from '@angular/core';
import { FlightResponse } from '../../models/flight';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';

@Component({
  selector: 'app-display-flights',
  templateUrl: './display-flights.html',
  styleUrl: './display-flights.scss',
  imports: [MatButtonModule],
})
export class DisplayFlights {
  readonly router = inject(Router);
  readonly flights = input<FlightResponse[]>([]);

  bookFlight(flight: FlightResponse) {
    // Navigate to the passenger details page with the selected flight ID
    this.router.navigate(['/passenger-details', flight.id]);
  }
}
