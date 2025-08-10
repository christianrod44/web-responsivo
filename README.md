Documentação de Componentes Personalizados
Este documento serve como guia para a utilização dos componentes SelectCustomComponent e SwitchCustomComponent. O objetivo é fornecer uma solução modular e testável para elementos de formulário, seguindo os padrões do Angular.

Diferenciais e Boas Práticas
Nossos componentes foram desenvolvidos com os seguintes princípios em mente:

Integração com ControlValueAccessor: Ambos os componentes implementam a interface ControlValueAccessor, o que permite uma integração perfeita com o ReactiveFormsModule do Angular. Isso significa que você pode usar formControlName, formControl e outras diretivas de formulário nativas.

Design Modular: Cada componente é autônomo e focado em uma única responsabilidade, facilitando a manutenção e o reuso em diferentes partes da sua aplicação.

Testes Unitários: O projeto inclui testes unitários bem definidos para cada componente, garantindo que o comportamento esperado seja mantido durante o desenvolvimento e futuras alterações.

Acessibilidade e Responsividade: O código-fonte dos componentes é projetado para ser acessível e responsivo, adaptando-se a diferentes tamanhos de tela.

Componentes
1. SelectCustomComponent
Um componente de seleção (<select>) customizado que se integra com formulários reativos.

Propriedades (@Input)
label: string - O texto que serve como rótulo para o campo de seleção.

options: Array<{ value: any, label: string }> - Um array de objetos que define as opções disponíveis no seletor.

disabled: boolean - Define se o campo de seleção está habilitado ou desabilitado.

Eventos (@Output)
selectionChange: EventEmitter<any> - Emite o valor da opção selecionada sempre que a seleção muda.

Exemplo de Uso no Template
<app-select-custom
  label="Selecione uma opção"
  [options]="selectOptions"
  formControlName="mySelect">
</app-select-custom>

2. SwitchCustomComponent
Um componente de switch (<input type="checkbox">) customizado, ideal para toggles de configurações.

Propriedades (@Input)
label: string - O texto que serve como rótulo para o switch.

disabled: boolean - Define se o switch está habilitado ou desabilitado.

Eventos (@Output)
valueChange: EventEmitter<boolean> - Emite true ou false sempre que o estado do switch muda.

Exemplo de Uso no Template
<app-switch-custom
  label="Ativar Notificações"
  formControlName="mySwitch">
</app-switch-custom>

Como Começar
Para usar esses componentes no seu projeto, siga os passos abaixo:

1. Adicione os Componentes ao seu Projeto
Copie as pastas select-custom e switch-custom (incluindo os arquivos .ts, .html e .scss) para o diretório src/app/components.

2. Importe os Módulos Necessários
No arquivo app.module.ts, certifique-se de importar o ReactiveFormsModule e declarar os novos componentes.

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms'; // Importe ReactiveFormsModule

import { AppComponent } from './app.component';
import { SelectCustomComponent } from './components/select-custom/select-custom.component';
import { SwitchCustomComponent } from './components/switch-custom/switch-custom.component';

@NgModule({
  declarations: [
    AppComponent,
    SelectCustomComponent, // Adicione o SelectCustomComponent
    SwitchCustomComponent  // Adicione o SwitchCustomComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule // Adicione ReactiveFormsModule aqui
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

3. Exemplo Completo de Uso
Abaixo está um exemplo de como usar ambos os componentes no seu app.component.ts e app.component.html.

app.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  mainForm!: FormGroup;

  selectOptions = [
    { value: 'opcao1', label: 'Opção A' },
    { value: 'opcao2', label: 'Opção B' },
    { value: 'opcao3', label: 'Opção C' },
  ];

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.mainForm = this.fb.group({
      mySelect: ['opcao2'],
      mySwitch: [true]
    });
  }

  toggleSelectDisable(): void {
    const control = this.mainForm.get('mySelect');
    if (control) {
      control.disabled ? control.enable() : control.disable();
    }
  }

  toggleSwitchDisable(): void {
    const control = this.mainForm.get('mySwitch');
    if (control) {
      control.disabled ? control.enable() : control.disable();
    }
  }
}

app.component.html
<div class="main-container">
  <form [formGroup]="mainForm">
    <app-select-custom
      label="Escolha um item"
      [options]="selectOptions"
      formControlName="mySelect">
    </app-select-custom>

    <app-switch-custom
      label="Ativar recurso"
      formControlName="mySwitch">
    </app-switch-custom>

    <div class="button-group">
      <button type="button" (click)="toggleSelectDisable()">
        Alternar Select
      </button>
      <button type="button" (click)="toggleSwitchDisable()">
        Alternar Switch
      </button>
    </div>
  </form>
</div>
