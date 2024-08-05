import { ElementType } from "../elements/element.dictionary";

export interface ElementConfigModel {
  // styles
  width?: string,
  height?: string,
  position?: 'absolute' | 'relative',
  zIndex?: number,
  top?: number
  left?: number
  right?: number
  button?: number
  color?: string
  backgroundColor?: string

  cssClasses?: string
}

/** this class is used to config ElementComponent
 * !important, this model fields must match with "BaseElementComponent" inputs (we can create a mapper instead but in this case it is okay) */
export interface ElementInfoModel {
  id?: string,
  elementType: ElementType,
  generalConfig?: ElementConfigModel
  content?: string
  sequence?: number
  lockedByUser?: string
  extraConfig?: any
}
