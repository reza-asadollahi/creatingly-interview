import { Pipe, PipeTransform } from "@angular/core";
import { ElementInfoModel } from "../../modules/page-builder/models/element.model";

@Pipe({name: 'sortBySequence'})
export class SortBySequencePipe implements PipeTransform {
  transform(elementList?: ElementInfoModel[] | null): ElementInfoModel[] {
    if (!elementList)
      return []

    // better to use toSorted(...)  [...elementList].sort(...)
    const sortedList = [...elementList].sort((elA, elB) => (elA.sequence ?? 0) - (elB.sequence ?? 0))
    return sortedList
  }
}
