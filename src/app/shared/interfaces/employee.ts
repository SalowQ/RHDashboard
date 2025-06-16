import { CodeDescription } from './code-description';

export interface Employee {
  id: number;
  name: string;
  cpf: string;
  birthDate: string;
  email: string;
  phone: string;
  address: string;
  hiringDate: string;
  salary: number;
  active: boolean;
  position: CodeDescription;
  department: CodeDescription;
  schedule: CodeDescription;
}
