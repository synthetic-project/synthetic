import { Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation, HostBinding, SimpleChanges, OnChanges } from '@angular/core';

type SyToggleTheme = 'material' | 'ios';
type SyToggleType = 'checkbox' | 'radio';
type SyLabelPosition = 'before' | 'after';
type SyBoolean = boolean | 'true' | 'false';

@Component({
  selector: 'sy-toggle',
  templateUrl: './toggle.component.html',
  styleUrls: ['./toggle.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ToggleComponent implements OnInit, OnChanges {
  @Input() name: string;
  @Input() value: string;
  @Input() label: string;
  @Input() checked: SyBoolean;
  @Input() disabled: SyBoolean;
  @Input() type: SyToggleType = 'checkbox';
  @Input() theme: SyToggleTheme = 'material';
  @Input() labelPosition: SyLabelPosition = 'after';
  @Output() syChange: EventEmitter<any> = new EventEmitter();

  @HostBinding('attr.theme') get themeType() {
    return this.theme;
  }

  @HostBinding('attr.label-position') get labelPositionType() {
    return this.labelPosition;
  }

  public ngOnInit(): void {
    this.checked = this.convertToBoolean(this.checked);
    this.disabled = this.convertToBoolean(this.disabled);
  }

  public ngOnChanges({checked, disabled}: SimpleChanges) {
    if (checked) {
      this.checked = this.convertToBoolean(checked.currentValue);
      this.emitValue(this.checked);
    }
    if (disabled) {
      this.disabled = this.convertToBoolean(disabled.currentValue);
    }
  }

  public emitValue(checked: boolean): void {
    this.syChange.emit({
      name: this.name,
      value: this.value || checked,
      label: this.label,
      checked,
    });
  }

  private convertToBoolean(value: SyBoolean): boolean {
    return value === 'false' ? false : !!value;
  }
}
