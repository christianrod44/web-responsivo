import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { SelectOption } from './components/select-custom/select-custom.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'web-responsivo';

  mainForm: FormGroup;

  selectOptions: SelectOption[] = [
    { value: 'opcao1', label: 'Primeira Opção' },
    { value: 'opcao2', label: 'Segunda Opção' },
    { value: 'opcao3', label: 'Terceira Opção' },
  ];

  constructor() {
    this.mainForm = new FormGroup({
      mySelect: new FormControl('opcao1'),
      mySwitch: new FormControl(true)     
    });
  }

  ngOnInit(): void {
    this.mainForm.get('mySelect')?.valueChanges.subscribe(value => {
      console.log('Select value changed:', value);
    });

    this.mainForm.get('mySwitch')?.valueChanges.subscribe(value => {
      console.log('Switch value changed:', value);
    });
  }

  toggleSelectDisable(): void {
    const control = this.mainForm.get('mySelect');
    if (control?.disabled) {
      control.enable();
    } else {
      control?.disable();
    }
  }

  toggleSwitchDisable(): void {
    const control = this.mainForm.get('mySwitch');
    if (control?.disabled) {
      control.enable();
    } else {
      control?.disable();
    }
  }
}