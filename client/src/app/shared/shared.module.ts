import { LoaderComponent } from './loader/loader.component';
import { NgModule } from "@angular/core";
import { TranslateComponent } from './translate/translate.component';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    LoaderComponent,
    TranslateComponent
  ],
  imports: [
    TranslateModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    LoaderComponent,
    TranslateComponent
  ]
})
export class SharedModule {}
