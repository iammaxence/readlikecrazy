import { Component } from '@angular/core';
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
    phrase = 'きのう かさ を 買いました. あ, その かさ です か. きれいな かさ です ね. 高かった です か.';
    offset = 0;

    intervalId: ReturnType<typeof setInterval> | undefined = undefined;

    isPlaying = false;

    speedInMs = 1000;
    fontSize = 54;

    ngOnDestroy(): void {
      clearInterval(this.intervalId);
    }

    get displayPhrase(): string {
      const current = this.phrase.split(' ');
      return current[this.offset];
    }

    /* HEADER */

    public increaseSpeed(): void {
      this.speedInMs += 100
    }

    public decreaseSpeed(): void {
      this.speedInMs -= 100
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

    /* PRIVATE FUNCTIONS */

    private _setTimer(): void {
      this.intervalId = setInterval(() => {
        if(this.offset < this.phrase.split(' ').length) {
          this.offset++;
        } else {
          clearInterval(this.intervalId);
        }
      }, this.speedInMs); // 2 seconds in milliseconds
    }
}
