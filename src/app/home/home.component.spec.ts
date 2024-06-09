import {ComponentFixture, TestBed} from "@angular/core/testing";
import {HomeComponent} from "./home.component";
import {expect} from "vitest";
import {By} from "@angular/platform-browser";
import {
  TranslateLoader,
  TranslateModule,
} from "@ngx-translate/core";
import {HttpLoaderFactory} from "../app.config";
import {HttpClient} from "@angular/common/http";

let component: HomeComponent;
let fixture: ComponentFixture<HomeComponent>;

describe('HomeComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HomeComponent,
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
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
  });

  it('Should init', () => {
    // When
    fixture.detectChanges();

    // Then
    expect(fixture.nativeElement.querySelector('h1').textContent).toContain('Read Like Crazy');
    expect(fixture.nativeElement.querySelectorAll('button').length).toBe(2);
    expect(fixture.debugElement.query(By.css('#menu\\.words')).nativeElement.textContent).toContain('menu.words');
    expect(fixture.debugElement.query(By.css('#menu\\.phrases')).nativeElement.textContent).toContain('menu.phrases');
  });
});
