import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute, Router } from '@angular/router';
import { ReservationRequest } from '../../models/reservation';
import { FlightResponse } from '../../models/flight';
import { ReservationService } from '../../services/reservation-service';
import { Confirm, ReservationConfirmationData } from '../confirm/confirm';

@Component({
  selector: 'app-passenger-details',
  imports: [
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    ReactiveFormsModule,
  ],
  templateUrl: './passenger-details.html',
  styleUrl: './passenger-details.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PassengerDetails implements OnInit {
  private readonly formBuilder = inject(FormBuilder);
  private readonly route = inject(ActivatedRoute);
  private readonly reservationService = inject(ReservationService);
  private readonly dialog = inject(MatDialog);
  private readonly router = inject(Router);

  readonly flight = signal<FlightResponse | null>(null);
  readonly isLoadingFlight = signal(true);
  readonly isSubmitting = signal(false);
  readonly errorMessage = signal('');

  readonly passengerForm = this.formBuilder.nonNullable.group({
    firstName: ['', Validators.required],
    middleName: [''],
    lastName: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', Validators.required],
  });

  ngOnInit(): void {
    const flightId = Number(this.route.snapshot.paramMap.get('id'));
    if (!Number.isInteger(flightId) || flightId <= 0) {
      this.errorMessage.set('The selected flight could not be identified.');
      this.isLoadingFlight.set(false);
      return;
    }

    this.getFlight(flightId);
  }

  returnToFlightSearch(): void {
    void this.router.navigate(['/flight']);
  }

  private getFlight(flightId: number) {
    this.reservationService.getFlight(flightId).subscribe({
      next: (flight) => {
        this.flight.set(flight);
        this.isLoadingFlight.set(false);
      },
      error: () => {
        this.errorMessage.set('Unable to load the selected flight. Please try again.');
        this.isLoadingFlight.set(false);
      },
    });
  }

  onSubmit(): void {
    if (this.passengerForm.invalid || this.isSubmitting()) {
      this.passengerForm.markAllAsTouched();
      return;
    }

    const flight = this.flight();
    if (!flight) {
      this.errorMessage.set('Flight details are unavailable. Please try again.');
      return;
    }

    const passenger = this.passengerForm.getRawValue();
    const passengerName = [passenger.firstName, passenger.middleName, passenger.lastName]
      .filter((name) => name.trim().length > 0)
      .join(' ');

    this.dialog.open<Confirm, ReservationConfirmationData, boolean>(
        Confirm,
        { data: { passengerName, flightNumber: flight.flightNumber } },
      )
      .afterClosed()
      .subscribe((confirmed) => {
        if (confirmed) {
          this.saveReservation(
            {
              flightNumber: flight.flightNumber,
              ...passenger,
            },
            flight.id,
          );
        }
      });
  }

  private saveReservation(request: ReservationRequest, flightId: number): void {
    this.isSubmitting.set(true);
    this.errorMessage.set('');

    this.reservationService.saveReservation(request).subscribe({
      next: () => {
        void this.router.navigate(['/confirm', flightId]);
      },
      error: () => {
        this.isSubmitting.set(false);
        this.errorMessage.set('Unable to save your reservation. Please try again.');
      },
    });
  }
}
