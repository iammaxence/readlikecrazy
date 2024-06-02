import { Component } from '@angular/core';
import {NgForOf} from "@angular/common";
import {TranslateModule} from "@ngx-translate/core";
import {Router} from "@angular/router";

@Component({
  selector: 'app-read-words',
  standalone: true,
  imports: [
    NgForOf,
    TranslateModule
  ],
  templateUrl: './read-words.component.html',
  styleUrl: './read-words.component.scss'
})
export class ReadWordsComponent {
  allMenu = [
    {
      title: 'n5',
      routing: '/n5',
    },
  ]

  constructor(private router: Router) {}

  public goToPage(path: string): void {
    this.router.navigate([path])
  }
}
