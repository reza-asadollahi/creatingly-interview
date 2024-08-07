import { Component, OnInit } from '@angular/core';
import { ProjectService } from './project.service';
import { ProjectModel } from "./project.model";

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss'
})
export class ProjectsComponent implements OnInit {
  projects: any[] = [];
  newProjectName: string = "";
  newProjectWidth: number = 1000;

  constructor(private projectService: ProjectService) { }

  ngOnInit(): void {
    this.projectService.getList().subscribe((projects: any) => {
      this.projects = projects;
    });
  }

  createProject() {
    let newProject: ProjectModel = {
      name: this.newProjectName,
      styles: { width: this.newProjectWidth+'px' }
    };
    this.projectService.create(newProject).subscribe((project: any) => {
      this.projects.push(project);
      this.resetProjectFormValue()
    });
  }

  deleteProject(projectId: string) {
    this.projectService.delete(projectId).subscribe(() => {
      this.projects = this.projects.filter(project => project._id !== projectId);
    });
  }

  private resetProjectFormValue() {
    this.newProjectName = ""
    this.newProjectWidth = 1000
  }
}
