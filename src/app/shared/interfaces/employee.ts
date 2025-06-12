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
  position: { code: number; description: string };
  department: { code: number; description: string };
  schedule: { code: number; description: string };
}
