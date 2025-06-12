import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cpf',
})
export class CpfPipe implements PipeTransform {
  transform(value: any, args?: any): any {
    if (!value) return '';

    const cpf = value.toString().replace(/\D/g, '');

    if (cpf.length !== 11) return value;

    return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
  }
}
