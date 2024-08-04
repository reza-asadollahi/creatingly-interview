import { Injectable } from '@angular/core';
import { SocketService } from "./socket.service";
import { map } from "rxjs";
import { AuthTokenService } from "../../auth/services/auth-token.service";

@Injectable()
export class PageBuilderService {
  private _project?: ProjectModel;
  private userId: string | null;

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
}
