import { Component } from '@angular/core';
import { ELEMENTS_TYPES, ElementType } from "../elements/element.dictionary";
import { ELEMENT_ICON_MAP } from "../elements/elements.config";

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.scss'
})
export class ToolbarComponent {
  selectableElements = ELEMENTS_TYPES
  elementIcons = ELEMENT_ICON_MAP

  onDragStart(event: DragEvent, component: ElementType) {
    event.dataTransfer?.setData('elementType', component);
  }
}
