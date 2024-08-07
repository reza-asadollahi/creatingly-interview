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
import { SharedModule } from "../../shared/shared.module";
import { ConfigFormComponent } from "./config-form/config-form.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatFormField, MatFormFieldModule } from "@angular/material/form-field";
import { MatOption, MatSelect } from "@angular/material/select";
import { MatInput, MatInputModule } from "@angular/material/input";


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
    ConfigFormComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SocketIoModule.forRoot(config),
    // importing stand alone components
    ...ELEMENT_COMPONENT_LIST,
    MatExpansionModule,
    SharedModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatSelect,
    MatOption,
  ],
  providers: [
    SocketService
  ]
})
export class PageBuilderModule { }
