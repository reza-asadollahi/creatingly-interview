import { Injectable } from '@angular/core';
import { SocketService } from "./socket.service";
import { BehaviorSubject, map, Observable, tap } from "rxjs";
import { AuthTokenService } from "../../auth/services/auth-token.service";
import { ElementType } from "./elements/element.dictionary";
import { getDefaultConfigForElement, getDefaultExtraConfigForElement } from "./elements/elements.config";
import { ElementConfigModel, ElementInfoModel } from "./models/element.model";
import { ProjectModel } from "../projects/project.model";
import { v4 } from "uuid";

@Injectable()
export class PageBuilderService {
  private _project?: ProjectModel;
  private userId: string | null;
  private _editingElement$: BehaviorSubject<ElementInfoModel | undefined> = new BehaviorSubject<ElementInfoModel | undefined>(undefined)
  private _projectElementList$: BehaviorSubject<ElementInfoModel[]> = new BehaviorSubject<ElementInfoModel[]>([]);
  readonly singleElementChange$: Observable<ElementInfoModel> = this.socket.fromEvent('projectElementChange')

  constructor(private socket: SocketService,
              tokenService: AuthTokenService) {
    this.userId = tokenService.token
  }

  set project(value: ProjectModel) {
    this._project = value
  }

  get projectId() {
    return this._project?.id || ''
  }

  joinProject() {
    this.socket.emit('joinProject', {projectId: this.projectId});

    // listen to all project element list event
    this.socket.on('projectListElementChanges', ((elements: ElementInfoModel[]) => {
      this._projectElementList$.next(elements)
    }))

    // listen to some elements changes in project list
    this.socket.on('projectSomeElementChange', ((elements: ElementInfoModel[]) => {
      const currentList = [...this._projectElementList$.value || []];

      for (let element of elements) {
        let elementIndex = currentList.findIndex(el => el.id === element.id || el._tempId === element._tempId)
        if (elementIndex !== -1)
          currentList[elementIndex] = {...currentList[elementIndex], ...element}
        else
          currentList.push(element)
      }

      this._projectElementList$.next(currentList)
    }))

    // listen to all single element change event
    this.socket.on('projectElementChange', ((element: ElementInfoModel) => {
      const currentList = [...this._projectElementList$.value || []];

      let elementIndex = currentList.findIndex(el => el.id === element.id || el._tempId === element._tempId)
      if (elementIndex !== -1)
        currentList[elementIndex] = {
          ...currentList[elementIndex],
          ...element
        }
      else
        currentList.push(element)

      this._projectElementList$.next(currentList)
    }))

    // listen to event of other users delete an element
    this.socket.on('deleteElementFromProject', ((elementId: string) => {
      const currentList = [...this._projectElementList$.value || []];

      let elementIndex = currentList.findIndex(el => el.id === elementId)
      if (elementIndex !== -1) {
        currentList.splice(elementIndex, 1)
        this._projectElementList$.next(currentList)

        if (this._editingElement$.value?.id === elementId)
          this._editingElement$.next(undefined)
      }

    }))
  }

  leaveProject() {
    this.socket.emit('leaveProject', {projectId: this.projectId});
  }

  updateMouseMove(position: [x: number, y: number]) {
    this.socket.emit('mouseMove', {projectId: this.projectId, position});
  }

  getProjectUsersActivity() {
    return this.socket.fromEvent<UserActivityModel[]>('projectUsersActivity').pipe(map(res => res.filter(ac => ac.id !== this.userId)));
  }

  get projectElements() {
    return this._projectElementList$.value || []
  }

  get projectElements$() {
    return this._projectElementList$.asObservable()
  }

  addElement(elementType: ElementType, index?: number) {
    const newElement: ElementInfoModel = {
      _tempId: v4(),
      elementType: elementType,
      content: `${elementType} ${this.projectElements.length + 1}`,
      sequence: index || this.projectElements.length,
      generalConfig: getDefaultConfigForElement(elementType),
      extraConfig: getDefaultExtraConfigForElement(elementType)
    };
    this.socket.emit('addElementToProject', {projectId: this.projectId, elementInfo: newElement, index})
    // add element to element list to show users changes immediately, it will be tracked with _tempId
    const currentList = [...this._projectElementList$.value || []];
    currentList.push(newElement)
    this._projectElementList$.next(currentList)
  }

  deleteElement(elementId: string) {
    this.socket.emit('deleteElementFromProject', {projectId: this.projectId, elementId})
  }

  changeElementSequence(elementId: string, newSequence?: number) {
    this.socket.emit('changeElementSequence', {
      projectId: this.projectId,
      elementId,
      newSequence: newSequence ?? this._projectElementList$.value?.length + 1
    })
  }

  getElementById(id?: string) {
    return this.projectElements.find(el => el.id === id)
  }

  updateElement(elementInfo: ElementInfoModel, changeField?: 'generalConfig' | 'content' | 'extraConfig') {
    this.socket.emit('updateElement', {projectId: this.projectId, elementInfo, changeField})
    const currentList = [...this._projectElementList$.value || []];
    let elementIndex = currentList.findIndex(el => el.id === elementInfo.id || el._tempId === elementInfo._tempId)
    if (elementIndex !== -1) {
      currentList[elementIndex] = elementInfo
      this._projectElementList$.next(currentList)
    }
  }

  get editingElement$() {
    return this._editingElement$.asObservable()
  }

  selectElementToEdit(elementInfo?: ElementInfoModel) {
    if (this._editingElement$.value != elementInfo) {
      this.socket.emit('lockElementForUser', {projectId: this.projectId})
    }
    this._editingElement$.next(elementInfo);
  }
}
