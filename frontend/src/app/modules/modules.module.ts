import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectsComponent } from './projects/projects.component';
import { PageBuilderComponent } from './page-builder/page-builder.component';
import { RouterModule, Routes } from "@angular/router";

const routes: Routes = [
  { path: '', component: ProjectsComponent}
];


@NgModule({
  declarations: [
    ProjectsComponent,
    PageBuilderComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class ModulesModule { }
