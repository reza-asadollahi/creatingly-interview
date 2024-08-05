import { Component } from '@angular/core';
import { ELEMENTS_TYPES, ElementType } from "../elements/element.dictionary";
import { ELEMENT_ICON_MAP } from "../elements/elements.config";
import { Observable, Subscription } from "rxjs";
import { ElementInfoModel } from "../models/element.model";
import { PageBuilderService } from "../page-builder.service";

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.scss'
})
export class ToolbarComponent {
  selectableElements = ELEMENTS_TYPES
  elementIcons = ELEMENT_ICON_MAP
  projectElements$: Observable<ElementInfoModel[]>;

  onDragStart(event: DragEvent, component: ElementType) {
    event.dataTransfer?.setData('elementType', component);
  }

  constructor(private pageBuilderService: PageBuilderService) {
    this.projectElements$ = this.pageBuilderService.projectElements$
  }
}
