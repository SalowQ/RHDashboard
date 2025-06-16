import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AlertService } from '../../../../shared/services/alert/alert.service';
import { InputTextComponent } from '../../../../shared/components/input-text/input-text.component';
import { InputSelectComponent } from '../../../../shared/components/input-select/input-select.component';
import { CodeDescription } from '../../../../shared/interfaces/code-description';
import { NavigationExtras, Router, RouterLink } from '@angular/router';
import {
  EmployeeRequest,
  EmployeeResponse,
} from '../../../../shared/interfaces/employee';

@Component({
  selector: 'app-register-employee',
  imports: [
    ReactiveFormsModule,
    InputTextComponent,
    InputSelectComponent,
    RouterLink,
  ],
  templateUrl: './register-employee.component.html',
  styleUrl: './register-employee.component.css',
})
export class RegisterEmployeeComponent {
  employeeForm!: FormGroup;
  departmentList: CodeDescription[] = [
    { code: 10, description: 'TI' },
    { code: 20, description: 'Administrativo' },
    { code: 30, description: 'Gestão' },
    { code: 40, description: 'Marketing' },
    { code: 50, description: 'Recursos Humanos' },
    { code: 60, description: 'Financeiro' },
  ];
  positionList: CodeDescription[] = [
    { code: 1, description: 'Analista de Sistemas' },
    { code: 2, description: 'Desenvolvedor Front-End' },
    { code: 3, description: 'Assistente Administrativo' },
    { code: 4, description: 'Gerente de Projetos' },
    { code: 5, description: 'Designer Gráfico' },
    { code: 6, description: 'Engenheiro de Software' },
    { code: 7, description: 'Analista de RH' },
    { code: 8, description: 'Técnico de Suporte' },
    { code: 9, description: 'Analista Financeiro' },
    { code: 10, description: 'Coordenador de TI' },
    { code: 11, description: 'Diretor de Operações' },
  ];
  scheduleList: CodeDescription[] = [
    { code: 100, description: '08h às 17h' },
    { code: 101, description: '09h às 18h' },
    { code: 102, description: '10h às 19h' },
    { code: 103, description: '07h às 16h' },
    { code: 104, description: '13h às 22h' },
  ];
  salaryList: CodeDescription[] = [
    { code: 1001, description: 'R$ 3.500,00' },
    { code: 1002, description: 'R$ 3.600,00' },
    { code: 1003, description: 'R$ 3.900,00' },
    { code: 1004, description: 'R$ 4.000,00' },
    { code: 1005, description: 'R$ 4.100,00' },
    { code: 1006, description: 'R$ 4.200,00' },
    { code: 1007, description: 'R$ 4.500,00' },
    { code: 1008, description: 'R$ 4.600,00' },
    { code: 1009, description: 'R$ 4.700,00' },
    { code: 1010, description: 'R$ 4.800,00' },
    { code: 1011, description: 'R$ 5.200,00' },
    { code: 1012, description: 'R$ 5.300,00' },
    { code: 1013, description: 'R$ 6.000,00' },
    { code: 1014, description: 'R$ 6.700,00' },
    { code: 1015, description: 'R$ 7.200,00' },
    { code: 1016, description: 'R$ 8.000,00' },
    { code: 1017, description: 'R$ 9.100,00' },
    { code: 1018, description: 'R$ 10.000,00' },
  ];
  editEmployee: EmployeeResponse | null = null;

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

    if (history.state.object) {
      this.editEmployee = history.state.object;
      const { id, active, department, position, schedule, salary, ...rest } =
        history.state.object as EmployeeResponse;

      const formEditEmployee: EmployeeRequest = {
        ...rest,
        department: department.code,
        position: position.code,
        schedule: schedule.code,
        salary: salary.code,
      };

      this.employeeForm.setValue(formEditEmployee);
    }
  }

  sendForm(): void {
    if (this.employeeForm.invalid) {
      this.employeeForm.markAllAsTouched();
      return;
    }

    this.alertService.show(
      'info',
      'Essa funcionalidade ainda está em construção, os dados são modificados, mas ainda não são salvos.'
    );
    let formData: EmployeeRequest = this.employeeForm.value;
    if (!this.editEmployee) {
      let navigationExtras: NavigationExtras = {
        state: {
          object: formData,
        },
      };
      console.log('Dados enviados:', navigationExtras);
      this.router.navigate(['/funcionarios/listagem'], navigationExtras);
    } else {
      let navigationExtras: NavigationExtras = {
        state: {
          object: formData,
          id: this.editEmployee.id,
        },
      };
      this.router.navigate(['/funcionarios/listagem'], navigationExtras);
    }
  }
}
