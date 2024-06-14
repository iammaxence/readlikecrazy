import {ComponentFixture, TestBed} from "@angular/core/testing";
import {By} from "@angular/platform-browser";
import {
  TranslateLoader,
  TranslateModule,
} from "@ngx-translate/core";
import {HttpLoaderFactory} from "../app.config";
import {HttpClient} from "@angular/common/http";
import {Reader} from "./reader";
import {describe, vi} from "vitest";

let component: Reader;
let fixture: ComponentFixture<Reader>;

describe('ReaderComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        Reader,
        TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useFactory: HttpLoaderFactory,
            deps: [HttpClient]
          }
        })
      ],
      providers: [TranslateLoader],
    }).compileComponents();
    fixture = TestBed.createComponent(Reader);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  describe('Init', () => {
    it('Should init', () => {
      // Then
      expect(fixture.debugElement.query(By.css('#speed')).nativeElement.textContent).toContain('heading.wordByMinutes');
      expect(fixture.debugElement.query(By.css('#wordsAtTime')).nativeElement.textContent).toContain('heading.wordsAtTime');
      expect(fixture.debugElement.query(By.css('#fontSize')).nativeElement.textContent).toContain('heading.fontSize');
      expect(fixture.debugElement.query(By.css('#phrase')).nativeElement.textContent).toContain('きのう');
      expect(fixture.debugElement.query(By.css('#loading-bar')).nativeElement.textContent).toContain('Loading bar');
      expect(fixture.debugElement.query(By.css('#action-buttons')).nativeElement.querySelectorAll('button').length).toBe(3);
    });
  });

  describe('Header', () => {
    describe('FontSize', () => {
      it('Should increase font size',() => {
        // Given
        expect(fixture.debugElement.query(By.css('#font-size-value')).nativeElement.textContent).toContain('54');

        // When
        fixture.debugElement.query(By.css('#btn-fs-increase')).triggerEventHandler('click');
        fixture.detectChanges();

        // Then
        expect(fixture.debugElement.query(By.css('#font-size-value')).nativeElement.textContent).toContain('58');
      })

      it('Should decrease font size',() => {
        // Given
        expect(fixture.debugElement.query(By.css('#font-size-value')).nativeElement.textContent).toContain('54');

        // When
        fixture.debugElement.query(By.css('#btn-fs-decrease')).triggerEventHandler('click');
        fixture.detectChanges();

        // Then
        expect(fixture.debugElement.query(By.css('#font-size-value')).nativeElement.textContent).toContain('50');
      })
    })

    describe('Speed', () => {
      it('Should increase speed', () => {
        // Given
        expect(fixture.debugElement.query(By.css('#speed-value')).nativeElement.textContent).toContain('100');

        // When
        fixture.debugElement.query(By.css('#btn-speed-increase')).triggerEventHandler('click');
        fixture.detectChanges();

        // Then
        expect(fixture.debugElement.query(By.css('#speed-value')).nativeElement.textContent).toContain('200');
      });

      it('Should decrease speed', () => {
        // Given
        component.speedOffset = 2;
        fixture.detectChanges();
        expect(fixture.debugElement.query(By.css('#speed-value')).nativeElement.textContent).toContain('300');

        // When
        fixture.debugElement.query(By.css('#btn-speed-decrease')).triggerEventHandler('click');
        fixture.detectChanges();

        // Then
        expect(fixture.debugElement.query(By.css('#speed-value')).nativeElement.textContent).toContain('200');
      })

      it('Should NOT increase speed', () => {
        // Given
        component.speedOffset = 2;
        fixture.detectChanges();
        expect(fixture.debugElement.query(By.css('#speed-value')).nativeElement.textContent).toContain('300');

        // When
        fixture.debugElement.query(By.css('#btn-speed-increase')).triggerEventHandler('click');
        fixture.detectChanges();

        // Then
        expect(fixture.debugElement.query(By.css('#speed-value')).nativeElement.textContent).toContain('300');
      })

      it('Should NOT decrease speed', () => {
        // Given
        expect(fixture.debugElement.query(By.css('#speed-value')).nativeElement.textContent).toContain('100');

        // When
        fixture.debugElement.query(By.css('#btn-speed-decrease')).triggerEventHandler('click');
        fixture.detectChanges();

        // Then
        expect(fixture.debugElement.query(By.css('#speed-value')).nativeElement.textContent).toContain('100');
      })
    })
  })

  describe('Footer', () => {
    it('Should play',() => {
      // Given
      vi.useFakeTimers();

      // When
      fixture.debugElement.query(By.css('#btn-play')).triggerEventHandler('click');
      vi.advanceTimersByTime(600 * 3); // 600ms * 3 words
      fixture.detectChanges();

      // Then
      expect(component.isPlaying).toBe(true);
      expect(component.offset).toBe(3);
    });

    it('Should pause',() => {
      // Given
      const clearIntervalSpy = vi.spyOn(window, 'clearInterval').mockReturnValue(undefined); // Mock clearInterval

      // When
      fixture.debugElement.query(By.css('#btn-pause')).triggerEventHandler('click');
      fixture.detectChanges();

      // Then
      expect(component.isPlaying).toBe(false);
      expect(clearIntervalSpy).toHaveBeenCalled();
    });

    it('Should reload',() => {
      // Given
      const clearIntervalSpy = vi.spyOn(window, 'clearInterval').mockReturnValue(undefined); // Mock clearInterval
      component.offset = 2;

      // When
      fixture.debugElement.query(By.css('#btn-reload')).triggerEventHandler('click');
      fixture.detectChanges();

      // Then
      expect(component.isPlaying).toBe(false);
      expect(component.offset).toBe(0);
      expect(clearIntervalSpy).toHaveBeenCalled();
    });
  });
});
