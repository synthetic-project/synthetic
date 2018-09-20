import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ToggleModule } from '@synthetic/elements/toggle';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    ToggleModule,
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
