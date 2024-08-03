import { Component, OnInit } from '@angular/core';
import { ProjectService } from './project.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss'
})
export class ProjectsComponent implements OnInit {
  projects: any[] = [];

  constructor(private projectService: ProjectService) { }

  ngOnInit(): void {
    this.projectService.getList().subscribe((projects: any) => {
      this.projects = projects;
    });
  }

  createProject(name: string) {
    this.projectService.create({ name }).subscribe((project: any) => {
      this.projects.push(project);
    });
  }

  deleteProject(projectId: string) {
    this.projectService.delete(projectId).subscribe(() => {
      this.projects = this.projects.filter(project => project._id !== projectId);
    });
  }
}
