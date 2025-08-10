import { Component, OnInit, Input, Output, EventEmitter, forwardRef } from '@angular/core';
import { FormControl, NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

export interface SelectOption {
  value: string;
  label: string;
}

@Component({
  selector: 'app-select-custom',
  templateUrl: './select-custom.component.html',
  styleUrls: ['./select-custom.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectCustomComponent),
      multi: true
    }
  ]
})
export class SelectCustomComponent implements OnInit, ControlValueAccessor {
  @Input() options: SelectOption[] = [];
  @Input() placeholder: string = 'Selecione uma opção';
  @Input() label: string = '';
  @Input() disabled: boolean = false;
  @Output() selectionChange = new EventEmitter<string | undefined>();

  selectControl = new FormControl<string | null>('');
  private onChange: (value: any) => void = () => {};
  private onTouched: () => void = () => {};

  constructor() {}

  ngOnInit(): void {
    this.selectControl.valueChanges.subscribe(value => {
      this.onChange(value);
      this.selectionChange.emit(value !== null ? value : undefined); // Manter essa lógica
    });
  }

  writeValue(value: any): void {
    if (value !== undefined && value !== null) {
      this.selectControl.setValue(value, { emitEvent: false });
    }
  }

  registerOnChange(fn: (value: any) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
    if (isDisabled) {
      this.selectControl.disable({ emitEvent: false });
    } else {
      this.selectControl.enable({ emitEvent: false });
    }
  }

  onBlur() {
    this.onTouched();
  }
}