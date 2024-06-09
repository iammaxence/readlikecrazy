import { Routes } from '@angular/router';
import {ReadWordsComponent} from "./read-words/read-words.component";
import {HomeComponent} from "./home/home.component";
import {Reader} from "./reader/reader";

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'read-words', component: ReadWordsComponent },
  { path: 'nfive-phrases', component: Reader }
];
