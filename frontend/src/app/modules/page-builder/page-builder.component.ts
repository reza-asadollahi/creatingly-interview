import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Socket } from 'ngx-socket-io';
import { PageBuilderService } from "./page-builder.service";
import { ProjectService } from "../projects/project.service";
import { ProjectModel } from "../projects/project.model";

@Component({
  selector: 'app-page-builder',
  templateUrl: './page-builder.component.html',
  styleUrl: './page-builder.component.scss',
  /** It's provided in this component because I want to unique instance per PageBuilderComponent to not only send and receive data from server but also maintain data of each workspace  */
  providers: [PageBuilderService]
})
export class PageBuilderComponent implements OnInit, OnDestroy {
  projectInfo!: ProjectModel

  constructor(private route: ActivatedRoute,
              private router: Router,
              private projectService: ProjectService,
              private pageBuilderService: PageBuilderService) {
  }

  ngOnDestroy(): void {
    this.pageBuilderService.joinProject();
  }

  ngOnInit(): void {
    const projectId: string = this.route.snapshot.paramMap.get('projectId') || '';
    if(projectId) {
      this.projectService.getById(projectId).subscribe({
        next: project => {
          this.projectInfo = project
          this.pageBuilderService.project = project;
          this.pageBuilderService.joinProject();
        },
        error: err => {
          this.router.navigate(['projects'])
        }
      })
    } else {
      this.router.navigate(['projects'])
    }
  }
}
