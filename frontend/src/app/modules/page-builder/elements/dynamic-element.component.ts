import { Component, Input, OnChanges, SimpleChanges } from "@angular/core";
import { ELEMENT_COMPONENT_MAP, ElementType } from "./element.dictionary";
import { ElementInfoModel } from "../models/element.model";
import { BaseElementComponent } from "./base-element.component";

@Component({
  selector: 'app-dynamic-element',
  template: `
    @if (component) {
      <ng-container *ngComponentOutlet="component; inputs: elementInfo || {}"></ng-container>
    }
  `,
})
export class DynamicElementComponent implements OnChanges {
  @Input() elementType?: ElementType
  @Input() elementInfo?: ElementInfoModel | any

  component?: BaseElementComponent | any

  ngOnChanges(changes: SimpleChanges): void {
    // find and set component according to elementType
    if (changes.hasOwnProperty('elementType')) {
      const currentType = changes['elementType'].currentValue
      this.component = ELEMENT_COMPONENT_MAP.get(currentType)
    }
  }

}
