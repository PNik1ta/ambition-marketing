import { AfterViewInit, Component, ElementRef, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { MaterialInstance, MaterialService } from 'src/app/core/services/material.service';

@Component({
  selector: 'app-translate',
  templateUrl: './translate.component.html',
  styleUrls: ['./translate.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class TranslateComponent implements AfterViewInit {
  @ViewChild('langSelect') langSelectRef!: ElementRef;

  langSelect!: MaterialInstance;

  form: FormGroup;
  languages: string[] = ['en', 'ru', 'de', 'fr', 'el'];
  selectedLanguage: string = 'en';

  get Lang() { return this.form.get('lang'); }

  constructor(private translate: TranslateService) {
    translate.addLangs(['en', 'ru', 'de', 'fr', 'el']);
    translate.setDefaultLang('en');

    this.form = new FormGroup({
      lang: new FormControl(0)
    });

    this.selectedLanguage = localStorage.getItem('lang') ?? 'en';
    translate.use(this.selectedLanguage);
  }

  selectEN(): void {
    console.log('en')
    this.selectedLanguage = 'en';
    localStorage.setItem('lang', this.selectedLanguage);
    this.translate.use(this.selectedLanguage);
  }

  selectRU(): void {
    this.selectedLanguage = 'ru';
    localStorage.setItem('lang', this.selectedLanguage);
    this.translate.use(this.selectedLanguage);
  }

  selectDE(): void {
    this.selectedLanguage = 'de';
    localStorage.setItem('lang', this.selectedLanguage);
    this.translate.use(this.selectedLanguage);
  }

  selectFR(): void {
    this.selectedLanguage = 'fr';
    localStorage.setItem('lang', this.selectedLanguage);
    this.translate.use(this.selectedLanguage);
  }

  selectEL(): void {
    this.selectedLanguage = 'el';
    localStorage.setItem('lang', this.selectedLanguage);
    this.translate.use(this.selectedLanguage);
  }

  ngAfterViewInit(): void {
    this.langSelect = MaterialService.initSelect(this.langSelectRef);
  }

  selectionChanged(): void {
    if (this.Lang?.value === 'en') {
      this.selectEN();
    }

    else if (this.Lang?.value === 'ru') {
      this.selectRU();
    }

    else if (this.Lang?.value === 'de') {
      this.selectDE();
    }

    else if (this.Lang?.value === 'fr') {
      this.selectFR();
    }

    else if (this.Lang?.value === 'el') {
      this.selectEL();
    }
  }

}
