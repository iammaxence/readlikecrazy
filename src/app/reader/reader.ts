import {Component, ElementRef, Input, input, SimpleChanges, ViewChild} from '@angular/core';
import {TranslateModule} from "@ngx-translate/core";
import {JapaneseWords} from "../model/JapaneseWords";

@Component({
  selector: 'app-reader',
  standalone: true,
  imports: [
    TranslateModule
  ],
  templateUrl: './reader.html',
  styleUrl: './reader.scss'
})
export class Reader {
    @Input() content: JapaneseWords[] = [];

    offset = 0;

    speedsInMs = [600, 300, 200];
    speedOffset = 0;

    intervalId: ReturnType<typeof setInterval> | undefined = undefined;

    isPlaying = false;

    fontSize = 54;

    ngOnDestroy(): void {
      clearInterval(this.intervalId);
    }

    get displaySpeed(): number {
      const wordPerSeconds = 1 / (this.speedsInMs[this.speedOffset] / 1000);
      return wordPerSeconds * 60;
    }

    get displayPhrase(): string {
      return this.content.length > 0 ? this.content[this.offset].word : '';
    }

    /* HEADER */

    public increaseSpeed(): void {
      if(this.speedOffset < this.speedsInMs.length - 1) {
        this.speedOffset++;
      }
    }

    public decreaseSpeed(): void {
      if(this.speedOffset > 0) {
        this.speedOffset--;
      }
    }

    public increaseFont(): void {
      this.fontSize += 4;
    }

    public decreaseFont(): void {
      this.fontSize -= 4;
    }

    /* FOOTER */

    public play(): void {
      if(!this.isPlaying) {
        console.log("PLAY");
        this.isPlaying = true;
        this._setTimer();
      }
    }

    public pause(): void {
      console.log("PAUSE");
      clearInterval(this.intervalId);
      this.isPlaying = false;
    }

    public reload(): void {
      console.log("Reload");
      this.isPlaying = false;
      this.offset = 0;
      clearInterval(this.intervalId);
    }

    public calculateProgressBarPercentage(): number {
      const value =  (100 * this.offset) / (this.content.length - 1);
      return Math.ceil(value);
    }

    private _setTimer(): void {
      this.intervalId = setInterval(() => {
        if(this.offset < this.content.length - 1) {
          this.offset++;
        } else {
          clearInterval(this.intervalId);
        }
      }, this.speedsInMs[this.speedOffset]);
    }
}
