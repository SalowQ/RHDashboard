import { Component, Input, Self } from '@angular/core';
import { FormsModule, NgControl } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BaseInputComponent } from '../base-input/base-input.component';
import { ErrorMessageComponent } from '../error-message/error-message.component';

@Component({
  selector: 'app-input-select',
  standalone: true,
  imports: [CommonModule, FormsModule, ErrorMessageComponent],
  template: `
    <div class="form-control w-full mb-3">
      <label *ngIf="label" class="label" [for]="control.name + label">
        <span class="label-text font-semibold"
          >{{ label }} <small *ngIf="optional">(Opcional)</small>
        </span>
      </label>
      <select
        class="select select-bordered w-full {{ getValidationClasses() }} {{
          getSizeClasses()
        }}"
        [id]="formControlName + label"
        (blur)="onTouched()"
        (change)="onChangeEvent($event)"
        [disabled]="disabled"
      >
        <option [value]="null" [selected]="value === null">Selecione</option>
        @for(option of filteredOptions; track option.value) {
        <option [value]="option.value" [selected]="option.value === value">
          {{
            !concatenate ? option.field : option.value + ' - ' + option.field
          }}
        </option>
        }
      </select>
      <app-error-message
        [control]="control"
        [label]="label"
      ></app-error-message>
    </div>
  `,
})
export class InputSelectComponent<T> extends BaseInputComponent {
  @Input() options!: T[];
  @Input() ref!: { field: keyof T; value: keyof T };
  @Input() concatenate: boolean = false;

  filteredOptions!: { field: T[keyof T]; value: T[keyof T] }[];

  constructor(@Self() public override control: NgControl) {
    super(control);
    control.valueAccessor = this;
  }

  override writeValue(v: any): void {
    this.value = v;
    this.renderer.setProperty(
      this.element.nativeElement.querySelector('select'),
      'value',
      v
    );
  }

  override getSizeClasses() {
    if (this.size === 'sm') return 'select-sm';
    if (this.size === 'lg') return 'select-lg';
    else return '';
  }

  ngOnInit() {
    this.filteredOptions = this.mapOptionList(this.options, this.ref);
    if (this.filteredOptions.length === 0) this.value = null;
  }

  ngOnChanges() {
    this.filteredOptions = this.mapOptionList(this.options, this.ref);
  }

  onChangeEvent(event: any) {
    let selectedValue = event.target.value;

    if (
      selectedValue === 'null' ||
      selectedValue === undefined ||
      selectedValue === '' ||
      selectedValue === null
    ) {
      selectedValue = null;
      this.onChange(selectedValue);
      return;
    }

    if (typeof this.filteredOptions[0].value === 'number') {
      this.onChange(+selectedValue);
      return;
    }

    this.onChange(selectedValue);
  }
}
