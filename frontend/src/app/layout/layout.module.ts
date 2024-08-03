import { NgModule } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { LayoutComponent } from "./layout.component";
import { RouterModule, Routes } from "@angular/router";
import { HeaderComponent } from './header/header.component';
import { authGuardCanActivateChildFN, authGuardCanActivateFN } from "../auth/services/auth-guard.service";
import { MatMenu, MatMenuItem, MatMenuTrigger } from "@angular/material/menu";

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'auth',
        loadChildren: () => import("../auth/auth.module").then(m => m.AuthModule)
      },
      {
        path: '',
        // canActivate: [authGuardCanActivateFN],
        // canActivateChild: [authGuardCanActivateChildFN],
        loadChildren: () => import("../modules/modules.module").then(m => m.ModulesModule)
      },
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
    NgOptimizedImage,
    MatMenu,
    MatMenuItem,
    MatMenuTrigger
  ]
})
export class LayoutModule {
}
