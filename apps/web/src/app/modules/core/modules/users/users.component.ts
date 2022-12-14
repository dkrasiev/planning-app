import { Component } from '@angular/core';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-user',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent {
  public users$ = this.usersService.users$;

  constructor(private usersService: UsersService) {
    this.update();
  }

  public update() {
    this.usersService.update();
  }
}
