import { Injectable } from '@angular/core';
import { CRUDService } from "../../shared/services/crud.service";

@Injectable({ providedIn: 'root' })
export class ProjectService extends CRUDService<ProjectModel>{
  constructor() {
    super('projects')
  }
}
