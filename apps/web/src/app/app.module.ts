import { ErrorHandler, NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgDompurifySanitizer } from '@tinkoff/ng-dompurify';
import {
  TuiButtonModule,
  TuiGroupModule,
  TuiRootModule,
  TUI_SANITIZER,
} from '@taiga-ui/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule } from './modules/auth/auth.module';
import { AuthInterceptor } from './shared/interceptors/auth.interceptor';
import { MyErrorHandler } from './shared/error-handler';

@NgModule({
  declarations: [AppComponent],
  imports: [
    // angular modules
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,

    // taiga modules
    TuiRootModule,
    TuiGroupModule,
    TuiButtonModule,

    // my modules
    AppRoutingModule,
    AuthModule,
  ],
  providers: [
    { provide: TUI_SANITIZER, useClass: NgDompurifySanitizer },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: ErrorHandler, useClass: MyErrorHandler },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
