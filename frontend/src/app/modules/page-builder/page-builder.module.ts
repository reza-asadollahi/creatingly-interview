import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from "@angular/router";
import { PageBuilderComponent } from "./page-builder.component";
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { WorkspaceComponent } from './workspace/workspace.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { ELEMENT_COMPONENT_LIST } from "./elements/element.dictionary";
import { DynamicElementComponent } from "./elements/dynamic-element.component";
import {
  MatAccordion, MatExpansionModule,
  MatExpansionPanel,
  MatExpansionPanelDescription,
  MatExpansionPanelTitle
} from "@angular/material/expansion";
import { SocketService } from "./socket.service";


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
    ...ELEMENT_COMPONENT_LIST,
    MatExpansionModule
  ],
  providers: [
    SocketService
  ]
})
export class PageBuilderModule { }
