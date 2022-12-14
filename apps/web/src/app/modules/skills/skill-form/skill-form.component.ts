import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Skill } from '../skills.component';
import { SkillsService } from '../skills.service';

@Component({
  selector: 'app-skill-form',
  templateUrl: './skill-form.component.html',
  styleUrls: ['./skill-form.component.scss'],
})
export class SkillFormComponent {
  @Output()
  public create: EventEmitter<Skill> = new EventEmitter();

  public skillForm: FormGroup = new FormGroup({
    name: new FormControl<string>('', Validators.required),
  });

  constructor(private skillsService: SkillsService) {}

  public onSubmit() {
    const name = this.skillForm.get('name')?.value;

    if (this.skillForm.valid && name) {
      this.skillsService
        .create$(name)
        .subscribe((skill) => this.create.emit(skill));
    } else {
      throw new Error('Name required!');
    }
  }
}
