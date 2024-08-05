import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapConfigToStylePipe } from "./pipes/map-config-to-style.pipe";

const PIPES = [
  MapConfigToStylePipe
]

@NgModule({
  declarations: [
    ...PIPES
  ],
  imports: [
    CommonModule
  ],
  exports: [
    CommonModule,
    ...PIPES
  ]
})
export class SharedModule { }
