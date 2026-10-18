import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';

export interface ReservationConfirmationData {
  passengerName: string;
  flightNumber: string;
}

@Component({
  selector: 'app-confirm',
  imports: [MatButtonModule, MatDialogModule],
  templateUrl: './confirm.html',
  styleUrl: './confirm.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Confirm {
  readonly data = inject<ReservationConfirmationData | null>(MAT_DIALOG_DATA, {
    optional: true,
  });
  readonly dialogRef = inject<MatDialogRef<Confirm> | null>(MatDialogRef, {
    optional: true,
  });
}
