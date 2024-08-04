import { Pipe, PipeTransform } from "@angular/core";
import { ElementConfigModel } from "../../modules/page-builder/models/element.model";

const IGNORED_CONFIG_KEYS = ['id', 'cssClasses']

@Pipe({name: 'mapConfigToStyle'})
export class MapConfigToStylePipe implements PipeTransform {
  transform(config?: ElementConfigModel): any {
    if(!config || typeof config !== "object")
      return {}

    const finalStyle: {[key: string]: any } = {}

    // using Object.keys(config) instead of (for ... in) for performance issues
    for(let key  of Object.keys(config))
      if(!IGNORED_CONFIG_KEYS.includes(key))
        finalStyle[key] = String(config[key as keyof ElementConfigModel])

    return finalStyle
  }
}
