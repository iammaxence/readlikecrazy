import {Component, ElementRef, SimpleChanges, ViewChild} from '@angular/core';
import {TranslateModule} from "@ngx-translate/core";

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
    @ViewChild('divToMeasure') divToMeasureElement: ElementRef | undefined;
    @ViewChild('progressBar') progressBarElement: ElementRef | undefined;

    animationId: any = undefined

    MIN_SPEED = 150;
    INCREMENTAL_SPEED = 100;

    phrase = 'きのう かさ を 買いました. あ, その かさ です か. きれいな かさ です ね. 高かった です か.';
    offset = 0;

    progressBarPercentage = 20;

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
      const current = this.phrase.split(' ');
      return current[this.offset];
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
      return (100 * this.offset) / this.phrase.split(' ').length;
      //return ((this.offset + 1) / this.phrase.split(' ').length) * 100;
    }

    private _setTimer(): void {
      this.intervalId = setInterval(() => {
        if(this.offset < this.phrase.split(' ').length) {
          this.offset++;
        } else {
          clearInterval(this.intervalId);
        }
      }, this.speedsInMs[this.speedOffset]);
    }
}
