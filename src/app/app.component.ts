import {Component} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {TranslateModule} from "@ngx-translate/core";
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TranslateModule, NgForOf],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  providers: []
})
export class AppComponent {
  title = 'readlikecrazy';
  allMenu = [
    {
      title: 'menu.words',
      routing: '',
    },
    {
      title: 'menu.phrases',
      routing: '',
    }
  ]

  /*constructor(private translateService: TranslateService) {
    const userLang = navigator.language || 'fr';
    const languageCode = userLang.split('-')[0];
    this.translateService.setDefaultLang(languageCode);
    this.translateService.use(languageCode);
  }*/
}
