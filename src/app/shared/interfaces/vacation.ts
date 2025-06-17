import { CodeDescription } from './code-description';

export interface VacationRequest {
  startDate: string;
  endDate: string;
  days: number;
  employeeId: number;
}

export interface VacationResponse extends VacationRequest {
  id: number;
  employeeName: string;
  employeeCpf: string;
  employeePosition: CodeDescription;
  employeeDepartment: CodeDescription;
  status: boolean;
}
