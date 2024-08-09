import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapConfigToStylePipe } from "./pipes/map-config-to-style.pipe";
import { SortBySequencePipe } from "./pipes/sort-by-sequence.pipe";

const PIPES = [
  MapConfigToStylePipe,
  SortBySequencePipe
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
