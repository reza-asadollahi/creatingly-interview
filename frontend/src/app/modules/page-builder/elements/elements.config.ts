import { ElementConfigModel } from "../models/element.model";
import { ElementType } from "./element.dictionary";
import { HeadingExtraConfig } from "./element-components/heading.component";
import { LinkExtraConfig } from "./element-components/link.component";
import { ImageExtraConfig } from "./element-components/img.component";

/** setup default config for elements */
const ELEMENT_COMPONENT_DEFAULT_CONFIG_MAP = new Map<ElementType, ElementConfigModel>()
ELEMENT_COMPONENT_DEFAULT_CONFIG_MAP.set('div', {
  width: '100%',
  height: '50px',
  position: 'relative',
  backgroundColor: '#ccc'
})
ELEMENT_COMPONENT_DEFAULT_CONFIG_MAP.set('heading', {})
ELEMENT_COMPONENT_DEFAULT_CONFIG_MAP.set('image', { width: '100%', height: 'auto' })

/** setup default extra config for elements */
const ELEMENT_COMPONENT_DEFAULT_EXTRA_CONFIG_MAP = new Map<ElementType, any>()
ELEMENT_COMPONENT_DEFAULT_EXTRA_CONFIG_MAP.set('div', {})
ELEMENT_COMPONENT_DEFAULT_EXTRA_CONFIG_MAP.set('heading', <HeadingExtraConfig>{headSize: "h2"})
ELEMENT_COMPONENT_DEFAULT_EXTRA_CONFIG_MAP.set('image', <ImageExtraConfig>{ src: '/assets/styles/creatingly-poster.png'})
ELEMENT_COMPONENT_DEFAULT_EXTRA_CONFIG_MAP.set('link', <LinkExtraConfig>{})

function getDefaultConfigForElement(elementType: ElementType) {
  return ELEMENT_COMPONENT_DEFAULT_CONFIG_MAP.get(elementType) || {};
}

function getDefaultExtraConfigForElement(elementType: ElementType) {
  return ELEMENT_COMPONENT_DEFAULT_EXTRA_CONFIG_MAP.get(elementType) || {};
}


/** setup icon img src path for elements */
const ELEMENT_ICON_MAP = new Map<ElementType, any>()
ELEMENT_ICON_MAP.set('div', "/assets/svg/square.svg")
ELEMENT_ICON_MAP.set('image', "/assets/svg/image-square.svg")
ELEMENT_ICON_MAP.set('link', "/assets/svg/link-square.svg")
ELEMENT_ICON_MAP.set('heading', "/assets/svg/square-t.svg")

export {
  getDefaultConfigForElement,
  getDefaultExtraConfigForElement,
  ELEMENT_ICON_MAP
}
