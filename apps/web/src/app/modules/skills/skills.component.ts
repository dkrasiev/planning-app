import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { SkillsService } from './skills.service';

export interface Skill {
  id: number;
  name: string;
}

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
