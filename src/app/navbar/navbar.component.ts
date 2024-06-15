import { Component } from '@angular/core';
import {NgForOf} from "@angular/common";
import {TranslateModule} from "@ngx-translate/core";
import {RouterLink, RouterLinkActive} from "@angular/router";

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    NgForOf,
    TranslateModule,
    RouterLinkActive,
    RouterLink
  ],
  templateUrl: 'navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  allMenu = [
    {
      title: 'menu.home',
      routing: '',
    },
    {
      title: 'menu.words',
      routing: 'read-words',
    },
  ]
}
