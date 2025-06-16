import { CodeDescription } from './code-description';

interface EmployeeBase {
  name: string;
  cpf: string;
  birthDate: string;
  email: string;
  phone: string;
  address: string;
  hiringDate: string;
}

export interface EmployeeResponse extends EmployeeBase {
  active: boolean;
  id: number;
  position: CodeDescription;
  department: CodeDescription;
  schedule: CodeDescription;
  salary: CodeDescription;
}

export interface EmployeeRequest extends EmployeeBase {
  position: number;
  department: number;
  schedule: number;
  salary: number;
}
