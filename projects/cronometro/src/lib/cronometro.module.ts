import {BrowserModule} from '@angular/platform-browser';

import { NgModule } from '@angular/core';
import { CronometroComponent } from './cronometro.component';



@NgModule({
  declarations: [CronometroComponent],
  imports: [BrowserModule
  ],
  exports: [CronometroComponent],
  bootstrap: [CronometroComponent]
})
export class CronometroModule { }
