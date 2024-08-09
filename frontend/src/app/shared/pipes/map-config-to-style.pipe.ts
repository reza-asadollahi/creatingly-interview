import { Pipe, PipeTransform } from "@angular/core";
import { ElementConfigModel } from "../../modules/page-builder/models/element.model";

const IGNORED_CONFIG_KEYS = ['id', 'cssClasses']

@Pipe({name: 'mapConfigToStyle', pure: false})
export class MapConfigToStylePipe implements PipeTransform {
  transform(config?: ElementConfigModel, higherPriorityConfig: Partial<ElementConfigModel> = {}): any {
    if(!config || typeof config !== "object")
      return {}

    const finalStyle: {[key: string]: any } = {}

    for(let key  of Object.keys(config)) {
      if (!IGNORED_CONFIG_KEYS.includes(key)) {
        finalStyle[key] = higherPriorityConfig[key as keyof ElementConfigModel] !== undefined ? String(higherPriorityConfig[key as keyof ElementConfigModel]) : String(config[key as keyof ElementConfigModel])
      }
    }

    return finalStyle
  }
}
