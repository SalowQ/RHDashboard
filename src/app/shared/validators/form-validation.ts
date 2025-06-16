import {
  AbstractControl,
  FormArray,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms';

export class FormValidations {
  static requiredMinCheckbox(min = 1) {
    const validator = (formArray: FormArray) => {
      const totalChecked = formArray.controls
        .map((v) => v.value)
        .reduce((total, current) => (current ? total + current : total), 0);
      return totalChecked >= min ? null : { required: true };
    };
    return validator;
  }
  static cpfValidator(
    control: FormControl | AbstractControl
  ): ValidationErrors | null {
    const cpf = control.value;
    if (!cpf) {
      return null;
    }
    const cleanedCpf = cpf.replace(/\D/g, '');

    if (cleanedCpf.length !== 11) {
      return { cpf: true };
    }

    if (/^(\d)\1+$/.test(cleanedCpf)) {
      return { cpf: true };
    }

    let sum = 0;
    let remainder: number;

    for (let i = 1; i <= 9; i++) {
      sum = sum + parseInt(cleanedCpf.substring(i - 1, i), 10) * (11 - i);
    }

    remainder = (sum * 10) % 11;
    if (remainder === 10 || remainder === 11) {
      remainder = 0;
    }

    if (remainder !== parseInt(cleanedCpf.substring(9, 10), 10)) {
      return { cpf: true };
    }

    sum = 0;
    for (let i = 1; i <= 10; i++) {
      sum = sum + parseInt(cleanedCpf.substring(i - 1, i), 10) * (12 - i);
    }

    remainder = (sum * 10) % 11;

    if (remainder === 10 || remainder === 11) {
      remainder = 0;
    }

    if (remainder !== parseInt(cleanedCpf.substring(10, 11), 10)) {
      return { cpf: true };
    }
    return null;
  }

  static cnpjValidator(
    control: FormControl | AbstractControl
  ): ValidationErrors | null {
    const cnpj = control.value;

    if (!cnpj) {
      return null;
    }

    const cleanedCnpj = cnpj.replace(/\D/g, '');

    if (cleanedCnpj.length !== 14) {
      return { cnpj: true };
    }

    if (/^(\d)\1+$/.test(cleanedCnpj)) {
      return { cnpj: true };
    }

    let size = cleanedCnpj.length - 2;
    let numbers = cleanedCnpj.substring(0, size);
    const digits = cleanedCnpj.substring(size);

    let sum = 0;
    let pos = size - 7;

    for (let i = size; i >= 1; i--) {
      sum += parseInt(numbers.charAt(size - i), 10) * pos--;
      if (pos < 2) {
        pos = 9;
      }
    }

    let dig = sum % 11 < 2 ? 0 : 11 - (sum % 11);

    if (dig !== parseInt(digits.charAt(0), 10)) {
      return { cnpj: true };
    }

    size = size + 1;
    numbers = cleanedCnpj.substring(0, size);
    sum = 0;
    pos = size - 7;

    for (let i = size; i >= 1; i--) {
      sum += parseInt(numbers.charAt(size - i), 10) * pos--;
      if (pos < 2) {
        pos = 9;
      }
    }
    dig = sum % 11 < 2 ? 0 : 11 - (sum % 11);
    if (dig !== parseInt(digits.charAt(1), 10)) {
      return { cnpj: true };
    }
    return null;
  }

  static cepValidator(control: FormControl) {
    const cep = control.value;
    if (cep && cep !== '') {
      const validacep = /^[0-9]{8}$/;
      return validacep.test(cep) ? null : { cepInvalido: true };
    }
    return null;
  }

  static equalsTo(otherField: string) {
    const validator = (formControl: FormControl) => {
      const otherfield = (<FormGroup>formControl.root).get(otherField);
      if (otherField == null) {
        throw new Error('É necessário informar um campo.');
      }

      if (!formControl.root || !(<FormGroup>formControl.root).controls) {
        return null;
      }

      const field = (<FormGroup>formControl.root).get(otherField);

      if (!field) {
        throw new Error('É necessário informar um campo válido.');
      }

      if (field.value !== formControl.value) {
        // otherfield!.setErrors({ equalsTo: 'outroCampo' });
        return { equalsTo: otherField };
      }
      if (!field.pristine) {
        otherfield!.setErrors(null);
      }

      return null;
    };
    return validator;
  }

  static getErrorMsg(
    fieldName: string,
    validatorName: string,
    validatorValue?: any
  ) {
    const config: any = {
      required: `${fieldName} é obrigatório.`,
      email: `${fieldName} não é um email válido.`,
      minlength: `${fieldName} precisa ter no mínimo ${validatorValue.requiredLength} caracteres.`,
      maxlength: `${fieldName} precisa ter no máximo ${validatorValue.requiredLength} caracteres.`,
      max: `${fieldName} precisa ser no máximo: ${validatorValue.max}.`,
      min: `${fieldName} precisa ser no mínimo: ${validatorValue.min}.`,
      length: `${fieldName} precisa ter ${validatorValue.requiredLength} caracteres.`,
      cepInvalido: 'CEP inválido.',
      emailInvalido: 'Email já cadastrado!',
      equalsTo: 'Campos não são iguais',
      pattern: 'Campo inválido',
      whitespace: `${fieldName} não permite o uso de espaços em branco.`,
      cpf: `CPF inválido`,
      cnpj: `CNPJ inválido`,
    };
    return config[validatorName];
  }
}
