import { ElementConfigModel } from "./element.model";
import { ElementType } from "./element.dictionary";

/** setup default config for elements */
const ELEMENT_COMPONENT_DEFAULT_CONFIG_MAP = new Map<ElementType, ElementConfigModel>()
ELEMENT_COMPONENT_DEFAULT_CONFIG_MAP.set('div', {
  width: '100%',
  height: '50px',
  position: 'relative',
  backgroundColor: 'red'
})
ELEMENT_COMPONENT_DEFAULT_CONFIG_MAP.set('heading', {})

/** setup default extra config for elements */
const ELEMENT_COMPONENT_DEFAULT_EXTRA_CONFIG_MAP = new Map<ElementType, any>()
ELEMENT_COMPONENT_DEFAULT_EXTRA_CONFIG_MAP.set('div', {})
ELEMENT_COMPONENT_DEFAULT_EXTRA_CONFIG_MAP.set('heading', {})
ELEMENT_COMPONENT_DEFAULT_EXTRA_CONFIG_MAP.set('image', { src: '/assets/styles/creatingly-poster.png'})
ELEMENT_COMPONENT_DEFAULT_EXTRA_CONFIG_MAP.set('link', {})

export function getDefaultConfigForElement(elementType: ElementType) {
  return ELEMENT_COMPONENT_DEFAULT_CONFIG_MAP.get(elementType) || {};
}

export function getDefaultExtraConfigForElement(elementType: ElementType) {
  return ELEMENT_COMPONENT_DEFAULT_EXTRA_CONFIG_MAP.get(elementType) || {};
}
