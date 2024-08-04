import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from "@angular/router";
import { PageBuilderComponent } from "./page-builder.component";
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { WorkspaceComponent } from './workspace/workspace.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { ELEMENT_COMPONENT_LIST } from "./elements/element.dictionary";
import { DynamicElementComponent } from "./elements/dynamic-element.component";


const config: SocketIoConfig = { url: 'http://localhost:3000', options: {} };


const routes : Routes = [
  { path: '', component: PageBuilderComponent},
]

@NgModule({
  declarations: [
    PageBuilderComponent,
    WorkspaceComponent,
    ToolbarComponent,
    DynamicElementComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SocketIoModule.forRoot(config),
    // importing stand alone components
    ...ELEMENT_COMPONENT_LIST
  ]
})
export class PageBuilderModule { }
