import { Component, Input } from "@angular/core";
import { ElementConfigModel } from "../../models/element.model";
import { BaseElementComponent } from "../base-element.component";
import { SharedModule } from "../../../../shared/shared.module";

export type ImageExtraConfig = {src?: string, altText?: string}

@Component({
  selector: 'widget-image',
  template: `
    <img [ngClass]="generalConfig?.cssClasses"
         [ngStyle]="generalConfig | mapConfigToStyle : tempConfig"
         class="resizable-tag"
         (mousedown)="onMouseDown($event)"
         (mousemove)="onMouseMove($event)"
         (mouseup)="onMouseUp($event)"
         (mouseleave)="onMouseLeave($event)"
         [src]="extraConfig?.src"
         [alt]="extraConfig?.altText">
  `,
  standalone: true,
  imports: [SharedModule]
})
export class ImgComponent extends BaseElementComponent<ImageExtraConfig> {
}
