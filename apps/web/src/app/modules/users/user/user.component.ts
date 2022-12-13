import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/interfaces/user';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit {
  public user?: User;
  public isLoading: boolean = true;

  public get userSkills() {
    if (this.user && this.user.skills.length < 0) {
      return this.user?.skills.map((skill) => skill.name).join(', ');
    }

    return 'none';
  }

  public get userProperties() {
    return [`skills: ${this.userSkills}`];
  }

  constructor(
    private route: ActivatedRoute,
    private usersService: UsersService
  ) {}

  ngOnInit(): void {
    this.updateUser();
  }

  private updateUser() {
    this.route.params.subscribe((params) => {
      const id = params['id'];

      if (typeof id === 'string') {
        this.usersService.getUser$(id).subscribe({
          next: (user) => (this.user = user),
          complete: () => (this.isLoading = false),
        });
      }
    });
  }
}
