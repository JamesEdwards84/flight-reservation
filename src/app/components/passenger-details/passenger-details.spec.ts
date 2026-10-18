import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, convertToParamMap, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { of } from 'rxjs';
import { FlightResponse } from '../../models/flight';
import { ReservationService } from '../../services/reservation-service';
import { PassengerDetails } from './passenger-details';
import { Confirm } from '../confirm/confirm';

describe('PassengerDetails', () => {
  let component: PassengerDetails;
  let fixture: ComponentFixture<PassengerDetails>;

  const flight: FlightResponse = {
    id: 42,
    flightNumber: 'AB123',
    operatingAirlines: 'Example Air',
    departureCity: 'London',
    arrivalCity: 'Paris',
    dateOfDeparture: '2026-11-01',
    estimatedTimeOfDeparture: '09:30',
  };
  const reservationService = {
    getFlights: vi.fn(() => of(flight)),
    saveReservation: vi.fn(() => of({})),
  };
  const dialog = {
    open: vi.fn(() => ({ afterClosed: () => of(true) })),
  };
  const router = {
    navigate: vi.fn(() => Promise.resolve(true)),
  };

  beforeEach(async () => {
    vi.clearAllMocks();
    dialog.open.mockImplementation(() => ({ afterClosed: () => of(true) }));
    await TestBed.configureTestingModule({
      imports: [PassengerDetails],
      providers: [
        { provide: ActivatedRoute, useValue: { snapshot: { paramMap: convertToParamMap({ id: '42' }) } } },
        { provide: MatDialog, useValue: dialog },
        { provide: ReservationService, useValue: reservationService },
        { provide: Router, useValue: router },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(PassengerDetails);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('loads and displays the flight before the passenger form', () => {
    const flightSummary = fixture.nativeElement.querySelector('.flight-summary') as HTMLElement;
    const form = fixture.nativeElement.querySelector('form') as HTMLElement;

    expect(reservationService.getFlights).toHaveBeenCalledWith(42);
    expect(flightSummary.textContent).toContain('AB123');
    expect(flightSummary.compareDocumentPosition(form) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
  });

  it('returns to the find flights page from the back button', () => {
    const backButton = fixture.nativeElement.querySelector('button[aria-label="Back to find flights"]') as HTMLButtonElement;

    backButton.click();

    expect(router.navigate).toHaveBeenCalledWith(['/flight']);
  });

  it('requires first name, last name, email, and phone', () => {
    expect(component.passengerForm.invalid).toBe(true);

    component.passengerForm.setValue({
      firstName: 'Alex',
      middleName: '',
      lastName: 'Smith',
      email: 'invalid-email',
      phone: '555-0100',
    });

    expect(component.passengerForm.controls.email.hasError('email')).toBe(true);
    expect(component.passengerForm.invalid).toBe(true);
  });

  it('asks for confirmation before saving the reservation', () => {
    component.passengerForm.setValue({
      firstName: 'Alex',
      middleName: 'Jordan',
      lastName: 'Smith',
      email: 'alex@example.com',
      phone: '555-0100',
    });

    component.onSubmit();

    expect(dialog.open).toHaveBeenCalledWith(Confirm, {
      data: { passengerName: 'Alex Jordan Smith', flightNumber: 'AB123' },
    });
    expect(reservationService.saveReservation).toHaveBeenCalledWith({
      flightNumber: 'AB123',
      firstName: 'Alex',
      middleName: 'Jordan',
      lastName: 'Smith',
      email: 'alex@example.com',
      phone: '555-0100',
    });
    expect(router.navigate).toHaveBeenCalledWith(['/confirm', 42]);
  });

  it('does not save the reservation when confirmation is cancelled', () => {
    dialog.open.mockReturnValue({ afterClosed: () => of(false) });
    component.passengerForm.setValue({
      firstName: 'Alex',
      middleName: '',
      lastName: 'Smith',
      email: 'alex@example.com',
      phone: '555-0100',
    });

    component.onSubmit();

    expect(reservationService.saveReservation).not.toHaveBeenCalled();
    expect(router.navigate).not.toHaveBeenCalled();
  });
});
