import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from "./layout.component";
import { RouterModule, Routes } from "@angular/router";

const routes: Routes = [
  { path: '',
    component: LayoutComponent,
    children: [
      { path: '', loadChildren: () => import("../modules/modules.module").then(m => m.ModulesModule)}
    ]
  }
];

@NgModule({
  declarations: [
    LayoutComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class LayoutModule { }
