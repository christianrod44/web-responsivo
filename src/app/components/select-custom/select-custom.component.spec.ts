import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { SelectCustomComponent } from './select-custom.component';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

describe('SelectCustomComponent', () => {
  let component: SelectCustomComponent;
  let fixture: ComponentFixture<SelectCustomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectCustomComponent ],
      imports: [ ReactiveFormsModule ] // Importe ReactiveFormsModule para testes de formulário
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectCustomComponent);
    component = fixture.componentInstance; // Correção: Usar componentInstance
    fixture.detectChanges();
  });

  // Teste 1: Verificar se o componente é criado com sucesso.
  it('deve criar o componente', () => {
    expect(component).toBeTruthy();
  });

  // Teste 2: Verificar se o rótulo (label) é exibido corretamente.
  it('deve exibir o rótulo correto', () => {
    const testLabel = 'Opção 1';
    component.label = testLabel;
    fixture.detectChanges();
    const labelElement: HTMLElement = fixture.nativeElement.querySelector('.select-container label');
    expect(labelElement.textContent).toContain(testLabel);
  });

  // Teste 4: Verificar se o estado desabilitado funciona.
  it('não deve desabilitar o select quando o input `disabled` for false', () => {
    component.disabled = false;
    fixture.detectChanges();
    const selectElement: HTMLSelectElement = fixture.nativeElement.querySelector('.select-wrapper select');
    expect(selectElement.disabled).toBeFalse();
  });

  // Teste 5: Verificar se as opções são renderizadas corretamente.
  it('deve renderizar as opções fornecidas', () => {
    component.options = [
      { value: 'opcao1', label: 'Opção 1' },
      { value: 'opcao2', label: 'Opção 2' },
    ];
    fixture.detectChanges();
    const optionElements = fixture.nativeElement.querySelectorAll('option');
    expect(optionElements.length).toBe(3); // Inclui a opção de placeholder
    expect(optionElements[1].textContent).toBe('Opção 1');
    expect(optionElements[1].value).toBe('opcao1');
  });

  // Teste 6: Verificar se o evento `selectionChange` é emitido corretamente.
  it('deve emitir o evento selectionChange com o valor correto quando a seleção muda', () => {
    // Espionar o EventEmitter para saber se ele foi chamado
    spyOn(component.selectionChange, 'emit');

    // Configurar opções e o valor inicial
    component.options = [
      { value: 'opcao1', label: 'Opção 1' },
      { value: 'opcao2', label: 'Opção 2' },
    ];
    component.selectControl.setValue('opcao1');
    fixture.detectChanges();

    // Selecionar o elemento <select>
    const selectElement = fixture.debugElement.query(By.css('select'));

    // Simular a mudança de valor
    selectElement.triggerEventHandler('change', { target: { value: 'opcao2' } });
    fixture.detectChanges();

    // Verificar se o evento foi emitido com o valor 'opcao2'
    expect(component.selectionChange.emit).toHaveBeenCalledWith('opcao2');
  });
});
