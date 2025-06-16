import { CodeDescription } from './code-description';

interface EmployeeBase {
  name: string;
  cpf: string;
  birthDate: string;
  email: string;
  phone: string;
  address: string;
  hiringDate: string;
  salary: number;
  active: boolean;
}

export interface EmployeeResponse extends EmployeeBase {
  id: number;
  position: CodeDescription;
  department: CodeDescription;
  schedule: CodeDescription;
}

export interface EmployeeRequest extends EmployeeBase {
  position: number;
  department: number;
  schedule: number;
}
