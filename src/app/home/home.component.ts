import { Component } from '@angular/core';
import {TranslateModule} from "@ngx-translate/core";
import {NgForOf} from "@angular/common";
import {Router} from "@angular/router";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    TranslateModule,
    NgForOf
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  allMenu = [
    {
      title: 'menu.words',
      routing: 'read-words',
    },
    {
      title: 'menu.phrases',
      routing: '',
    }
  ]

  constructor(private router: Router) {}

  public goToPage(path: string): void {
    this.router.navigate([path])
  }
}
