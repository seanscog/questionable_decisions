import { Component } from '@angular/core';

interface User {
  id: number;
  username: string;
  first_name?: string;
  last_name?: string;
}

@Component({
  selector: 'app-admin',
  imports: [],
  templateUrl: './admin.html',
  styleUrl: './admin.css',
})
export class Admin {
  users:User[]= [{id:0,username:"anon"}]
}
