import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TokenInterceptor } from './core/interceptors/token.interceptor';

export function getTranslateProvider() {
  return {
    provide: TranslateLoader,
    useFactory: function (http: HttpClient) {
      return new TranslateHttpLoader(http)
    },
    deps: [HttpClient]
  }
}

const INTERCEPTOR_PROVIDER = {
  provide: HTTP_INTERCEPTORS,
  multi: true,
  useClass: TokenInterceptor
}

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    CommonModule,
    TranslateModule.forRoot({ loader: getTranslateProvider() })
  ],
  providers: [INTERCEPTOR_PROVIDER],
  bootstrap: [AppComponent]
})
export class AppModule { }
