import { ElementConfigModel } from "../page-builder/models/element.model";

export interface ProjectModel {
  id?: string,
  name: string,
  owner?: string,
  styles?: ElementConfigModel
}
