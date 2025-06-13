import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NgxMaskDirective } from 'ngx-mask';
import { AlertService } from '../../../../shared/services/alert/alert.service';

@Component({
  selector: 'app-register-employee',
  imports: [ReactiveFormsModule, NgxMaskDirective],
  templateUrl: './register-employee.component.html',
  styleUrl: './register-employee.component.css',
})
export class RegisterEmployeeComponent {
  employeeForm!: FormGroup;

  constructor(private fb: FormBuilder, private alertService: AlertService) {}

  ngOnInit(): void {
    this.employeeForm = this.fb.group({
      nome: ['', [Validators.required]],
      cpf: ['', [Validators.required, Validators.minLength(11)]],
      dataNascimento: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      contato: ['', [Validators.required]],
      endereco: ['', [Validators.required]],
      setor: ['', [Validators.required]],
      cargo: ['', [Validators.required]],
      salario: ['', [Validators.required]],
      dataContratacao: ['', [Validators.required]],
      horario: ['', [Validators.required]],
    });
  }

  sendForm(): void {
    this.alertService.show(
      'info',
      'Essa funcionalidade ainda está em construção.'
    );
    if (this.employeeForm.invalid) {
      this.employeeForm.markAllAsTouched();
      return;
    }

    const formData = this.employeeForm.value;
    console.log('Dados enviados:', formData);
  }
}
