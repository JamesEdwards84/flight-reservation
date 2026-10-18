import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FindFlights } from './find-flights';

describe('FindFlights', () => {
  let component: FindFlights;
  let fixture: ComponentFixture<FindFlights>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FindFlights]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FindFlights);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
