import {NgModule} from '@angular/core';
import {
    MatButtonModule,
    MatIconModule,
    MatExpansionModule,
    MatDialogModule
} from "@angular/material";

const modules = [
  MatIconModule,
  MatButtonModule,
  MatExpansionModule,
  MatDialogModule
];

@NgModule({
  imports: modules,
  exports: modules
})
export class MaterialModule {}
