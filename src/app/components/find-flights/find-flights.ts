import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FlightRequest, FlightResponse } from '../../models/flight';
import { ReservationService } from '../../services/reservation-service';
import { Router } from '@angular/router';
import { DisplayFlights } from '../display-flights/display-flights';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-find-flights',
  imports: [ReactiveFormsModule, DisplayFlights, MatButtonModule],
  templateUrl: './find-flights.html',
  styleUrl: './find-flights.scss',
})
export class FindFlights implements OnInit {
  readonly router = inject(Router);
  readonly fb = inject(FormBuilder);
  readonly reservationService = inject(ReservationService);
  readonly destroy = inject(DestroyRef);

  readonly title = 'Find Flights';
  readonly description = 'Find flights between two cities';
  readonly buttonText = 'Search';
  readonly fromCityLabel = 'From City';
  readonly toCityLabel = 'To City';
  readonly departureDateLabel = 'Departure Date';
  findFlightsForm!: FormGroup;
  flights = signal<FlightResponse[]>([]);

  ngOnInit() {
    this.findFlightsForm = this.fb.group({
      arrivalCity: [''],
      departureCity: [''],
      dateOfDeparture: [''],
    });
  }

  onSubmit() {
    if (this.findFlightsForm.valid) {
      console.log('Form Data:', this.findFlightsForm.value);
      this.findFlights(this.findFlightsForm.value);
    } else {
      console.log('Form is invalid');
    }
  }

  private findFlights(formData: FlightRequest) {
    this.reservationService.findFlights(formData).subscribe({
      next: (response) => {
        console.log('Flights found:', response);
        // Handle the response, e.g., navigate to a results page or display the flights
        this.flights.set(response);
      },
      error: (error) => {
        console.error('Error finding flights:', error);
      },
    });
  }
}
