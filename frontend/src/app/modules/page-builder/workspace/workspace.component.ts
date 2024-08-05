import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ElementType } from "../elements/element.dictionary";
import { ElementInfoModel } from "../models/element.model";
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

  projectElements$: Observable<ElementInfoModel[]>;
  userActivities$?: Observable<UserActivityModel[]>;
  subscriptions: Subscription[] = [];

  constructor(private pageBuilderService: PageBuilderService) {
    this.projectElements$ = this.pageBuilderService.projectElements$
  }

  onDragOver(event: DragEvent) {
    event.preventDefault();
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    const componentName = event.dataTransfer?.getData('elementType') as ElementType;
    if (componentName) {
      this.pageBuilderService.addElement(componentName);
    }
  }

  onDragStart(event: DragEvent, index: number, elementId?: string) {
    event.dataTransfer?.setData('index', index.toString());
    event.dataTransfer?.setData('elementId', elementId || '');
  }

  onDropSort(event: DragEvent, newIndex: number) {
    event.preventDefault();
    const elementId = event.dataTransfer?.getData('elementId')
    if(elementId) {
      this.pageBuilderService.changeElementSequence(elementId, newIndex)
    } else {
      event.stopPropagation();
      const componentName = event.dataTransfer?.getData('elementType') as ElementType;
      this.pageBuilderService.addElement(componentName, newIndex);
    }
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
