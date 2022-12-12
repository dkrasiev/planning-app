import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';

import { UsersService } from 'src/app/services/users.service';

interface User {
  uid: string;
  username: string;
  email?: string;
}

@Component({
  selector: 'app-user',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent {
  public users: Observable<User[]> = new Observable();

  constructor(private usersService: UsersService) {
    this.updateUsers();
  }

  public updateUsers() {
    this.users = this.usersService.getAll();
  }
}
