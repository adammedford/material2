import {
  Directive,
  Input,
  TemplateRef,
  EventEmitter,
  Output
} from '@angular/core';
import {MatDialog} from './dialog';
import {MatDialogRef} from './dialog-ref';
import {MatDialogConfig} from './dialog-config';

/**
 * Button that will open the a dialog using the provided template.
 */
@Directive({
  selector: `button[matDialogOpen]`,
  exportAs: 'matDialogOpen',
  host: {
    '(click)': '_handleClick()',
    '[attr.aria-label]': 'ariaLabel',
    type: 'button' // Prevents accidental form submits.
  }
})
export class MatDialogOpen {
  /** Screenreader label for the button. */
  @Input('aria-label') ariaLabel: string = 'Open dialog';

  @Input('matDialogOpen') dialogTemplateRef: TemplateRef<any>;
  @Input('matDialogConfig') config: MatDialogConfig<D> = {};

  @Output() dialogRef: MatDialogRef<TemplateRef<any>>;

  @Output() afterClosed = new EventEmitter();
  @Output() afterOpened = new EventEmitter();
  @Output() backdropClick = new EventEmitter();

  constructor(public dialog: MatDialog) {}

  _handleClick() {
    if (this.dialogTemplateRef && !this.dialogRef) {
      this.dialogRef = this.dialog.open(this.dialogTemplateRef, this.config);
    }
  }
}
