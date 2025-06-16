import { Component, Input } from '@angular/core';
import { NgControl } from '@angular/forms';
import { FormValidations } from '../../validators/form-validation';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-error-message',
  standalone: true,
  imports: [CommonModule],
  template: `
    <span *ngIf="errorMessage" class="text-error text-sm">
      {{ errorMessage }}
    </span>
  `,
})
export class ErrorMessageComponent {
  @Input() control!: NgControl;
  @Input() label!: string;

  get errorMessage(): string | null {
    if (!this.control || !this.control.errors || !this.control.touched) {
      return null;
    }

    for (const errorKey in this.control.errors) {
      if (this.control.errors.hasOwnProperty(errorKey)) {
        const customMessage = this.control.errors['message'];
        if (customMessage) {
          return customMessage;
        }

        const labelText = this.label || 'Field';
        return FormValidations.getErrorMsg(
          labelText,
          errorKey,
          this.control.errors[errorKey]
        );
      }
    }

    return null;
  }
}
