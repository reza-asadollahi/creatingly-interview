import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ElementType } from "../elements/element.dictionary";
import { ElementDetailModel } from "../models/element.model";
import { getDefaultConfigForElement, getDefaultExtraConfigForElement } from "../elements/elements.config";
import { PageBuilderService } from "../page-builder.service";
import { debounceTime, fromEvent, Observable, Subscription } from "rxjs";
import { environment } from "../../../../environments/environment";

@Component({
  selector: 'app-workspace',
  templateUrl: './workspace.component.html',
  styleUrl: './workspace.component.scss'
})
export class WorkspaceComponent implements OnInit, OnDestroy {
  @ViewChild('TrackMouseActivityRef', {static: true}) workspaceContainerRef!: ElementRef;

  components: {
    id?: string,
    elementType: ElementType,
    elementDetail?: ElementDetailModel
  }[] = [];
  userActivities$?: Observable<UserActivityModel[]>;
  subscriptions: Subscription[] = [];


  constructor(private pageBuilderService: PageBuilderService) {
  }

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
      id: String(this.components.length + 1),
      elementType: elementType,
      elementDetail: {
        content: `${elementType} ${this.components.length + 1}`,
        sequence: this.components.length,
        generalConfig: getDefaultConfigForElement(elementType),
        extraConfig: getDefaultExtraConfigForElement(elementType)
      }
    });
  }

  ngOnInit(): void {
    this.userActivities$ = this.pageBuilderService.getProjectUsersActivity()
    this.subscriptions.push(fromEvent<MouseEvent>(this.workspaceContainerRef.nativeElement, 'mousemove')
      .pipe(debounceTime(environment.MOUSE_ACTIVITY_DEBOUNCE_TIME || 100))
      .subscribe((event: MouseEvent) => {
        this.onMouseMove(event)
      }))
  }

  onMouseMove(event: MouseEvent) {
    const rect = this.workspaceContainerRef.nativeElement.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const position: [x: number, y: number] = [x, y];
    this.pageBuilderService.updateMouseMove(position)
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe())
  }
}
