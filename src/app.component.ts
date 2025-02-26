import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SpinnerModule } from "./app/shared/spinner.module";
import { CookieService } from 'ngx-cookie-service';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [RouterModule, SpinnerModule],
    template: `<router-outlet></router-outlet>
    <app-spinner></app-spinner>`,
    providers:[CookieService]
})
export class AppComponent {}
