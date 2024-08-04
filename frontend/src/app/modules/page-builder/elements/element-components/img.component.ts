import { Component, Input } from "@angular/core";
import { ElementConfigModel } from "../../models/element.model";
import { BaseElementComponent } from "../base-element.component";
import { SharedModule } from "../../../../shared/shared.module";

@Component({
  selector: 'widget-image',
  template: `
    <img [class]="generalConfig?.cssClasses"
         [style]="generalConfig | mapConfigToStyle"
         [src]="extraConfig?.src"
         [alt]="extraConfig?.altText">
  `,
  standalone: true,
  imports: [SharedModule]
})
export class ImgComponent extends BaseElementComponent<{src?: string, altText?: string}> {
}
