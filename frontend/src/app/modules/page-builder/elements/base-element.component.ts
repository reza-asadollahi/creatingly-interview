import { Component, inject, Input } from "@angular/core";
import { ElementConfigModel } from "../models/element.model";
import { ElementType } from "./element.dictionary";
import { PageBuilderService } from "../page-builder.service";

/**
 * To Create Your own custom element, create a standalone component that inherit from BaseElementComponent then assign new type to your component in the "element.dictionary.ts" file
 * the generic type "T" is used for extraConfig property
 * */
@Component({template: ""})
export abstract class BaseElementComponent<T = any> {
  @Input() id?: string
  @Input() elementType?: ElementType
  @Input() generalConfig?: ElementConfigModel
  @Input() content?: string
  @Input() sequence?: number
  @Input() lockedByUser?: string
  @Input() extraConfig?: T
  /** this use to store changes temporary until undo changes or save them to the server */
  tempConfig?: ElementConfigModel
  isResizing = false;
  private lastX?: number;
  private lastY?: number;

  protected pageBuilderService: PageBuilderService = inject(PageBuilderService)

  onMouseDown(event: MouseEvent): void {
    if (this.isInResizeZone(event)) {
      event.stopPropagation();
      event.preventDefault();
      this.isResizing = true;
      this.lastX = event.clientX;
      this.lastY = event.clientY;

      const rect: DOMRect = (event.currentTarget as any).getBoundingClientRect?.()
      this.tempConfig = {
        width: rect.width + 'px',
        height: rect.height + 'px',
      }
    }
  }

  onMouseMove(event: MouseEvent): void {
    if (this.isResizing) {
      event.stopPropagation();
      event.preventDefault();

      const deltaX = event.clientX - (this.lastX || 0);
      const deltaY = event.clientY - (this.lastY || 0);

      this.tempConfig = {
        width: (Number(this.tempConfig?.width?.slice?.(0, -2)) + deltaX) + 'px',
        height: (Number(this.tempConfig?.height?.slice?.(0, -2)) + deltaY) + 'px'
      }

      this.lastX = event.clientX;
      this.lastY = event.clientY;
    }
  }

  onMouseUp(event: MouseEvent): void {
    this.isResizing = false;
    this.submitChanges()
  }

  onMouseLeave(event: MouseEvent): void {
    this.isResizing = false;
    this.submitChanges()
  }

  private isInResizeZone(event: MouseEvent): boolean {
    const rect = (event.target as HTMLElement).getBoundingClientRect();
    const offsetX = event.clientX - rect.right;
    const offsetY = event.clientY - rect.bottom;
    return offsetX >= -20 && offsetY >= -20;
  }

  private submitChanges() {
    const element = this.pageBuilderService.getElementById(this.id);
    if (!element) {
      return
    }
    if (element?.generalConfig) {
      element.generalConfig = {
        ...element?.generalConfig,
        ...this.tempConfig
      }
    } else {
      element.generalConfig = {...this.tempConfig}
    }
    this.pageBuilderService.updateElement(element)
  }
}
