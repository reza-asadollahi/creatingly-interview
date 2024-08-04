import { Component, Injector, Input, OnChanges, SimpleChanges } from "@angular/core";
import { ELEMENT_COMPONENT_MAP, ElementType } from "./element.dictionary";
import { ElementConfigModel, ElementDetailModel } from "./element.model";
import { BaseElementComponent } from "./base-element.component";

@Component({
  selector: 'app-dynamic-element',
  template: `
    @if (component) {
      <ng-container *ngComponentOutlet="component; inputs: elementDetail || {}"></ng-container>
    }
  `,
})
export class DynamicElementComponent implements OnChanges {
  @Input() elementType?: ElementType
  @Input() elementDetail?: ElementDetailModel | any

  component?: BaseElementComponent | any

  ngOnChanges(changes: SimpleChanges): void {
    // find and set component according to elementType
    if (changes.hasOwnProperty('elementType')) {
      const currentType = changes['elementType'].currentValue
      this.component = ELEMENT_COMPONENT_MAP.get(currentType)
    }
  }

}
