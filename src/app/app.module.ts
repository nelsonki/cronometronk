import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { CronometroModule } from '../../projects/cronometro/src/lib/cronometro.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    CronometroModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
