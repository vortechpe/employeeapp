import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProgressSpinnerModule } from 'primeng/progressspinner'; // Si usas PrimeNG
import { SpinnerComponent } from './spinner.component';

@NgModule({
  declarations: [SpinnerComponent],
  imports: [
    CommonModule, // Necesario para el pipe async
    ProgressSpinnerModule // Para usar p-progressSpinner
  ],
  exports: [SpinnerComponent], // Para poder usarlo en otros módulos
})
export class SpinnerModule {}
