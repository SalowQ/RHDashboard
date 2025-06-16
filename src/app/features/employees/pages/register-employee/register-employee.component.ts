import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NgxMaskDirective } from 'ngx-mask';
import { AlertService } from '../../../../shared/services/alert/alert.service';
import { InputTextComponent } from '../../../../shared/components/input-text/input-text.component';
import { InputSelectComponent } from '../../../../shared/components/input-select/input-select.component';
import { CodeDescription } from '../../../../shared/interfaces/code-description';
import { NavigationExtras, Router } from '@angular/router';
import { EmployeeRequest } from '../../../../shared/interfaces/employee';

@Component({
  selector: 'app-register-employee',
  imports: [ReactiveFormsModule, InputTextComponent, InputSelectComponent],
  templateUrl: './register-employee.component.html',
  styleUrl: './register-employee.component.css',
})
export class RegisterEmployeeComponent {
  employeeForm!: FormGroup;
  departmentList: CodeDescription[] = [{ code: 10, description: 'TI' }];
  positionList: CodeDescription[] = [
    { code: 1, description: 'Analista de Sistemas' },
  ];
  scheduleList: CodeDescription[] = [{ code: 100, description: '08h às 17h' }];

  constructor(
    private fb: FormBuilder,
    private alertService: AlertService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.employeeForm = this.fb.group({
      name: ['', [Validators.required]],
      cpf: ['', [Validators.required, Validators.minLength(11)]],
      birthDate: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required]],
      address: ['', [Validators.required]],
      department: ['', [Validators.required]],
      position: ['', [Validators.required]],
      salary: ['', [Validators.required]],
      hiringDate: ['', [Validators.required]],
      schedule: ['', [Validators.required]],
    });
  }

  sendForm(): void {
    if (this.employeeForm.invalid) {
      this.employeeForm.markAllAsTouched();
      return;
    }

    this.alertService.show(
      'info',
      'Essa funcionalidade ainda está em construção.'
    );
    let formData: EmployeeRequest = this.employeeForm.value;
    const navigationExtras: NavigationExtras = {
      state: {
        objeto: formData,
      },
    };
    console.log('Dados enviados:', navigationExtras);
    this.router.navigate(['/funcionarios/listagem'], navigationExtras);
  }
}
