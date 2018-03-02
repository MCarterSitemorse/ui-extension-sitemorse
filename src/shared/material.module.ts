import {NgModule} from '@angular/core';
import {
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatTooltipModule
} from "@angular/material";

const modules = [
  MatIconModule,
  MatButtonModule,
  MatTooltipModule,
  MatProgressSpinnerModule
];

@NgModule({
  imports: modules,
  exports: modules
})
export class MaterialModule {}
