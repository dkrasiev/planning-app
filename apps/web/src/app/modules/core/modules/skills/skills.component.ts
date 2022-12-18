import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { Skill } from './skill';
import { SkillsService } from '../../services/skills.service';
import { TuiAlertService } from '@taiga-ui/core';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.scss'],
})
export class SkillsComponent implements OnInit {
  public skills$: BehaviorSubject<Skill[]> = this.skillsService.skills$;

  constructor(
    private skillsService: SkillsService,
    private alertService: TuiAlertService
  ) {}

  public ngOnInit(): void {
    this.update();
  }

  public onCreate() {
    this.update();
    this.alertService.open('Created!').subscribe();
  }

  public update() {
    this.skillsService.update();
  }

  public onDelete(id: number) {
    this.skillsService.delete$(id).subscribe(() => {
      this.update();
      this.alertService.open('Deleted!').subscribe();
    });
  }
}
