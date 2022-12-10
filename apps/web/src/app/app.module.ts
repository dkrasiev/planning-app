import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgDompurifySanitizer } from '@tinkoff/ng-dompurify';
import {
  TuiButtonModule,
  TuiGroupModule,
  TuiLinkModule,
  TuiRootModule,
  TUI_SANITIZER,
} from '@taiga-ui/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule } from './modules/auth/auth.module';

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
    TuiButtonModule,
    TuiLinkModule,
    TuiGroupModule,

    // my modules
    AppRoutingModule,
    AuthModule,
  ],
  providers: [{ provide: TUI_SANITIZER, useClass: NgDompurifySanitizer }],
  bootstrap: [AppComponent],
})
export class AppModule {}
