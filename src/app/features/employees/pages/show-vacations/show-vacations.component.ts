import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { NgxMaskDirective } from 'ngx-mask';
import { AlertService } from '../../../../shared/services/alert/alert.service';
import { VacationResponse } from '../../../../shared/interfaces/vacation';
import { CpfPipe } from '../../../../shared/pipes/cpf/cpf.pipe';
import { DatePipe } from '../../../../shared/pipes/date/date.pipe';

@Component({
  selector: 'app-show-vacations',
  imports: [
    NgxMaskDirective,
    ReactiveFormsModule,
    RouterLink,
    CpfPipe,
    DatePipe,
  ],
  templateUrl: './show-vacations.component.html',
  styleUrl: './show-vacations.component.css',
})
export class ShowVacationsComponent {
  private _page: number = 1;
  filter: boolean = false;
  sortedAlphabetically: boolean = false;
  vacationsListFiltered: VacationResponse[] = [];
  vacationsListPages: VacationResponse[] = [];
  vacationsList: VacationResponse[] = [
    {
      id: 7,
      startDate: '2025-08-05',
      endDate: '2025-08-15',
      days: 11,
      employeeId: 7,
      employeeName: 'Gabriela Souza Lima',
      employeeCpf: '78901234566',
      employeePosition: { code: 7, description: 'Analista de RH' },
      employeeDepartment: { code: 50, description: 'Recursos Humanos' },
      status: false,
    },
    {
      id: 1,
      startDate: '2025-07-01',
      endDate: '2025-07-10',
      days: 10,
      employeeId: 1,
      employeeName: 'Ana Paula Silva',
      employeeCpf: '12345678900',
      employeePosition: { code: 1, description: 'Analista de Sistemas' },
      employeeDepartment: { code: 10, description: 'TI' },
      status: true,
    },
    {
      id: 3,
      startDate: '2025-09-10',
      endDate: '2025-09-20',
      days: 11,
      employeeId: 3,
      employeeName: 'Carla Mendes Oliveira',
      employeeCpf: '34567890122',
      employeePosition: { code: 3, description: 'Assistente Administrativo' },
      employeeDepartment: { code: 20, description: 'Administrativo' },
      status: true,
    },
    {
      id: 4,
      startDate: '2025-10-01',
      endDate: '2025-10-10',
      days: 10,
      employeeId: 4,
      employeeName: 'Daniel Ribeiro Martins',
      employeeCpf: '45678901233',
      employeePosition: { code: 4, description: 'Gerente de Projetos' },
      employeeDepartment: { code: 30, description: 'Gestão' },
      status: true,
    },
    {
      id: 2,
      startDate: '2025-08-05',
      endDate: '2025-08-15',
      days: 11,
      employeeId: 2,
      employeeName: 'Bruno Costa Souza',
      employeeCpf: '23456789011',
      employeePosition: { code: 2, description: 'Desenvolvedor Front-End' },
      employeeDepartment: { code: 10, description: 'TI' },
      status: false,
    },
    {
      id: 5,
      startDate: '2025-11-12',
      endDate: '2025-11-20',
      days: 9,
      employeeId: 5,
      employeeName: 'Eduarda Lima Santos',
      employeeCpf: '56789012344',
      employeePosition: { code: 5, description: 'Designer Gráfico' },
      employeeDepartment: { code: 40, description: 'Marketing' },
      status: false,
    },
    {
      id: 8,
      startDate: '2025-09-10',
      endDate: '2025-09-20',
      days: 11,
      employeeId: 8,
      employeeName: 'Henrique Moura Lopes',
      employeeCpf: '89012345677',
      employeePosition: { code: 8, description: 'Técnico de Suporte' },
      employeeDepartment: { code: 10, description: 'TI' },
      status: true,
    },
    {
      id: 6,
      startDate: '2025-07-18',
      endDate: '2025-07-28',
      days: 11,
      employeeId: 6,
      employeeName: 'Fernando Alves Costa',
      employeeCpf: '67890123455',
      employeePosition: { code: 6, description: 'Engenheiro de Software' },
      employeeDepartment: { code: 10, description: 'TI' },
      status: true,
    },
    {
      id: 9,
      startDate: '2025-10-15',
      endDate: '2025-10-25',
      days: 11,
      employeeId: 9,
      employeeName: 'Isabela Ferreira Nunes',
      employeeCpf: '90123456788',
      employeePosition: { code: 9, description: 'Analista Financeiro' },
      employeeDepartment: { code: 60, description: 'Financeiro' },
      status: true,
    },
    {
      id: 10,
      startDate: '2025-11-01',
      endDate: '2025-11-10',
      days: 10,
      employeeId: 10,
      employeeName: 'João Pedro Almeida',
      employeeCpf: '01234567899',
      employeePosition: { code: 10, description: 'Coordenador de TI' },
      employeeDepartment: { code: 10, description: 'TI' },
      status: false,
    },
  ];
  searchForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private alertService: AlertService,
    private router: Router
  ) {}

  ngOnInit() {
    this.searchForm = this.fb.group({
      cpf: [''],
      name: ['', [Validators.maxLength(50)]],
    });
    this.filterVacations(this._page);
  }

  resetForm() {
    this.searchForm.reset();
    this.searchForm.markAsUntouched();
  }

  search() {
    const formValues = this.searchForm.value;
    const hasValue = Object.values(formValues).some((value) => value !== '');
    this._page = 1;
    this.filter = true;

    if (hasValue && this.searchForm.valid) {
      const { cpf, name } = formValues;
      this.vacationsListFiltered = this.vacationsList
        .filter((employee) => {
          const matchesCpf =
            !cpf || employee.employeeCpf.includes(cpf.replace(/\D/g, ''));
          const matchesName =
            !name ||
            employee.employeeName.toLowerCase().includes(name.toLowerCase());
          return matchesCpf && matchesName;
        })
        .filter((employee) => {
          const matchesCpf = cpf
            ? employee.employeeCpf.includes(cpf.replace(/\D/g, ''))
            : true;
          const matchesName = name
            ? employee.employeeName.toLowerCase().includes(name.toLowerCase())
            : true;
          return matchesCpf && matchesName;
        });
      this.vacationsListPages = this.vacationsListFiltered.slice(0, 10);
    } else {
      this.filterVacations(this._page);
      this.filter = false;
    }
  }

  filterVacations(page: number): void {
    const startIndex = (page - 1) * 10;
    const endIndex = startIndex + 10;
    if (this.filter) {
      this.vacationsListPages = this.vacationsListFiltered.slice(
        startIndex,
        endIndex
      );
    } else {
      this.vacationsListPages = this.vacationsList.slice(startIndex, endIndex);
    }
  }

  sortEmployeesAlphabetically(): void {
    const listToSort = this.filter
      ? this.vacationsListFiltered
      : this.vacationsList;
    const sortedList = [...listToSort].sort((a, b) => {
      const comparison = a.employeeName.localeCompare(b.employeeName, 'pt-BR');
      return this.sortedAlphabetically ? -comparison : comparison;
    });
    this.filter
      ? (this.vacationsListFiltered = sortedList)
      : (this.vacationsList = sortedList);
    const startIndex = (this._page - 1) * 10;
    const endIndex = startIndex + 10;
    this.vacationsListPages = sortedList.slice(startIndex, endIndex);
    this.sortedAlphabetically = !this.sortedAlphabetically;
  }

  edit(vacaton: VacationResponse) {}

  get totalPages(): number[] {
    const list = this.filter ? this.vacationsListFiltered : this.vacationsList;
    const total = Math.ceil(list.length / 10);
    return Array.from({ length: total }, (_, i) => i + 1);
  }
  get page(): number {
    return this._page;
  }
  set page(value: number) {
    this._page = value;
    this.onPageChange();
  }
  private onPageChange(): void {
    this.filterVacations(this._page);
  }
}
