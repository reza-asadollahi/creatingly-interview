import { Component, Input } from "@angular/core";
import { ElementConfigModel } from "../models/element.model";
import { ElementType } from "./element.dictionary";

/**
 * To Create Your own custom element, create a standalone component that inherit from BaseElementComponent then assign new type to your component in the "element.dictionary.ts" file
 * the generic type "T" is used for extraConfig property
 * */
@Component({template: ""})
export abstract class BaseElementComponent<T = any> {
  @Input() id?: string
  @Input() elementType?: ElementType
  @Input() generalConfig?: ElementConfigModel
  @Input() content?: string
  @Input() sequence?: number
  @Input() lockedByUser?: string
  @Input() extraConfig?: T
}
