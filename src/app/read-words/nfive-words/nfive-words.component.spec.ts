import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NfiveWordsComponent } from './nfive-words.component';
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";
import {HttpLoaderFactory} from "../../app.config";
import {HttpClient} from "@angular/common/http";

describe('NfiveWordsComponent', () => {
  let component: NfiveWordsComponent;
  let fixture: ComponentFixture<NfiveWordsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        NfiveWordsComponent,
        TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useFactory: HttpLoaderFactory,
            deps: [HttpClient]
          }
        })
      ],
      providers: [TranslateLoader],
    })
    .compileComponents();

    fixture = TestBed.createComponent(NfiveWordsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
