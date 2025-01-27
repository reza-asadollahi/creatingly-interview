import { AfterViewInit, Component, ElementRef, inject, Input, ViewChild } from "@angular/core";
import { ElementConfigModel } from "../models/element.model";
import { ElementType } from "./element.dictionary";
import { PageBuilderService } from "../page-builder.service";
import { Observable } from "rxjs";

/**
 * To Create Your own custom element, create a standalone component that inherit from BaseElementComponent then assign new type to your component in the "element.dictionary.ts" file
 * the generic type "T" is used for extraConfig property
 * */
@Component({template: ""})
export abstract class BaseElementComponent<T = any> implements AfterViewInit {
  @Input() id?: string
  @Input() _tempId?: string
  @Input() elementType?: ElementType
  @Input() generalConfig?: ElementConfigModel
  @Input() content?: string
  @Input() sequence?: number
  @Input() lockedByUser?: string
  @Input() extraConfig?: T
  /** this use to store changes temporary until undo changes or save them to the server */
  tempConfig?: ElementConfigModel
  isResizing = false;
  isMoveAbsoluteElement = false;
  private lastX?: number;
  private lastY?: number;

  protected pageBuilderService: PageBuilderService = inject(PageBuilderService)

  @ViewChild('resizableTagRef') resizableTag!: ElementRef;

  ngAfterViewInit() {
    const element = this.resizableTag?.nativeElement;
    if (element) {
      element.addEventListener('mousedown', this.onMouseDown.bind(this));
      element.addEventListener('mousemove', this.onMouseMove.bind(this));
      element.addEventListener('mouseup', this.onMouseUp.bind(this));
      element.addEventListener('mouseleave', this.onMouseLeave.bind(this));
    }
  }

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
    } else if (this.generalConfig?.position === 'absolute') {
      event.stopPropagation();
      event.preventDefault();
      this.isMoveAbsoluteElement = true;
      this.lastX = event.clientX;
      this.lastY = event.clientY;

      const rect: DOMRect = (event.currentTarget as HTMLElement).getBoundingClientRect();

      this.tempConfig = {
        top: `${Number(this.generalConfig?.top?.slice(0, -2) || rect.top)}px`,
        left: `${Number(this.generalConfig?.left?.slice(0, -2) || rect.left)}px`
      };
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

    } else if(this.isMoveAbsoluteElement) {
      event.stopPropagation();
      event.preventDefault();
      const deltaX = event.clientX - (this.lastX || 0);
      const deltaY = event.clientY - (this.lastY || 0);

      this.tempConfig = {
        top: `${Number(this.tempConfig?.top?.slice(0, -2)) + deltaY}px`,
        left: `${Number(this.tempConfig?.left?.slice(0, -2)) + deltaX}px`
      };

      this.lastX = event.clientX;
      this.lastY = event.clientY;
    }
  }

  onMouseUp(event: MouseEvent): void {
    if (this.isResizing) {
      this.isResizing = false;
      this.submitChanges()
    } else if(this.isMoveAbsoluteElement) {
      this.isMoveAbsoluteElement = false
      this.submitChanges()
    }
  }

  onMouseLeave(event: MouseEvent): void {
    if (this.isResizing) {
      this.isResizing = false;
      this.submitChanges()
    } else if(this.isMoveAbsoluteElement) {
      this.isMoveAbsoluteElement = false
      this.submitChanges()
    }
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
    this.pageBuilderService.updateElement(element, 'generalConfig')
  }
}
