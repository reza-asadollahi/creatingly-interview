import { Component } from '@angular/core';
import { ELEMENTS_TYPES, ElementType } from "../elements/element.dictionary";

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.scss'
})
export class ToolbarComponent {
  selectableElements = ELEMENTS_TYPES

  onDragStart(event: DragEvent, component: ElementType) {
    event.dataTransfer?.setData('elementType', component);
  }
}
