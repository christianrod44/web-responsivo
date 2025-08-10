import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { SelectCustomComponent } from './components/select-custom/select-custom.component';
import { SwitchCustomComponent } from './components/switch-custom/switch-custom.component';

@NgModule({
  declarations: [
    AppComponent,
    SelectCustomComponent,
    SwitchCustomComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }