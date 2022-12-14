import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { Skill } from './skill';
import { SkillsService } from '../../services/skills.service';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.scss'],
})
export class SkillsComponent implements OnInit {
  public skills$: BehaviorSubject<Skill[]> = this.skillsService.skills$;

  constructor(private skillsService: SkillsService) {}

  public ngOnInit(): void {
    this.update();
  }

  public update() {
    this.skillsService.update();
  }

  public onDelete(id: number) {
    this.skillsService.delete$(id).subscribe(() => this.update());
  }
}
