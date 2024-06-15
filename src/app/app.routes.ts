import { Routes } from '@angular/router';
import {ReadWordsComponent} from "./read-words/read-words.component";
import {HomeComponent} from "./home/home.component";
import {Reader} from "./reader/reader";
import {NfiveWordsComponent} from "./read-words/nfive-words/nfive-words.component";

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'read-words', component: ReadWordsComponent },
  { path: 'read-words/n5', component: NfiveWordsComponent },
];
