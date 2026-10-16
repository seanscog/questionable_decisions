import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

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
  links:Link[] = [{display: "Home", path:"/"}, {display: "About", path:"/about"}, {display: "Admin", path:"/admin"}]
}
