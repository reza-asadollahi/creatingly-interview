import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from "@angular/router";
import { PageBuilderComponent } from "./page-builder.component";
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';

const config: SocketIoConfig = { url: 'http://localhost:3000', options: {} };


const routes : Routes = [
  { path: '', component: PageBuilderComponent},
]

@NgModule({
  declarations: [
    PageBuilderComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SocketIoModule.forRoot(config)
  ]
})
export class PageBuilderModule { }
