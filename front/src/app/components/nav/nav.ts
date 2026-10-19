import { Component, computed, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { UserService } from '../../services/user';

interface Link {
  path: string;
  display: string;
}
@Component({
  selector: 'app-nav',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './nav.html',
  styleUrl: './nav.css',
})
export class Nav {
  userService = inject(UserService);
  user = this.userService.user;
  displayName = computed<string | undefined>(() =>
    this.user()?.firstName || this.user()?.lastName
      ? (this.user()?.firstName ?? '') + ' ' + (this.user()?.lastName ?? '')
      : this.user()?.username,
  );
  links: Link[] = [
    { display: 'Home', path: '/' },
    { display: 'About', path: '/about' },
    { display: 'Admin', path: '/admin' },
    { display: 'New Form', path: '/form/new' },
  ];
}
