import { Component } from "@angular/core";
import { BaseElementComponent } from "../base-element.component";
import { SharedModule } from "../../../../shared/shared.module";

@Component({
  selector: 'widget-div',
  template: `<div class="resizable-tag"
                  (mousedown)="onMouseDown($event)"
                  (mousemove)="onMouseMove($event)"
                  (mouseup)="onMouseUp($event)"
                  (mouseleave)="onMouseLeave($event)"
                  [ngClass]="generalConfig?.cssClasses"
                  [ngStyle]="generalConfig | mapConfigToStyle : tempConfig">

    {{content}}
  </div>`,
  standalone: true,
  imports: [SharedModule]
})
export class DivComponent extends BaseElementComponent {
}
