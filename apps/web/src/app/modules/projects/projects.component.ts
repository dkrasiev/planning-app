import { Component, OnInit } from '@angular/core';

import { ProjectsService } from 'src/app/services/projects.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss'],
})
export class ProjectsComponent implements OnInit {
  public projects$ = this.projectService.projects$;

  constructor(private projectService: ProjectsService) {}

  ngOnInit(): void {
    this.updateProjects();
  }

  public updateProjects() {
    this.projectService.getAll$().subscribe(console.log);
  }
}
