import { Component } from '@angular/core';
import {Reader} from "../../reader/reader";
import {JapaneseWords} from "../../model/JapaneseWords";
import data from '../../../assets/data/n5.json';

@Component({
  selector: 'app-nfive-words',
  standalone: true,
  imports: [
    Reader
  ],
  templateUrl: 'n-five-words.component.html',
  styleUrl: './nfive-words.component.scss'
})
export class NfiveWordsComponent {
    allWords: JapaneseWords[] = data
}
