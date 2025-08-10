import { Component, OnInit, Input, Output, EventEmitter, forwardRef } from '@angular/core';
import { FormControl, NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

@Component({
  selector: 'app-switch-custom',
  templateUrl: './switch-custom.component.html',
  styleUrls: ['./switch-custom.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SwitchCustomComponent),
      multi: true
    }
  ]
})
export class SwitchCustomComponent implements OnInit, ControlValueAccessor {
  @Input() label: string = '';
  @Input() disabled: boolean = false;
  @Output() valueChange = new EventEmitter<boolean | undefined>();

  switchControl = new FormControl<boolean | null>(false);
  private onChange: (value: any) => void = () => {};
  private onTouched: () => void = () => {};

  constructor() {}

  ngOnInit(): void {
    this.switchControl.valueChanges.subscribe(value => {
      this.onChange(value);
      this.valueChange.emit(value !== null ? value : undefined); // Manter essa lógica
    });
  }

  writeValue(value: any): void {
    if (value !== undefined && value !== null) {
      this.switchControl.setValue(value, { emitEvent: false });
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
      this.switchControl.disable({ emitEvent: false });
    } else {
      this.switchControl.enable({ emitEvent: false });
    }
  }

  onToggle() {
    this.onTouched();
  }
}