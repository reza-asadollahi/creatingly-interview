import { Component, Input } from "@angular/core";
import { ElementConfigModel } from "../element.model";
import { BaseElementComponent } from "../base-element.component";
import { SharedModule } from "../../../../shared/shared.module";

export type HeadingExtraConfig  = {headSize?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' }

@Component({
  selector: 'widget-head',
  template: `
    @switch (extraConfig?.headSize) {
      @case ('h1') {
        <h1 [class]="generalConfig?.cssClasses"
            [style]="generalConfig | mapConfigToStyle">
          {{ content }}
        </h1>
      }
      @case ('h2') {
        <h2 [class]="generalConfig?.cssClasses"
            [style]="generalConfig | mapConfigToStyle">
          {{ content }}
        </h2>
      }
      @case ('h3') {
        <h3 [class]="generalConfig?.cssClasses"
            [style]="generalConfig | mapConfigToStyle">
          {{ content }}
        </h3>
      }
      @case ('h4') {
        <h4 [class]="generalConfig?.cssClasses"
            [style]="generalConfig | mapConfigToStyle">
          {{ content }}
        </h4>
      }
      @case ('h5') {
        <h5 [class]="generalConfig?.cssClasses"
            [style]="generalConfig | mapConfigToStyle">
          {{ content }}
        </h5>
      }
      @case ('h6') {
        <h6 [class]="generalConfig?.cssClasses"
            [style]="generalConfig | mapConfigToStyle">
          {{ content }}
        </h6>
      }
      @default {
        <h2 [class]="generalConfig?.cssClasses"
            [style]="generalConfig | mapConfigToStyle">
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
