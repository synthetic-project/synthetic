import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewEncapsulation,
  HostBinding,
  SimpleChanges,
  OnChanges
} from '@angular/core';

export type ToggleTheme = 'material' | 'ios';
export type ToggleType = 'checkbox' | 'radio';
export type TogglePosition = 'before' | 'after';
export type ToggleBoolean = boolean | 'true' | 'false';

@Component({
  selector: 'sy-toggle',
  templateUrl: './toggle.component.html',
  styleUrls: ['./toggle.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ToggleComponent implements OnInit, OnChanges {
  @Input() public name: string;
  @Input() public value: any;
  @Input() public checked: ToggleBoolean;
  @Input() public disabled: ToggleBoolean;
  @Input() public required: ToggleBoolean;
  @Input() public type: ToggleType = 'checkbox';
  @Input() public theme: ToggleTheme = 'material';
  @Input() public position: TogglePosition = 'before';
  @Output() public syChange: EventEmitter<any> = new EventEmitter();

  @HostBinding('attr.theme') get themeType() {
    return this.theme;
  }

  @HostBinding('attr.position') get positionType() {
    return this.position;
  }

  public ngOnInit(): void {
    this.checked = this.convertToBoolean(this.checked);
    this.disabled = this.convertToBoolean(this.disabled);
    this.required = this.convertToBoolean(this.required);
  }

  public ngOnChanges({checked, disabled, required}: SimpleChanges) {
    if (checked) {
      this.checked = this.convertToBoolean(checked.currentValue);
      this.emitValue(this.checked);
    }
    if (disabled) {
      this.disabled = this.convertToBoolean(disabled.currentValue);
    }
    if (required) {
      this.required = this.convertToBoolean(required.currentValue);
    }
  }

  public emitValue(checked: boolean): void {
    this.syChange.emit({
      name: this.name,
      value: this.value,
      checked,
    });
  }

  private convertToBoolean(value: ToggleBoolean): boolean {
    return value === 'false' ? false : !!value;
  }
}
