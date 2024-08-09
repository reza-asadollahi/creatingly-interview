import { ElementType } from "../elements/element.dictionary";

export interface ElementConfigModel {
  // styles
  width?: string,
  height?: string,
  position?: 'absolute' | 'relative',
  zIndex?: number,
  top?: string
  left?: string
  right?: string
  button?: string
  color?: string
  backgroundColor?: string

  cssClasses?: string
}

/** this class is used to config ElementComponent
 * !important, this model fields must match with "BaseElementComponent" inputs (we can create a mapper instead but in this case it is okay) */
export interface ElementInfoModel {
  id?: string,
  _tempId?: string,
  elementType: ElementType,
  generalConfig?: ElementConfigModel
  content?: string
  sequence?: number
  extraConfig?: any
  lockedByUser?: UserModel
}
