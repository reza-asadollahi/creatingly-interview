import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectsComponent } from './projects/projects.component';
import { RouterModule, Routes } from "@angular/router";


const routes: Routes = [
  { path: 'projects',  loadChildren: () => import("./projects/projects.module").then(m => m.ProjectsModule)},
  { path: 'page-builder', loadChildren: () => import("./page-builder/page-builder.module").then(m => m.PageBuilderModule)},
  { path: '**', redirectTo: 'projects'}
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class ModulesModule { }
