import { NgModule } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { LayoutComponent } from "./layout.component";
import { RouterModule, Routes } from "@angular/router";
import { HeaderComponent } from './header/header.component';

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
    LayoutComponent,
    HeaderComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    NgOptimizedImage
  ]
})
export class LayoutModule { }
