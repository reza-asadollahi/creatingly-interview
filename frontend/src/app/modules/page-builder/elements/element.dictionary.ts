import { DivComponent } from "./element-components/div.component";
import { HeadingComponent } from "./element-components/heading.component";
import { BaseElementComponent } from "./base-element.component";
import { ImgComponent } from "./element-components/img.component";
import { LinkComponent } from "./element-components/link.component";

/**
 * for adding new Element follow these steps:
 * 1. create a standalone component that inherit from BaseElementComponent
 * 2. define a new unique type for that component in ElementType type
 * 3. assign that type to your component in ELEMENT_COMPONENT_MAP
 * 4. add your component ELEMENT_COMPONENT_LIST array (due to Angular's AoT compiler we cant create list of component of the map dynamically)
 * (optional) 5. you can add your default configs for that component in "elements.config.ts" file
 * */

/** these are possible unique type that will assign to single Element component */
export type ElementType = 'div' | 'heading' | 'image' | 'link'

const ELEMENT_COMPONENT_MAP = new Map<ElementType, BaseElementComponent | any>()
ELEMENT_COMPONENT_MAP.set('div', DivComponent)
ELEMENT_COMPONENT_MAP.set('heading', HeadingComponent)
ELEMENT_COMPONENT_MAP.set('image', ImgComponent)
ELEMENT_COMPONENT_MAP.set('link', LinkComponent)

const ELEMENT_COMPONENT_LIST = [
  DivComponent,
  HeadingComponent,
  ImgComponent,
  LinkComponent
]

const ELEMENTS_TYPES = Array.from(ELEMENT_COMPONENT_MAP.keys())

export {
  ELEMENT_COMPONENT_MAP,
  ELEMENT_COMPONENT_LIST,
  ELEMENTS_TYPES,
}
