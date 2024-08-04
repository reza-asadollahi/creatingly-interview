import { Injectable } from '@angular/core';
import { SocketService } from "./socket.service";
import { BehaviorSubject, map, tap } from "rxjs";
import { AuthTokenService } from "../../auth/services/auth-token.service";
import { ElementType } from "./elements/element.dictionary";
import { getDefaultConfigForElement, getDefaultExtraConfigForElement } from "./elements/elements.config";
import { ElementInfoModel } from "./models/element.model";

@Injectable()
export class PageBuilderService {
  private _project?: ProjectModel;
  private userId: string | null;
  private _projectElements: ElementInfoModel[] = [];
  private _projectElements$ = this.socket.fromEvent<ElementInfoModel[]>('projectListElementChanges').pipe(tap(res => this._projectElements = res));

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
    // this cause receiving all element for first time
    this.socket.emit('getAllElementList', {projectId: this.projectId});
  }

  leaveProject() {
    this.socket.emit('leaveProject', {projectId: this.projectId});
  }

  updateMouseMove(position: [x: number, y: number]) {
    this.socket.emit('mouseMove', { projectId: this.projectId, position });
  }

  getProjectUsersActivity() {
    return this.socket.fromEvent<UserActivityModel[]>('projectUsersActivity').pipe(map(res => res.filter(ac => ac.id !== this.userId)));
  }

  get projectElements() {
    return this._projectElements || []
  }

  get projectElements$() {
    return this._projectElements$
  }

  addElement(elementType: ElementType) {
    const newElement: ElementInfoModel = {
      elementType: elementType,
      content: `${elementType} ${this.projectElements.length + 1}`,
      sequence: this.projectElements.length,
      generalConfig: getDefaultConfigForElement(elementType),
      extraConfig: getDefaultExtraConfigForElement(elementType)
    };
    this.socket.emit('addElementToProject', {projectId: this.projectId, elementInfo:newElement })
  }

  changeElementSequence(elementId: string, newSequence: number) {
    this.socket.emit('changeElementSequence', { projectId: this.projectId, elementId, newSequence})
  }
}
