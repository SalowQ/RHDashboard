import { CommonModule } from '@angular/common';
import { Component, Input, Self } from '@angular/core';
import { FormsModule, NgControl } from '@angular/forms';
import { BaseInputComponent } from '../base-input/base-input.component';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { CurrencyMaskModule } from 'ng2-currency-mask';
import { ErrorMessageComponent } from '../error-message/error-message.component';

type CurrencyOptions = {
  align?: 'right' | 'left';
  allowNegative?: boolean;
  decimal?: ',' | '.';
  precision?: number;
  prefix?: string;
  suffix?: string;
  thousands?: ',' | '.';
};

type InputType =
  | 'text'
  | 'number'
  | 'password'
  | 'email'
  | 'date'
  | 'datetime-local';

@Component({
  selector: 'app-input-text',
  imports: [
    CommonModule,
    FormsModule,
    ErrorMessageComponent,
    NgxMaskDirective,
    CurrencyMaskModule,
  ],
  templateUrl: './input-text.component.html',
  styleUrl: './input-text.component.css',
  providers: [provideNgxMask()],
})
export class InputTextComponent extends BaseInputComponent {
  @Input() type: InputType = 'text';
  @Input() placeholder?: string = '';
  @Input() maxlength?: string = '255';
  @Input() mask?: string = '';
  @Input() prefix: string = '';
  @Input() suffix: string = '';
  @Input() currency: boolean = false;
  @Input() options: CurrencyOptions = {
    align: 'right',
    decimal: ',',
    precision: 2,
    prefix: 'R$ ',
    suffix: '',
    thousands: '.',
    allowNegative: true,
  };

  constructor(@Self() public override control: NgControl) {
    super(control);
    control.valueAccessor = this;
  }

  onInputEvent = (event: Event) => {
    if (this.currency) {
      this.onChange(event);
      return;
    }
    const inputValue = (event.target as HTMLInputElement).value;
    if (this.mask) {
      this.onChange(this.getMaskedValue(inputValue));
      return;
    }
    if (this.type === 'number') {
      this.onChange(+inputValue);
    } else {
      this.onChange(inputValue.trim());
    }
  };

  getMaskedValue(value: string): string {
    const charactersToRemove = ['.', ';', '/', '-', ',', '(', ')', ' '];
    return value
      .split('')
      .filter((char) => !charactersToRemove.includes(char))
      .join('');
  }

  override writeValue(value: any): void {
    this.value = value;
  }
}
