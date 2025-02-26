import { Component, OnInit, signal, ViewChild } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Table, TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { RatingModule } from 'primeng/rating';
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';
import { SelectModule } from 'primeng/select';
import { RadioButtonModule } from 'primeng/radiobutton';
import { InputNumberModule } from 'primeng/inputnumber';
import { DialogModule } from 'primeng/dialog';
import { TagModule } from 'primeng/tag';
import { InputIconModule } from 'primeng/inputicon';
import { IconFieldModule } from 'primeng/iconfield';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { EmployeeService } from '../service/employee.service';
import { Employee } from '../../models/employee';
import { SpinnerService } from '../service/spinner.service';
import { DatePickerModule } from 'primeng/datepicker';
import { forkJoin } from 'rxjs';
import { MasterService } from '../service/master.service';
import { DropdownModule } from 'primeng/dropdown';
import { MultiSelectModule } from 'primeng/multiselect';



@Component({
    selector: 'app-crud',
    imports: [
        CommonModule,
        TableModule,
        FormsModule,
        ButtonModule,
        RippleModule,
        ToastModule,
        ReactiveFormsModule,
        DatePickerModule,
        DropdownModule,
        MultiSelectModule,
        ToolbarModule,
        RatingModule,
        DialogModule,
        InputTextModule,
        TextareaModule,
        SelectModule,
        RadioButtonModule,
        InputNumberModule,
        DialogModule,
        TagModule,
        InputIconModule,
        IconFieldModule,
        ConfirmDialogModule,
        InputNumberModule
    ],
    templateUrl:'./crud.component.html',
    providers: [MessageService,  ConfirmationService]
})
export class Crud implements OnInit {
    objectDialog: boolean = false;
    edit:boolean =false;

    title:string ="Guardar Empleado"
    employees : Employee[]= [];
    totalRecords: number = 0;
    employee!: Employee;
    globalFilter:string="";
    Id?:number;
    submitted: boolean = false;
    afps:any;
    positions:any;
    statuses!: any[];

    @ViewChild('dt') dt!: Table;



    objectForm!: FormGroup;
    constructor(
        private employeeService : EmployeeService,
        private masterService : MasterService,
        private messageService: MessageService,
        private confirmationService: ConfirmationService,
        private spinnerService: SpinnerService,
        private fb: FormBuilder
    ) {}

    exportCSV() {
        this.dt.exportCSV();
    }

    ngOnInit() {
        this.createForm();
        this.loadMaster();
        this.loadEmployeeLazy({ first: 0, rows: 5 });
    }
    createForm(){
        this.objectForm = this.fb.group({
            employeeId: [null],
            firstName: ['',[Validators.required]],
            lastName: ['',[Validators.required]],
            documentoNumber: ['',[Validators.required]],
            dateOfBirth: ['',[Validators.required]],
            hireDate: ['',[Validators.required]],
            salary: ['', [Validators.required, Validators.max(999999)]],
            position: [''],
            afp: [''],
            positionId: ['',[Validators.required]],
            afpId: ['',[Validators.required]],
        });
    }

    loadMaster(){
        forkJoin({
            afps: this.masterService.getAfp(),
            anotherData: this.masterService.getPosition	()
          }).subscribe({
            next: ({ afps, anotherData }) => {
              this.afps = afps;
              this.positions = anotherData;
            },
            error: (error) => console.error('Error cargando datos', error)
          });
    }

    getEmployee(event:any){
        this.edit = true;
        this.employeeService.getEmployee(event).subscribe(data => {
            this.objectForm.patchValue({
                employeeId: data.employeeId,
                firstName: data.firstName,
                lastName: data.lastName,
                documentoNumber: data.documentoNumber,
                dateOfBirth: new Date(data.dateOfBirth),
                hireDate: new Date(data.hireDate),
                salary: data.salary,
                afpId: data.afpId,
                positionId: data.positionId
              });
              this.objectDialog = true;
              this.title= "Editar Empleado"
              console.log(this.objectForm.value)
        }, error =>{
            this.spinnerService.hide();
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Hubo un error en el sistema', life: 3000 });
        },() =>{})
    }
    loadEmployeeLazy(event: any) {
        this.spinnerService.show();
        const page = (event.first / event.rows ) + 1;
        this.employeeService.getEmployees(this.globalFilter,page, event.rows).subscribe(data => {
            this.employees =data.items;
            this.totalRecords = data.totalCount;
            this.spinnerService.hide();
        }, error =>{
            this.spinnerService.hide();
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Hubo un error en el sistema', life: 3000 });
        },
        ()=>{
            this.spinnerService.hide();

        });
    }
    onGlobalFilter(event: any) {

        this.globalFilter = event.target.value;  // Actualiza el término de búsqueda
        this.loadEmployeeLazy({ first: 0, rows: 5 });
        // this.loadEmployeeLazy({ first: 0, rows: 15 });  // Reinicia la carga de datos con el nuevo filtro
    }

    openNew() {
        this.title ="Guardar Empleado"
        this.edit = false;
        this.employee = {};
        this.submitted = false;
        this.objectDialog = true;
        this.objectForm.reset();
    }

    editProduct(employee: Employee) {
        this.employee = { ...employee };
        this.objectDialog = true;
    }

    deleteEmployee() {
        this.confirmationService.confirm({
            message: 'Estás seguro de eliminar al empleado?',
            header: 'Confirmar',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
               this.onDelete();
            }
        });
    }

    onDelete(){
        this.spinnerService.show();
        this.employeeService.deleteEmployee(this.Id).subscribe(data => {
            this.spinnerService.hide();
            this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Se eliminó correctamente el empleado', life: 3000 });
            this.loadEmployeeLazy({ first: 0, rows: 5 });
        },error =>{
            this.spinnerService.hide();
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Hubo un error en el sistema', life: 3000 });
        },()=>{
            this.spinnerService.hide();
        })
    }
    hideDialog() {
        this.objectDialog = false;
        this.submitted = false;
    }

    delete(employeeId: number) {
        this.Id = employeeId;
        this.deleteEmployee();
    }

    getSeverity(status: string) {
        switch (status) {
            case 'INSTOCK':
                return 'success';
            case 'LOWSTOCK':
                return 'warn';
            case 'OUTOFSTOCK':
                return 'danger';
            default:
                return 'info';
        }
    }

    save() {
        if (this.objectForm.invalid) {
            this.objectForm.markAllAsTouched();
            this.messageService.add({ severity: 'warn', summary: 'Warning', detail: 'Ingrese los campos obligatorios', life: 3000 });
            return;
        }
        let numDo = this.objectForm.get('documentoNumber')?.value;
        debugger;
        if (numDo && numDo.toString().length != 8) {
            this.messageService.add({ severity: 'warn', summary: 'Warning', detail: 'El documento debe tener 8 caracteres', life: 3000 });
            return ;
        }
        this.spinnerService.show();


        this.objectForm.removeControl('position');
        this.objectForm.removeControl('afp');
        if(this.edit){
            this.onEdit();
        }else{
            this.objectForm.removeControl('employeeId');
            this.onSave();
        }

    }
    onSave(){
        this.employeeService.addEmployee(this.objectForm.value).subscribe(response => {
            this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Se agregó el empleado correctamente', life: 3000 });
            this.objectDialog = false;
        this.spinnerService.hide();
        this.loadEmployeeLazy({ first: 0, rows: 5 });
        }, error =>{
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Hubo un error en el sistema', life: 3000 });
            this.spinnerService.hide();
        },
        ()=>{
            this.spinnerService.hide();
            this.objectDialog = false;
        });
    }
    onEdit(){
        this.employeeService.updateEmployee(this.objectForm.value).subscribe(response => {
            this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Se actualizó el empleado correctamente', life: 3000 });
            this.objectDialog = false;
        this.spinnerService.hide();
        this.loadEmployeeLazy({ first: 0, rows: 5 });
        }, error =>{
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Hubo un error en el sistema', life: 3000 });
            this.spinnerService.hide();
        },
        ()=>{
            this.spinnerService.hide();
            this.objectDialog = false;
        });
    }
}
