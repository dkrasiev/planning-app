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
  public users$ = this.usersService.users$;

  constructor(private usersService: UsersService) {
    this.update();
  }

  public update() {
    this.usersService.update();
  }
}
