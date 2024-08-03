import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from "@angular/router";
import { PageBuilderComponent } from "./page-builder.component";

const routes : Routes = [
  { path: '', component: PageBuilderComponent},
]

@NgModule({
  declarations: [
    PageBuilderComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class PageBuilderModule { }
