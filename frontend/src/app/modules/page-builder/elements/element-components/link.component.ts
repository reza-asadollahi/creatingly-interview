import { Component } from "@angular/core";
import { BaseElementComponent } from "../base-element.component";
import { SharedModule } from "../../../../shared/shared.module";
import { RouterLink } from "@angular/router";

export type LinkExtraConfig = {
  href: string,
  target?: '_blank' | '_parent' | '_self'
}

@Component({
  selector: 'widget-link',
  template: `
    <a [ngClass]="generalConfig?.cssClasses"
       [ngStyle]="generalConfig | mapConfigToStyle : tempConfig"
       [routerLink]="extraConfig?.href"
       [target]="extraConfig?.target">
      {{ content }}
    </a>`,
  standalone: true,
  imports: [SharedModule, RouterLink]
})
export class LinkComponent extends BaseElementComponent<LinkExtraConfig>{
}
