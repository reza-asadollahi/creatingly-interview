import { Component } from "@angular/core";
import { BaseElementComponent } from "../base-element.component";
import { SharedModule } from "../../../../shared/shared.module";

export type HeadingExtraConfig  = {headSize?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' }

@Component({
  selector: 'widget-head',
  template: `
    @switch (extraConfig?.headSize) {
      @case ('h1') {
        <h1 [ngClass]="generalConfig?.cssClasses"
            [ngStyle]="generalConfig | mapConfigToStyle : tempConfig"
            class="resizable-tag"
            (mousedown)="onMouseDown($event)"
            (mousemove)="onMouseMove($event)"
            (mouseup)="onMouseUp($event)"
            (mouseleave)="onMouseLeave($event)">
          {{ content }}
        </h1>
      }
      @case ('h2') {
        <h2 [ngClass]="generalConfig?.cssClasses"
            [ngStyle]="generalConfig | mapConfigToStyle : tempConfig"
            class="resizable-tag"
            (mousedown)="onMouseDown($event)"
            (mousemove)="onMouseMove($event)"
            (mouseup)="onMouseUp($event)"
            (mouseleave)="onMouseLeave($event)">
          {{ content }}
        </h2>
      }
      @case ('h3') {
        <h3 [ngClass]="generalConfig?.cssClasses"
            [ngStyle]="generalConfig | mapConfigToStyle : tempConfig"
            class="resizable-tag"
            (mousedown)="onMouseDown($event)"
            (mousemove)="onMouseMove($event)"
            (mouseup)="onMouseUp($event)"
            (mouseleave)="onMouseLeave($event)">
          {{ content }}
        </h3>
      }
      @case ('h4') {
        <h4 [ngClass]="generalConfig?.cssClasses"
            [ngStyle]="generalConfig | mapConfigToStyle : tempConfig"
            class="resizable-tag"
            (mousedown)="onMouseDown($event)"
            (mousemove)="onMouseMove($event)"
            (mouseup)="onMouseUp($event)"
            (mouseleave)="onMouseLeave($event)">
          {{ content }}
        </h4>
      }
      @case ('h5') {
        <h5 [ngClass]="generalConfig?.cssClasses"
            [ngStyle]="generalConfig | mapConfigToStyle : tempConfig"
            class="resizable-tag"
            (mousedown)="onMouseDown($event)"
            (mousemove)="onMouseMove($event)"
            (mouseup)="onMouseUp($event)"
            (mouseleave)="onMouseLeave($event)">
          {{ content }}
        </h5>
      }
      @case ('h6') {
        <h6 [ngClass]="generalConfig?.cssClasses"
            [ngStyle]="generalConfig | mapConfigToStyle : tempConfig"
            class="resizable-tag"
            (mousedown)="onMouseDown($event)"
            (mousemove)="onMouseMove($event)"
            (mouseup)="onMouseUp($event)"
            (mouseleave)="onMouseLeave($event)">
          {{ content }}
        </h6>
      }
      @default {
        <h2 [ngClass]="generalConfig?.cssClasses"
            [ngStyle]="generalConfig | mapConfigToStyle : tempConfig"
            class="resizable-tag"
            (mousedown)="onMouseDown($event)"
            (mousemove)="onMouseMove($event)"
            (mouseup)="onMouseUp($event)"
            (mouseleave)="onMouseLeave($event)">
          {{ content }}
        </h2>
      }
    }
  `,
  standalone: true,
  imports: [SharedModule]
})
export class HeadingComponent extends BaseElementComponent<HeadingExtraConfig> {
}
