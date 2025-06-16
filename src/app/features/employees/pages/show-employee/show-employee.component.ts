import { Component } from '@angular/core';
import { NgxMaskDirective } from 'ngx-mask';
import { StatusPipe } from '../../../../shared/pipes/status/status.pipe';
import { CpfPipe } from '../../../../shared/pipes/cpf/cpf.pipe';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AlertService } from '../../../../shared/services/alert/alert.service';
import { NavigationExtras, Router, RouterLink } from '@angular/router';
import {
  EmployeeRequest,
  EmployeeResponse,
} from '../../../../shared/interfaces/employee';

@Component({
  selector: 'app-show-employee',
  imports: [
    NgxMaskDirective,
    StatusPipe,
    CpfPipe,
    ReactiveFormsModule,
    RouterLink,
  ],
  templateUrl: './show-employee.component.html',
  styleUrl: './show-employee.component.css',
})
export class ShowEmployeeComponent {
  private _page: number = 1;
  filter: boolean = false;
  sortedAlphabetically: boolean = false;
  employeesListFiltered: EmployeeResponse[] = [];
  employeesListPages: EmployeeResponse[] = [];
  employeesList: EmployeeResponse[] = [
    {
      id: 1,
      name: 'Ana Paula Silva',
      cpf: '12345678900',
      birthDate: '1990-05-14',
      email: 'ana.silva@example.com',
      phone: '11912345678',
      address: 'Rua das Flores, 123',
      hiringDate: '2020-01-10',
      salary: 4500.0,
      active: true,
      position: { code: 1, description: 'Analista de Sistemas' },
      department: { code: 10, description: 'TI' },
      schedule: { code: 100, description: '08h às 17h' },
    },
    {
      id: 2,
      name: 'Bruno Souza',
      cpf: '98765432100',
      birthDate: '1985-10-22',
      email: 'bruno.souza@example.com',
      phone: '21998765432',
      address: 'Av. Brasil, 456',
      hiringDate: '2018-03-15',
      salary: 5200.0,
      active: true,
      position: { code: 2, description: 'Desenvolvedor Front-End' },
      department: { code: 10, description: 'TI' },
      schedule: { code: 101, description: '09h às 18h' },
    },
    {
      id: 3,
      name: 'Carla Mendes',
      cpf: '32165498700',
      birthDate: '1992-07-08',
      email: 'carla.mendes@example.com',
      phone: '31923456789',
      address: 'Rua Minas Gerais, 789',
      hiringDate: '2021-07-01',
      salary: 3900.0,
      active: true,
      position: { code: 3, description: 'Assistente Administrativo' },
      department: { code: 20, description: 'Administrativo' },
      schedule: { code: 100, description: '08h às 17h' },
    },
    {
      id: 4,
      name: 'Daniel Lima',
      cpf: '45678912300',
      birthDate: '1988-11-30',
      email: 'daniel.lima@example.com',
      phone: '41934567890',
      address: 'Rua Paraná, 321',
      hiringDate: '2019-11-25',
      salary: 6000.0,
      active: false,
      position: { code: 4, description: 'Gerente de Projetos' },
      department: { code: 30, description: 'Gestão' },
      schedule: { code: 102, description: '10h às 19h' },
    },
    {
      id: 5,
      name: 'Elaine Rocha',
      cpf: '65432198700',
      birthDate: '1995-03-12',
      email: 'elaine.rocha@example.com',
      phone: '85956781234',
      address: 'Rua Ceará, 654',
      hiringDate: '2022-02-20',
      salary: 3500.0,
      active: true,
      position: { code: 5, description: 'Designer Gráfico' },
      department: { code: 40, description: 'Marketing' },
      schedule: { code: 101, description: '09h às 18h' },
    },
    {
      id: 6,
      name: 'Felipe Castro',
      cpf: '78912345600',
      birthDate: '1983-01-17',
      email: 'felipe.castro@example.com',
      phone: '51978901234',
      address: 'Av. Central, 987',
      hiringDate: '2017-06-30',
      salary: 7200.0,
      active: true,
      position: { code: 6, description: 'Engenheiro de Software' },
      department: { code: 10, description: 'TI' },
      schedule: { code: 103, description: '07h às 16h' },
    },
    {
      id: 7,
      name: 'Gabriela Nunes',
      cpf: '14725836900',
      birthDate: '1994-08-25',
      email: 'gabriela.nunes@example.com',
      phone: '62965432100',
      address: 'Rua Goiás, 321',
      hiringDate: '2023-05-10',
      salary: 4100.0,
      active: true,
      position: { code: 7, description: 'Analista de RH' },
      department: { code: 50, description: 'Recursos Humanos' },
      schedule: { code: 100, description: '08h às 17h' },
    },
    {
      id: 8,
      name: 'Henrique Teixeira',
      cpf: '96385274100',
      birthDate: '1991-09-19',
      email: 'henrique.teixeira@example.com',
      phone: '71976543210',
      address: 'Av. Salvador, 456',
      hiringDate: '2016-09-05',
      salary: 4800.0,
      active: false,
      position: { code: 8, description: 'Técnico de Suporte' },
      department: { code: 10, description: 'TI' },
      schedule: { code: 104, description: '13h às 22h' },
    },
    {
      id: 9,
      name: 'Isabela Martins',
      cpf: '25836914700',
      birthDate: '1989-12-01',
      email: 'isabela.martins@example.com',
      phone: '81998761122',
      address: 'Rua Recife, 789',
      hiringDate: '2020-08-22',
      salary: 5300.0,
      active: true,
      position: { code: 9, description: 'Analista Financeiro' },
      department: { code: 60, description: 'Financeiro' },
      schedule: { code: 100, description: '08h às 17h' },
    },
    {
      id: 10,
      name: 'João Pedro Oliveira',
      cpf: '74185296300',
      birthDate: '1987-06-10',
      email: 'joao.oliveira@example.com',
      phone: '91987653344',
      address: 'Rua Belém, 123',
      hiringDate: '2015-04-18',
      salary: 6700.0,
      active: true,
      position: { code: 10, description: 'Coordenador de TI' },
      department: { code: 10, description: 'TI' },
      schedule: { code: 102, description: '10h às 19h' },
    },
    {
      id: 11,
      name: 'Karen Barbosa',
      cpf: '85296374100',
      birthDate: '1993-04-03',
      email: 'karen.barbosa@example.com',
      phone: '11985642379',
      address: 'Rua das Palmeiras, 321',
      hiringDate: '2021-01-05',
      salary: 4600.0,
      active: true,
      position: { code: 3, description: 'Assistente Administrativo' },
      department: { code: 20, description: 'Administrativo' },
      schedule: { code: 101, description: '09h às 18h' },
    },
    {
      id: 12,
      name: 'Lucas Ferreira',
      cpf: '96374185200',
      birthDate: '1986-07-21',
      email: 'lucas.ferreira@example.com',
      phone: '11976543123',
      address: 'Av. Paulista, 1000',
      hiringDate: '2013-10-01',
      salary: 8000.0,
      active: true,
      position: { code: 4, description: 'Gerente de Projetos' },
      department: { code: 30, description: 'Gestão' },
      schedule: { code: 102, description: '10h às 19h' },
    },
    {
      id: 13,
      name: 'Mariana Lopes',
      cpf: '74196385200',
      birthDate: '1990-11-09',
      email: 'mariana.lopes@example.com',
      phone: '21996547823',
      address: 'Rua do Carmo, 222',
      hiringDate: '2020-06-12',
      salary: 4000.0,
      active: true,
      position: { code: 5, description: 'Designer Gráfico' },
      department: { code: 40, description: 'Marketing' },
      schedule: { code: 101, description: '09h às 18h' },
    },
    {
      id: 14,
      name: 'Nicolas Pinto',
      cpf: '12398745600',
      birthDate: '1992-02-28',
      email: 'nicolas.pinto@example.com',
      phone: '31998712345',
      address: 'Rua Tiradentes, 909',
      hiringDate: '2018-12-01',
      salary: 4800.0,
      active: false,
      position: { code: 6, description: 'Engenheiro de Software' },
      department: { code: 10, description: 'TI' },
      schedule: { code: 100, description: '08h às 17h' },
    },
    {
      id: 15,
      name: 'Olívia Ramos',
      cpf: '45632178900',
      birthDate: '1996-10-10',
      email: 'olivia.ramos@example.com',
      phone: '71987654321',
      address: 'Av. Atlântica, 456',
      hiringDate: '2023-04-03',
      salary: 3600.0,
      active: true,
      position: { code: 7, description: 'Analista de RH' },
      department: { code: 50, description: 'Recursos Humanos' },
      schedule: { code: 103, description: '07h às 16h' },
    },
    {
      id: 16,
      name: 'Pedro Henrique Lima',
      cpf: '15975348600',
      birthDate: '1984-08-08',
      email: 'pedro.lima@example.com',
      phone: '81988776655',
      address: 'Rua da Aurora, 654',
      hiringDate: '2012-03-20',
      salary: 9100.0,
      active: true,
      position: { code: 9, description: 'Analista Financeiro' },
      department: { code: 60, description: 'Financeiro' },
      schedule: { code: 104, description: '13h às 22h' },
    },
    {
      id: 17,
      name: 'Quésia Andrade',
      cpf: '95175348600',
      birthDate: '1991-05-05',
      email: 'quesia.andrade@example.com',
      phone: '71977665544',
      address: 'Rua Bahia, 77',
      hiringDate: '2017-07-07',
      salary: 4700.0,
      active: true,
      position: { code: 2, description: 'Desenvolvedor Front-End' },
      department: { code: 10, description: 'TI' },
      schedule: { code: 100, description: '08h às 17h' },
    },
    {
      id: 18,
      name: 'Rafael Gomes',
      cpf: '78945612300',
      birthDate: '1993-12-12',
      email: 'rafael.gomes@example.com',
      phone: '11955667788',
      address: 'Rua dos Bobos, 0',
      hiringDate: '2021-09-13',
      salary: 4200.0,
      active: true,
      position: { code: 1, description: 'Analista de Sistemas' },
      department: { code: 10, description: 'TI' },
      schedule: { code: 101, description: '09h às 18h' },
    },
    {
      id: 19,
      name: 'Sofia Fernandes',
      cpf: '25814736900',
      birthDate: '1997-01-15',
      email: 'sofia.fernandes@example.com',
      phone: '21999887766',
      address: 'Rua da Saudade, 123',
      hiringDate: '2024-01-02',
      salary: 3500.0,
      active: true,
      position: { code: 5, description: 'Designer Gráfico' },
      department: { code: 40, description: 'Marketing' },
      schedule: { code: 101, description: '09h às 18h' },
    },
    {
      id: 20,
      name: 'Tiago Almeida',
      cpf: '12332145600',
      birthDate: '1980-09-09',
      email: 'tiago.almeida@example.com',
      phone: '61988776655',
      address: 'Av. Norte, 2000',
      hiringDate: '2010-11-11',
      salary: 10000.0,
      active: true,
      position: { code: 10, description: 'Coordenador de TI' },
      department: { code: 10, description: 'TI' },
      schedule: { code: 102, description: '10h às 19h' },
    },
    {
      id: 21,
      name: 'Ursula Meireles',
      cpf: '32165498700',
      birthDate: '1988-06-06',
      email: 'ursula.meireles@example.com',
      phone: '51988771234',
      address: 'Rua das Rosas, 321',
      hiringDate: '2016-08-08',
      salary: 5600.0,
      active: true,
      position: { code: 7, description: 'Analista de RH' },
      department: { code: 50, description: 'Recursos Humanos' },
      schedule: { code: 100, description: '08h às 17h' },
    },
    {
      id: 22,
      name: 'Vitor Hugo Rocha',
      cpf: '65498732100',
      birthDate: '1995-03-03',
      email: 'vitor.hugo@example.com',
      phone: '61987654321',
      address: 'Rua Nova Esperança, 777',
      hiringDate: '2022-02-14',
      salary: 3900.0,
      active: true,
      position: { code: 2, description: 'Desenvolvedor Front-End' },
      department: { code: 10, description: 'TI' },
      schedule: { code: 104, description: '13h às 22h' },
    },
    {
      id: 23,
      name: 'Wesley Antunes',
      cpf: '36985214700',
      birthDate: '1982-04-04',
      email: 'wesley.antunes@example.com',
      phone: '31995544123',
      address: 'Rua dos Andradas, 412',
      hiringDate: '2009-05-20',
      salary: 11000.0,
      active: true,
      position: { code: 11, description: 'Diretor de Operações' },
      department: { code: 30, description: 'Gestão' },
      schedule: { code: 102, description: '10h às 19h' },
    },
    {
      id: 24,
      name: 'Ximena Souza',
      cpf: '74125896300',
      birthDate: '1999-07-07',
      email: 'ximena.souza@example.com',
      phone: '81977665544',
      address: 'Av. Recife, 909',
      hiringDate: '2024-03-15',
      salary: 3200.0,
      active: true,
      position: { code: 5, description: 'Designer Gráfico' },
      department: { code: 40, description: 'Marketing' },
      schedule: { code: 101, description: '09h às 18h' },
    },
    {
      id: 25,
      name: 'Yara Monteiro',
      cpf: '96385274100',
      birthDate: '1986-11-11',
      email: 'yara.monteiro@example.com',
      phone: '71999887766',
      address: 'Rua Alvorada, 55',
      hiringDate: '2015-06-22',
      salary: 7000.0,
      active: true,
      position: { code: 9, description: 'Analista Financeiro' },
      department: { code: 60, description: 'Financeiro' },
      schedule: { code: 100, description: '08h às 17h' },
    },
    {
      id: 26,
      name: 'Zeca Borges',
      cpf: '14725836900',
      birthDate: '1981-10-10',
      email: 'zeca.borges@example.com',
      phone: '31999887711',
      address: 'Rua do Sol, 800',
      hiringDate: '2008-12-01',
      salary: 8700.0,
      active: false,
      position: { code: 4, description: 'Gerente de Projetos' },
      department: { code: 30, description: 'Gestão' },
      schedule: { code: 102, description: '10h às 19h' },
    },
    {
      id: 27,
      name: 'Ana Luiza Torres',
      cpf: '32178965400',
      birthDate: '1994-09-09',
      email: 'ana.torres@example.com',
      phone: '11988779900',
      address: 'Av. Brasil, 200',
      hiringDate: '2020-01-03',
      salary: 5000.0,
      active: true,
      position: { code: 1, description: 'Analista de Sistemas' },
      department: { code: 10, description: 'TI' },
      schedule: { code: 100, description: '08h às 17h' },
    },
    {
      id: 28,
      name: 'Bruno Cesar',
      cpf: '78912345600',
      birthDate: '1992-08-08',
      email: 'bruno.cesar@example.com',
      phone: '21977665544',
      address: 'Rua da Paz, 789',
      hiringDate: '2019-09-09',
      salary: 4400.0,
      active: true,
      position: { code: 3, description: 'Assistente Administrativo' },
      department: { code: 20, description: 'Administrativo' },
      schedule: { code: 101, description: '09h às 18h' },
    },
    {
      id: 29,
      name: 'Camila Rocha',
      cpf: '45698712300',
      birthDate: '1998-05-20',
      email: 'camila.rocha@example.com',
      phone: '31998877665',
      address: 'Rua São João, 999',
      hiringDate: '2023-10-10',
      salary: 3700.0,
      active: true,
      position: { code: 6, description: 'Engenheiro de Software' },
      department: { code: 10, description: 'TI' },
      schedule: { code: 104, description: '13h às 22h' },
    },
    {
      id: 30,
      name: 'Danilo Lima',
      cpf: '15935748600',
      birthDate: '1987-03-30',
      email: 'danilo.lima@example.com',
      phone: '61997654321',
      address: 'Av. Central, 444',
      hiringDate: '2011-11-01',
      salary: 6200.0,
      active: true,
      position: { code: 2, description: 'Desenvolvedor Front-End' },
      department: { code: 10, description: 'TI' },
      schedule: { code: 102, description: '10h às 19h' },
    },
    {
      id: 31,
      name: 'Eduarda Freitas',
      cpf: '25896314700',
      birthDate: '1993-12-12',
      email: 'eduarda.freitas@example.com',
      phone: '11999887766',
      address: 'Rua das Palmeiras, 321',
      hiringDate: '2020-04-14',
      salary: 4800.0,
      active: true,
      position: { code: 5, description: 'Designer Gráfico' },
      department: { code: 40, description: 'Marketing' },
      schedule: { code: 101, description: '09h às 18h' },
    },
    {
      id: 32,
      name: 'Fábio Santana',
      cpf: '75395145600',
      birthDate: '1985-02-02',
      email: 'fabio.santana@example.com',
      phone: '31988770011',
      address: 'Av. das Américas, 600',
      hiringDate: '2014-07-21',
      salary: 6900.0,
      active: true,
      position: { code: 6, description: 'Engenheiro de Software' },
      department: { code: 10, description: 'TI' },
      schedule: { code: 102, description: '10h às 19h' },
    },
    {
      id: 33,
      name: 'Gabriela Nunes',
      cpf: '65432198700',
      birthDate: '1997-06-25',
      email: 'gabriela.nunes@example.com',
      phone: '21998877665',
      address: 'Rua Projetada, 134',
      hiringDate: '2021-08-01',
      salary: 4600.0,
      active: true,
      position: { code: 3, description: 'Assistente Administrativo' },
      department: { code: 20, description: 'Administrativo' },
      schedule: { code: 100, description: '08h às 17h' },
    },
    {
      id: 34,
      name: 'Hugo Leal',
      cpf: '12378945600',
      birthDate: '1990-11-22',
      email: 'hugo.leal@example.com',
      phone: '71996543210',
      address: 'Rua dos Coqueiros, 85',
      hiringDate: '2017-03-03',
      salary: 7500.0,
      active: true,
      position: { code: 2, description: 'Desenvolvedor Front-End' },
      department: { code: 10, description: 'TI' },
      schedule: { code: 104, description: '13h às 22h' },
    },
    {
      id: 35,
      name: 'Isabela Ramos',
      cpf: '32145678900',
      birthDate: '1996-08-16',
      email: 'isabela.ramos@example.com',
      phone: '21999887755',
      address: 'Av. Santa Cruz, 410',
      hiringDate: '2023-06-12',
      salary: 3800.0,
      active: true,
      position: { code: 7, description: 'Analista de RH' },
      department: { code: 50, description: 'Recursos Humanos' },
      schedule: { code: 100, description: '08h às 17h' },
    },
    {
      id: 36,
      name: 'João Pedro Silveira',
      cpf: '98712365400',
      birthDate: '1984-01-17',
      email: 'joao.pedro@example.com',
      phone: '61997881234',
      address: 'Rua das Águas, 78',
      hiringDate: '2010-05-30',
      salary: 9800.0,
      active: true,
      position: { code: 4, description: 'Gerente de Projetos' },
      department: { code: 30, description: 'Gestão' },
      schedule: { code: 102, description: '10h às 19h' },
    },
    {
      id: 37,
      name: 'Karla Regina',
      cpf: '15975348600',
      birthDate: '1991-05-12',
      email: 'karla.regina@example.com',
      phone: '31997889900',
      address: 'Rua Pedra Azul, 145',
      hiringDate: '2018-01-01',
      salary: 5600.0,
      active: true,
      position: { code: 9, description: 'Analista Financeiro' },
      department: { code: 60, description: 'Financeiro' },
      schedule: { code: 101, description: '09h às 18h' },
    },
    {
      id: 38,
      name: 'Lucas Matheus',
      cpf: '45612378900',
      birthDate: '1993-04-28',
      email: 'lucas.matheus@example.com',
      phone: '81999887711',
      address: 'Rua do Progresso, 333',
      hiringDate: '2022-07-20',
      salary: 4100.0,
      active: true,
      position: { code: 6, description: 'Engenheiro de Software' },
      department: { code: 10, description: 'TI' },
      schedule: { code: 100, description: '08h às 17h' },
    },
    {
      id: 39,
      name: 'Marina Lopes',
      cpf: '75348615900',
      birthDate: '1989-09-14',
      email: 'marina.lopes@example.com',
      phone: '21998777666',
      address: 'Rua do Comércio, 876',
      hiringDate: '2013-02-11',
      salary: 6300.0,
      active: true,
      position: { code: 5, description: 'Designer Gráfico' },
      department: { code: 40, description: 'Marketing' },
      schedule: { code: 101, description: '09h às 18h' },
    },
    {
      id: 40,
      name: 'Nicolas Prado',
      cpf: '78965432100',
      birthDate: '1986-06-06',
      email: 'nicolas.prado@example.com',
      phone: '11988776655',
      address: 'Rua Principal, 123',
      hiringDate: '2012-08-23',
      salary: 8400.0,
      active: false,
      position: { code: 11, description: 'Diretor de Operações' },
      department: { code: 30, description: 'Gestão' },
      schedule: { code: 102, description: '10h às 19h' },
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
    if (history.state.object) {
      let newEditEmployee: EmployeeResponse = history.state.object;
      newEditEmployee.department = { code: 10, description: 'TI' };
      newEditEmployee.position = {
        code: 1,
        description: 'Analista de Sistemas',
      };
      newEditEmployee.schedule = { code: 100, description: '08h às 17h' };
      newEditEmployee.active = true;
      if (history.state.id) {
        let idEmployee = history.state.id;
        let indexEmployee = this.employeesList.findIndex(
          (emp) => emp.id === idEmployee
        );
        if (indexEmployee != -1) {
          this.employeesList[indexEmployee] = newEditEmployee;
        }
      } else {
        this.employeesList.push(newEditEmployee);
      }
    }
    this.filterEmployees(this._page);
  }

  sortEmployeesAlphabetically(): void {
    const listToSort = this.filter
      ? this.employeesListFiltered
      : this.employeesList;
    const sortedList = [...listToSort].sort((a, b) => {
      const comparison = a.name.localeCompare(b.name, 'pt-BR');
      return this.sortedAlphabetically ? -comparison : comparison;
    });
    this.filter
      ? (this.employeesListFiltered = sortedList)
      : (this.employeesList = sortedList);

    const startIndex = (this._page - 1) * 10;
    const endIndex = startIndex + 10;
    this.employeesListPages = sortedList.slice(startIndex, endIndex);
    this.sortedAlphabetically = !this.sortedAlphabetically;
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
      this.employeesListFiltered = this.employeesList
        .filter((employee) => {
          const matchesCpf =
            !cpf || employee.cpf.includes(cpf.replace(/\D/g, ''));
          const matchesName =
            !name || employee.name.toLowerCase().includes(name.toLowerCase());
          return matchesCpf && matchesName;
        })
        .filter((employee) => {
          const matchesCpf = cpf
            ? employee.cpf.includes(cpf.replace(/\D/g, ''))
            : true;
          const matchesName = name
            ? employee.name.toLowerCase().includes(name.toLowerCase())
            : true;
          return matchesCpf && matchesName;
        });
      this.employeesListPages = this.employeesListFiltered.slice(0, 10);
    } else {
      this.filterEmployees(this._page);
      this.filter = false;
    }
  }

  filterEmployees(page: number): void {
    const startIndex = (page - 1) * 10;
    const endIndex = startIndex + 10;
    if (this.filter) {
      this.employeesListPages = this.employeesListFiltered.slice(
        startIndex,
        endIndex
      );
    } else {
      this.employeesListPages = this.employeesList.slice(startIndex, endIndex);
    }
  }

  delete(employeeId: number, employeeActive: boolean) {
    if (employeeActive) {
      this.alertService
        .show('warning', 'Deseja demitir esse funcionário?', true)
        .then((result) => {
          if (result.isConfirmed) {
            const index = this.employeesList.findIndex(
              (emp) => emp.id === employeeId
            );
            if (index !== -1) {
              this.employeesList[index].active = false;
              if (this.filter) {
                const filteredIndex = this.employeesListFiltered.findIndex(
                  (emp) => emp.id === employeeId
                );
                if (filteredIndex !== -1) {
                  this.employeesListFiltered[filteredIndex].active = false;
                }
              }
              this.filterEmployees(this._page);
              this.alertService.show(
                'success',
                'Usuário demitido com sucesso!'
              );
            } else {
              this.alertService.show('error', 'Usuário não encontrado.');
            }
          }
        });
    } else {
      this.alertService.show(
        'error',
        'O usuário precisa estar ativo para ser demitido.'
      );
    }
  }

  edit(employee: EmployeeResponse) {
    if (!employee.active) {
      this.alertService.show(
        'error',
        'O usuário precisa estar ativo para ser editado.'
      );
      return;
    }
    let navigationExtras: NavigationExtras = {
      state: {
        object: employee,
      },
    };
    this.router.navigate(['/funcionarios/cadastro'], navigationExtras);
  }

  get totalPages(): number[] {
    const list = this.filter ? this.employeesListFiltered : this.employeesList;
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
    this.filterEmployees(this._page);
  }
}
