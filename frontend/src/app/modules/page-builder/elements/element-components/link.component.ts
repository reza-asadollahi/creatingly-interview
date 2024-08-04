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
    <a [class]="generalConfig?.cssClasses"
       [style]="generalConfig | mapConfigToStyle"
       [routerLink]="extraConfig?.href"
       [target]="extraConfig?.target">
      {{ content }}
    </a>`,
  standalone: true,
  imports: [SharedModule, RouterLink]
})
export class LinkComponent extends BaseElementComponent<LinkExtraConfig>{
}
