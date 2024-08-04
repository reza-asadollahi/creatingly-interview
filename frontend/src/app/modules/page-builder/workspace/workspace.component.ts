import { Component } from '@angular/core';
import {
  ElementType
} from "../elements/element.dictionary";
import { ElementDetailModel } from "../elements/element.model";
import { getDefaultConfigForElement, getDefaultExtraConfigForElement } from "../elements/elements.config";

@Component({
  selector: 'app-workspace',
  templateUrl: './workspace.component.html',
  styleUrl: './workspace.component.scss'
})
export class WorkspaceComponent {
  components: {
    id?: string,
    elementType: ElementType,
    elementDetail?: ElementDetailModel
  }[] = [];

  onDragOver(event: DragEvent) {
    event.preventDefault();
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    const componentName = event.dataTransfer?.getData('elementType') as ElementType;
    if (componentName) {
      this.addComponent(componentName);
    }
  }

  onDragStart(event: DragEvent, index: number) {
    event.dataTransfer?.setData('index', index.toString());
  }

  onDropSort(event: DragEvent, newIndex: number) {
    event.preventDefault();
    const oldIndex = parseInt(event.dataTransfer?.getData('index') || '', 10);
    if (!isNaN(oldIndex)) {
      const [movedComponent] = this.components.splice(oldIndex, 1);
      this.components.splice(newIndex, 0, movedComponent);
    }
  }

  addComponent(elementType: ElementType) {
    this.components.push({
      id: String(this.components.length+1),
      elementType: elementType,
      elementDetail: {
        content: `${elementType} ${this.components.length+1}`,
        sequence: this.components.length,
        generalConfig: getDefaultConfigForElement(elementType),
        extraConfig: getDefaultExtraConfigForElement(elementType)
      }
    });
  }
}
