import { Component } from '@angular/core';
import { SpinnerService } from '../pages/service/spinner.service';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-spinner',
  standalone:false,
  template: `
    <div *ngIf="spinner$ | async" class="overlay">
      <p-progressSpinner styleClass="my-spinner" [strokeWidth]="'8'"></p-progressSpinner>
    </div>
  `,
  styles: [`
    .overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.5);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 1150;
    }
  `]
})
export class SpinnerComponent {
    spinner$: Observable<boolean>;

    constructor(private spinnerService: SpinnerService) {
      this.spinner$ = this.spinnerService.spinner$;
    }

}
