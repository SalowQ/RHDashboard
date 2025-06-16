import { Component, ElementRef, inject, Input, Renderer2 } from '@angular/core';
import { NgControl } from '@angular/forms';

type Size = 'sm' | 'lg';

@Component({
  standalone: true,
  imports: [],
  template: ``,
})
export abstract class BaseInputComponent {
  @Input() size?: Size;
  @Input() formControlName: string = '';
  @Input() label: string = '';
  @Input() optional: boolean = false;

  renderer = inject(Renderer2);
  element = inject(ElementRef);

  disabled: boolean = false;
  value: any;

  constructor(public control: NgControl) {}

  onChange!: (value: any) => void;
  onTouched!: () => void;

  writeValue(value: any): void {
    this.value = value;
  }

  registerOnChange(fn: (value: any) => void) {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(disabled: boolean): void {
    this.disabled = disabled;
  }

  getSizeClasses(): string {
    if (this.size === 'sm') return 'input-sm';
    if (this.size === 'lg') return 'input-lg';
    return '';
  }

  getValidationClasses(): string {
    if (this.control.touched && this.control.invalid) {
      return 'input-error border-error';
    }
    return '';
  }

  mapOptionList<T>(
    options: T[],
    ref: { field: keyof T; value: keyof T }
  ): { field: T[keyof T]; value: T[keyof T] }[] {
    return options.map((option) => ({
      field: option[ref.field],
      value: option[ref.value],
    }));
  }
}
