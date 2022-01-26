import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EndpointOptionsComponent } from './endpoint-options.component';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SelectButtonModule } from 'primeng/selectbutton';
import { TooltipModule } from 'primeng/tooltip';
import { InputTextModule } from 'primeng/inputtext';
import { KeyFilterModule } from 'primeng/keyfilter';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { InputSwitchModule } from 'primeng/inputswitch';
import { TabViewModule } from 'primeng/tabview';
import { RippleModule } from 'primeng/ripple';

@NgModule({
  imports: [
    CommonModule,
    ButtonModule,
    DropdownModule,
    FormsModule,
    SelectButtonModule,
    TooltipModule,
    InputTextModule,
    KeyFilterModule,
    ToggleButtonModule,
    InputSwitchModule,
    TabViewModule,
    ReactiveFormsModule,
    RippleModule,
  ],
  declarations: [EndpointOptionsComponent],
  exports: [EndpointOptionsComponent],
})
export class EndpointOptionsModule {}
