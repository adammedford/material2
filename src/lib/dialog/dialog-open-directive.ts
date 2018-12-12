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

/** @example 
 *   @Component({
 * template: `
 * <ng-template let-dialogRef='dialogRef' #sweetMarkupCentricAction>
 *    <div mat-dialog-content [formGroup]='myForm'>
 *         <input type='text' formControlName='state' (change)='stateChanged($event)'>
 *         <button mat-button (click)='saveForm(dialogRef)'>Save</button>
 *    </div>
 * </ng-template> 
 * 
 * <button mat-button [matDialogConfig]='config' [matDialogOpen]='sweetMarkupCentricAction'>Open dialog</button>
 * `,
 * ...other component stuff
 * })
 * export class YourDialog {
 *   constructor(private fb: FormBuilder, private service: FormSaverService) {}
 * 
 *   config = { height: 400px; width: 600px; };
 *   myForm: FormGroup = // trust me, I used FormBuilder this is a legit FormGroup
 *   
 *   stateChanged(event: StateChangedEvent) {
 *     // whatever one does when a state is changed
 *   }
 * 
 *   save(dialogRef: MatDialogRef<TemplateRef<any>>) {
 *     this.service.save(this.myForm.value).pipe(first()).subscribe((response) => {
 *       // I guess we saved it
 *       dialogRef.close(true);
 *     });
 *   }
 * 
 * }
 */

  /** @example adapted from https://github.com/angular/material2/blob/master/src/lib/dialog/dialog.md#dialog-content
   * <ng-template let-dialogRef='dialogRef' #dialogTemplate>
   *     <h2 mat-dialog-title>Delete all</h2>
   *     <mat-dialog-content>Are you sure?</mat-dialog-content>
   *     <mat-dialog-actions>
   *         <button mat-button (click)='dialogRef.close()'>No</button>
   *         <button mat-button (click)='dialogRef.close(true)'>Yes</button>
   *     </mat-dialog-actions>
   * </ng-template>
   * <button mat-button [matDialogOpen]='dialogTemplate'>Open dialog</button>
   */
  
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
  
    /** To be tied into dialogRef lifecycle but omitted for clarity */
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
  
