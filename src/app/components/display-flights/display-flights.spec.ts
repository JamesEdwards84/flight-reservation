import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayFlights } from './display-flights';

describe('DisplayFlights', () => {
  let component: DisplayFlights;
  let fixture: ComponentFixture<DisplayFlights>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DisplayFlights]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DisplayFlights);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display every flight field except the id', () => {
    fixture.componentRef.setInput('flights', [
      {
        id: 1,
        flightNumber: 'FL123',
        operatingAirlines: 'Example Air',
        departureCity: 'New York',
        arrivalCity: 'London',
        dateOfDeparture: '2026-10-17',
        estimatedTimeOfDeparture: '10:30',
      },
    ]);
    fixture.detectChanges();

    const element = fixture.nativeElement as HTMLElement;
    const headers = Array.from(element.querySelectorAll('th')).map((header) =>
      header.textContent?.trim(),
    );
    const cells = Array.from(element.querySelectorAll('tbody td')).map((cell) =>
      cell.textContent?.trim(),
    );

    expect(headers).toEqual([
      'Flight Number',
      'Operating Airlines',
      'Departure City',
      'Arrival City',
      'Date of Departure',
      'Estimated Time of Departure',
    ]);
    expect(cells).toEqual([
      'FL123',
      'Example Air',
      'New York',
      'London',
      '2026-10-17',
      '10:30',
    ]);
  });
});
