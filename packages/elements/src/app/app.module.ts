import { BrowserModule } from '@angular/platform-browser';
import { Injector, NgModule } from '@angular/core';
import { createCustomElement } from '@angular/elements';

import { ToggleComponent } from './toggle/toggle.component';

@NgModule({
  imports: [BrowserModule],
  declarations: [ToggleComponent],
  entryComponents: [ToggleComponent],
})
export class AppModule {
  constructor(private injector: Injector) {
  }

  ngDoBootstrap() {
    const SyToggle = createCustomElement(ToggleComponent, {injector: this.injector});
    customElements.define('sy-toggle', SyToggle as any);
  }
}