import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, NgForm, Validators, UntypedFormBuilder, FormGroup } from '@angular/forms';
import { MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA } from '@angular/material/legacy-dialog';

@Component({
  selector: 'app-edit-configuration',
  templateUrl: './edit-configuration.component.html',
  styleUrls: ['./edit-configuration.component.scss']
})
export class EditConfigurationComponent implements OnInit {

  feedbackValue: string;
  editConfigForm = this.fb.group({
    showFeedback: [''],
    showSubmitConfirmation: [''],
    summaryType: [''],
    showTimer: [''],
  });
  summaryTypeOptions = [
    { label: 'Complete', value: 'Complete' },
    { label: 'Duration', value: 'Duration' },
    { label: 'Score', value: 'Score' },
  ];
  constructor(@Inject(MAT_DIALOG_DATA) public data, private fb: UntypedFormBuilder, ) { }

  ngOnInit(): void {
    console.log("data", this.data);

    if (this.data.config) {
      this.editConfigForm.patchValue(this.data.config);
    }
  }

  onSubmit() {
    console.warn(this.editConfigForm.value);

  }

}
