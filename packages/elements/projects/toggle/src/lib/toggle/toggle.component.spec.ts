import { By } from '@angular/platform-browser';
import { Component } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ToggleComponent } from './toggle.component';

@Component({
  template: `
    <sy-toggle
      name="foo"
      [value]="{bar: 'baz'}"
      [disabled]="disabled"
      [required]="required"
      (syChange)="onChanges($event)">
    </sy-toggle>
  `
})
class TestHostComponent {
  changes: any;
  disabled: any;
  required: any;

  onChanges(changes) {
    this.changes = changes;
  }
}

describe('ToggleComponent', () => {
  let component: ToggleComponent;
  let element: HTMLElement;
  let fixture: ComponentFixture<ToggleComponent>;
  let hostComponent: TestHostComponent;
  let hostElement: HTMLElement;
  let hostFixture: ComponentFixture<TestHostComponent>;

  const query = (selector) => fixture.debugElement.query(By.css(selector));
  const queryAll = (selector) => fixture.debugElement.queryAll(By.css(selector));

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ToggleComponent, TestHostComponent]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ToggleComponent);
    component = fixture.componentInstance;
    element = fixture.nativeElement;
    hostFixture = TestBed.createComponent(TestHostComponent);
    hostComponent = hostFixture.componentInstance;
    hostElement = hostFixture.nativeElement;
  });

  afterEach(() => {
    fixture && fixture.destroy();
    hostFixture && hostFixture.destroy();
  });

  describe('create', () => {
    it('should create', () => {
      fixture.detectChanges();
      expect(component).toBeTruthy();
    });
  });

  describe('[name]', () => {
    it('should bind input name', () => {
      component.name = 'foo';
      fixture.detectChanges();
      const inputEl = query('input').nativeElement;
      expect(inputEl.getAttribute('name')).toBe('foo');
    });
  });

  describe('[value]', () => {
    it('should bind input value', () => {
      component.value = 'foo';
      fixture.detectChanges();
      const inputEl = query('input').nativeElement;
      expect(inputEl.getAttribute('value')).toBe('foo');
    });
  });

  describe('[checked]', () => {
    it('should has default input checked to false', () => {
      fixture.detectChanges();
      const inputEl = query('input').nativeElement;
      expect(inputEl.checked).toBe(false);
    });

    it('should bind input checked', () => {
      component.checked = 'true';
      fixture.detectChanges();
      const inputEl = query('input').nativeElement;
      expect(inputEl.checked).toBe(true);
    });
  });

  describe('[disabled]', () => {
    it('should has default input disabled to false', () => {
      fixture.detectChanges();
      const inputEl = query('input').nativeElement;
      expect(inputEl.disabled).toBe(false);
    });

    it('should bind input disabled', () => {
      component.disabled = 'true';
      fixture.detectChanges();
      const inputEl = query('input').nativeElement;
      expect(inputEl.disabled).toBe(true);
    });

    it('should change input disabled', () => {
      hostFixture.detectChanges();
      hostComponent.disabled = 'foo';
      hostFixture.detectChanges();
      const childToggle = hostFixture.debugElement.query(By.directive(ToggleComponent));
      expect(childToggle.componentInstance.disabled).toBe(true);
    });

    it('should prevent click on input disabled', () => {
      hostComponent.disabled = true;
      hostFixture.detectChanges();
      const syToggleInput = <HTMLInputElement>hostElement.querySelector('sy-toggle input');
      syToggleInput.click();
      expect(syToggleInput.checked).toBe(false);
    });
  });

  describe('[required]', () => {
    it('should has default input required to false', () => {
      fixture.detectChanges();
      const inputEl = query('input').nativeElement;
      expect(inputEl.required).toBe(false);
    });

    it('should bind input required', () => {
      component.required = 'true';
      fixture.detectChanges();
      const inputEl = query('input').nativeElement;
      expect(inputEl.required).toBe(true);
    });

    it('should change input required', () => {
      hostFixture.detectChanges();
      const childToggle = hostFixture.debugElement.query(By.directive(ToggleComponent));
      expect(childToggle.componentInstance.required).toBe(false);
      hostComponent.required = true;
      hostFixture.detectChanges();
      expect(childToggle.componentInstance.required).toBe(true);
    });
  });

  describe('[type]', () => {
    it('should has default input type', () => {
      fixture.detectChanges();
      const inputEl = query('input').nativeElement;
      expect(inputEl.getAttribute('type')).toBe('checkbox');
    });

    it('should bind input type', () => {
      component.type = 'radio';
      fixture.detectChanges();
      const inputEl = query('input').nativeElement;
      expect(inputEl.getAttribute('type')).toBe('radio');
    });
  });

  describe('[theme]', () => {
    it('should has default input theme', () => {
      fixture.detectChanges();
      expect(element.getAttribute('theme')).toBe('material');
    });

    it('should bind input theme', () => {
      component.theme = 'ios';
      fixture.detectChanges();
      expect(element.getAttribute('theme')).toBe('ios');
    });
  });

  describe('[position]', () => {
    it('should has default input position to "before"', () => {
      fixture.detectChanges();
      expect(element.getAttribute('position')).toBe('before');
    });

    it('should bind input position', () => {
      component.position = 'after';
      fixture.detectChanges();
      expect(element.getAttribute('position')).toBe('after');
    });
  });

  describe('(syChange)', () => {
    it('should emit changes if checked change', () => {
      hostFixture.detectChanges();
      const syToggleInput = <HTMLInputElement>hostElement.querySelector('sy-toggle input');
      syToggleInput.click();
      expect(hostComponent.changes).toEqual({name: 'foo', value: {bar: 'baz'}, checked: true});
    });
  })
});
