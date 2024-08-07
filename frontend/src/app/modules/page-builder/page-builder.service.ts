import { Injectable } from '@angular/core';
import { SocketService } from "./socket.service";
import { map, tap } from "rxjs";
import { AuthTokenService } from "../../auth/services/auth-token.service";
import { ElementType } from "./elements/element.dictionary";
import { getDefaultConfigForElement, getDefaultExtraConfigForElement } from "./elements/elements.config";
import { ElementInfoModel } from "./models/element.model";
import { ProjectModel } from "../projects/project.model";

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

  addElement(elementType: ElementType, index?: number) {
    const newElement: ElementInfoModel = {
      elementType: elementType,
      content: `${elementType} ${this.projectElements.length + 1}`,
      sequence: index || this.projectElements.length,
      generalConfig: getDefaultConfigForElement(elementType),
      extraConfig: getDefaultExtraConfigForElement(elementType)
    };
    this.socket.emit('addElementToProject', {projectId: this.projectId, elementInfo:newElement, index })
  }

  changeElementSequence(elementId: string, newSequence: number) {
    this.socket.emit('changeElementSequence', { projectId: this.projectId, elementId, newSequence})
  }

  getElementById(id?: string) {
    return this.projectElements.find(el => el.id === id)
  }

  updateElement(elementInfo: ElementInfoModel) {
    this.socket.emit('updateElement', { projectId: this.projectId, elementInfo })
  }
}
