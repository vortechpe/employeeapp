import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { RippleModule } from 'primeng/ripple';
import { AuthService } from '../service/auth.service';
import { SpinnerService } from '../service/spinner.service';
import { CommonModule } from '@angular/common';
import { ToastModule } from 'primeng/toast';

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [ButtonModule,ReactiveFormsModule,CommonModule, CheckboxModule, InputTextModule, PasswordModule, FormsModule, RouterModule, RippleModule],
    templateUrl: './login.component.html',
})
export class Login {
    username:string="";

    password: string = '';

    valCheck: string[] = ['remember'];
    loginError: string = '';
    objectForm!: FormGroup;

    constructor(private authService : AuthService, private fb: FormBuilder,private router:Router, private spinnerService: SpinnerService){}

    ngOnInit(): void {
        this.objectForm = this.fb.group({
          password: ['', [Validators.required]],
          username: ['', [Validators.required]],
          rememberMe:[false]
        });
        this.username = localStorage.getItem('username') ?? '';
        debugger;
        if(this.username != ""){
            this.objectForm.get('username')?.setValue(this.username);
        }
      }
    auth(){

        if (!this.objectForm.valid) {
            this.objectForm.markAllAsTouched();
            this.spinnerService.hide();
            return;
        }
        this.spinnerService.show();
        this.authService.auth(this.objectForm.value).subscribe(
            (response) => {
              // Si el login es exitoso, el backend debería haber enviado los tokens
              this.spinnerService.hide();
              this.rememeberUser();
              this.router.navigate(['/pages/crud']);  // Redirige al usuario a la página principal, por ejemplo
            },
            (error) => {

              // Si ocurre un error (login incorrecto, por ejemplo)
              this.spinnerService.hide();
              this.loginError = 'Credenciales inválidas. Por favor, intente nuevamente.';
              console.error('Error en el login', error);
            }
          );

    }
    rememeberUser(){
        this.username=  this.objectForm.get('username')?.value; // Almacena el valor en la variable
        localStorage.setItem('username',this.username)
    }
}
