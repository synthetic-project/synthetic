import { BrowserModule } from '@angular/platform-browser';
import { Injector, NgModule } from '@angular/core';
import { createCustomElement } from '@angular/elements';

import { ToggleComponent } from './toggle/toggle.component';
import { DemoComponent } from './demo/demo.component';

@NgModule({
  imports: [BrowserModule],
  declarations: [DemoComponent, ToggleComponent],
  bootstrap: [DemoComponent]
  // entryComponents: [ToggleComponent],
})
export class ElementsModule {
  // constructor(private injector: Injector) {
  // }
  //
  // ngDoBootstrap() {
  //   const SyToggle = createCustomElement(ToggleComponent, {injector: this.injector});
  //   customElements.define('sy-toggle', SyToggle as any);
  // }
}
