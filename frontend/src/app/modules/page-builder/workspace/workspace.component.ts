import { Component, ElementRef, Input, OnDestroy, OnInit, TrackByFunction, ViewChild } from '@angular/core';
import { ElementType } from "../elements/element.dictionary";
import { ElementInfoModel } from "../models/element.model";
import { PageBuilderService } from "../page-builder.service";
import { debounceTime, fromEvent, Observable, Subscription } from "rxjs";
import { environment } from "../../../../environments/environment";
import { ProjectModel } from "../../projects/project.model";

@Component({
  selector: 'app-workspace',
  templateUrl: './workspace.component.html',
  styleUrl: './workspace.component.scss'
})
export class WorkspaceComponent implements OnInit, OnDestroy {
  @ViewChild('TrackMouseActivityRef', {static: true}) workspaceContainerRef!: ElementRef;

  @Input() projectInfo?: ProjectModel;

  projectElements$: Observable<ElementInfoModel[]>;
  userActivities$?: Observable<UserActivityModel[]>;
  subscriptions: Subscription[] = [];

  constructor(private pageBuilderService: PageBuilderService) {
    this.projectElements$ = this.pageBuilderService.projectElements$
  }

  ngOnInit(): void {
    this.userActivities$ = this.pageBuilderService.getProjectUsersActivity()
    this.subscriptions.push(fromEvent<MouseEvent>(this.workspaceContainerRef.nativeElement, 'mousemove')
      .pipe(debounceTime(environment.MOUSE_ACTIVITY_DEBOUNCE_TIME || 100))
      .subscribe((event: MouseEvent) => {
        this.onMouseMove(event)
      }))
  }

  elementTrackByFn(index: number, item: ElementInfoModel) {
    return item?.id || item?._tempId
  }

  onDragOver(event: DragEvent) {
    event.preventDefault();
    const position: [x: number, y: number] = this.calculateMousePosition(event);
    this.pageBuilderService.updateMouseMove(position)
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    const componentName = event.dataTransfer?.getData('elementType') as ElementType;
    if (componentName) {
      this.pageBuilderService.addElement(componentName);
    }
  }

  onDragStart(event: DragEvent, elementId?: string) {
    event.dataTransfer?.setData('elementId', elementId || '');
  }

  onDropSort(event: DragEvent, newIndex?: number) {
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

  onMouseMove(event: MouseEvent) {
    const position: [x: number, y: number] = this.calculateMousePosition(event);
    this.pageBuilderService.updateMouseMove(position)
  }

  private calculateMousePosition(event: MouseEvent | DragEvent): [x: number, y: number] {
    const rect = this.workspaceContainerRef.nativeElement.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    return [x, y];
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe())
  }

  editElement(component: ElementInfoModel) {
    this.pageBuilderService.selectElementToEdit(component)
  }
}
