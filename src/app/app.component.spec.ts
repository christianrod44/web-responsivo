import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { SelectCustomComponent } from './components/select-custom/select-custom.component';
import { SwitchCustomComponent } from './components/switch-custom/switch-custom.component';
import { ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        ReactiveFormsModule, // <-- Importante: O ReactiveFormsModule deve ser importado aqui.
      ],
      declarations: [
        AppComponent,
        SelectCustomComponent,
        SwitchCustomComponent,
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // Teste 1: Verificar se o componente principal é criado.
  it('deve criar o aplicativo', () => {
    expect(component).toBeTruthy();
  });

  // Teste 2: Verificar se os componentes personalizados são renderizados.
  it('deve conter o componente SelectCustom e SwitchCustom', () => {
    const selectComponent = fixture.debugElement.query(By.directive(SelectCustomComponent));
    const switchComponent = fixture.debugElement.query(By.directive(SwitchCustomComponent));
    expect(selectComponent).toBeTruthy();
    expect(switchComponent).toBeTruthy();
  });

  // Teste 3: Verificar se o formulário e o FormControl são inicializados corretamente.
  it('deve inicializar o formulário e o FormControl', () => {
    expect(component.mainForm).toBeInstanceOf(FormGroup);
    expect(component.mainForm.get('mySelect')).toBeInstanceOf(FormControl);
    expect(component.mainForm.get('mySwitch')).toBeInstanceOf(FormControl);
  });

  // Teste 4: Verificar se o método `toggleSelectDisable` funciona.
  it('deve desabilitar ou habilitar o controle do select quando o botão é clicado', () => {
    // Espionar o método para garantir que ele seja chamado
    spyOn(component, 'toggleSelectDisable').and.callThrough();
    const buttons = fixture.nativeElement.querySelectorAll('button');
    const selectButton = buttons[0]; // Assumindo que o primeiro botão é para o select

    // O controle começa habilitado, então o primeiro clique deve desabilitá-lo.
    expect(component.mainForm.get('mySelect')?.disabled).toBeFalse();
    selectButton.click();
    fixture.detectChanges();
    expect(component.toggleSelectDisable).toHaveBeenCalled();
    expect(component.mainForm.get('mySelect')?.disabled).toBeTrue();

    // Um segundo clique deve habilitá-lo novamente.
    selectButton.click();
    fixture.detectChanges();
    expect(component.toggleSelectDisable).toHaveBeenCalledTimes(2);
    expect(component.mainForm.get('mySelect')?.disabled).toBeFalse();
  });

  // Teste 5: Verificar se o método `toggleSwitchDisable` funciona.
  it('deve desabilitar ou habilitar o switchControl quando o botão é clicado', () => {
    spyOn(component, 'toggleSwitchDisable').and.callThrough();
    const buttons = fixture.nativeElement.querySelectorAll('button');
    const switchButton = buttons[1]; // Assumindo que o segundo botão é para o switch

    expect(component.mainForm.get('mySwitch')?.disabled).toBeFalse();
    switchButton.click();
    fixture.detectChanges();
    expect(component.toggleSwitchDisable).toHaveBeenCalled();
    expect(component.mainForm.get('mySwitch')?.disabled).toBeTrue();

    switchButton.click();
    fixture.detectChanges();
    expect(component.toggleSwitchDisable).toHaveBeenCalledTimes(2);
    expect(component.mainForm.get('mySwitch')?.disabled).toBeFalse();
  });
});
