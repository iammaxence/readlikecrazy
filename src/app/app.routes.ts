import { Routes } from '@angular/router';
import {ReadWordsComponent} from "./read-words/read-words.component";
import {HomeComponent} from "./home/home.component";
import {NFiveComponent} from "./n-five/n-five.component";

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'read-words', component: ReadWordsComponent },
  { path: 'n5', component: NFiveComponent }
];
