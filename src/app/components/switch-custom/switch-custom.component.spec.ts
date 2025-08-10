import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { SwitchCustomComponent } from './switch-custom.component';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

describe('SwitchCustomComponent', () => {
  let component: SwitchCustomComponent;
  let fixture: ComponentFixture<SwitchCustomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SwitchCustomComponent ],
      imports: [ ReactiveFormsModule ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SwitchCustomComponent);
    component = fixture.componentInstance; // Correção: Usar componentInstance
    fixture.detectChanges();
  });

  // Teste 1: Verificar se o componente é criado com sucesso.
  it('deve criar o componente', () => {
    expect(component).toBeTruthy();
  });

  // Teste 2: Verificar se o rótulo (label) é exibido corretamente.
  it('deve exibir o rótulo correto', () => {
    const testLabel = 'Ativar Notificações';
    component.label = testLabel;
    fixture.detectChanges();
    const labelElement: HTMLElement = fixture.nativeElement.querySelector('.switch-label');
    expect(labelElement.textContent).toContain(testLabel);
  });

  // Teste 4: Verificar se o estado desabilitado funciona.
  it('não deve desabilitar o switch quando o input `disabled` for false', () => {
    component.disabled = false;
    fixture.detectChanges();
    const switchInput: HTMLInputElement = fixture.nativeElement.querySelector('.switch input');
    expect(switchInput.disabled).toBeFalse();
  });

  // Teste 5: Verificar se o evento `valueChange` é emitido corretamente.
  it('deve emitir o evento valueChange com o valor correto ao ser clicado', () => {
    // Espionar o EventEmitter para saber se ele foi chamado
    spyOn(component.valueChange, 'emit');

    // Mudar o estado do switch para 'false' para que o clique mude o valor para 'true'.
    component.switchControl.setValue(false);
    fixture.detectChanges();

    // Selecionar o input do switch
    const switchInput = fixture.debugElement.query(By.css('.switch input'));

    // Simular o clique no input
    switchInput.triggerEventHandler('change', { target: { checked: true } });
    fixture.detectChanges();

    // Verificar se o evento foi emitido com o valor `true`
    expect(component.valueChange.emit).toHaveBeenCalledWith(true);
  });
});
