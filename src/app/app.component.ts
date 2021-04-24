import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AngularEditorConfig } from '@kolkov/angular-editor';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'discount-coupons';
  htmlContent = '';
  couponForm: FormGroup;
  rulesArray: FormArray;

  isUnlimited: boolean = true;
  startDate: Date = new Date((new Date()).getFullYear(), (new Date()).getMonth(), (new Date()).getDate());
  endDate: Date = new Date((new Date()).getFullYear(), (new Date()).getMonth(), (new Date()).getDate());


  couponStatus = [
    { value: true, dataValue: "Active" },
    { value: false, dataValue: "Inactive" }
  ]

  constructor(private fb: FormBuilder) { }
  ngOnInit() {
    this.couponForm = this.fb.group({
      coupon_code: ['', Validators.required],
      coupon_type: ['', Validators.required],
      valid_from: ['', Validators.required],
      valid_to: ['', Validators.required],
      is_active: ['', Validators.required],
      is_unlimited: ['', Validators.required],
      tnc: ['', Validators.required],
      rules: this.fb.array([this.createRule()]),
    });
    console.log(this.couponForm.value);
  }

  onUnlimitedAvailability() {
    if (this.couponForm.get('coupon_count')) {
      this.couponForm.removeControl('coupon_count');
    }
    this.isUnlimited = true;
  }

  onLimitedAvailability() {
    if (!this.couponForm.get('coupon_count')) {
      this.couponForm.addControl('coupon_count', new FormControl(null, Validators.required));
    }
    this.isUnlimited = false;
  }


  myFilter = (d: Date | null): boolean => {
    const date = (d || new Date());
    this.startDate = date;
    // Prevent Saturday and Sunday from being selected.
    return date >= new Date(
      (new Date()).getFullYear(), (new Date()).getMonth(), (new Date()).getDate());
  }


  myFilter2 = (d: Date | null): boolean => {
    const date = (d || new Date());
    // Prevent Saturday and Sunday from being selected.
    // console.log(this.startDate)
    return date >= this.startDate;
  }


  createRule(): FormGroup {
    return this.fb.group({
      min_amount: ['', Validators.required],
      max_amount: ['', Validators.required],
      discount_type: ['', Validators.required],
      discount: ['', Validators.required],
      max_discount: ['']

    })
  }

  config: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: 'auto',
    minHeight: '0',
    maxHeight: 'auto',
    width: 'auto',
    minWidth: '0',
    translate: 'yes',
    enableToolbar: true,
    showToolbar: true,
    placeholder: 'Type something',
    defaultParagraphSeparator: '',
    defaultFontName: '',
    defaultFontSize: '',
    fonts: [
      { class: 'arial', name: 'Arial' },
      { class: 'times-new-roman', name: 'Times New Roman' },
      { class: 'calibri', name: 'Calibri' },
      { class: 'comic-sans-ms', name: 'Comic Sans MS' }
    ],
    customClasses: [
      {
        name: 'quote',
        class: 'quote',
      },
      // {
      //   name: 'redText',
      //   class: 'redText'
      // },
      // {
      //   name: 'titleText',
      //   class: 'titleText',
      //   tag: 'h1',
      // },
    ],
    uploadUrl: 'v1/image',
    uploadWithCredentials: false,
    sanitize: true,
    toolbarPosition: 'top',
    toolbarHiddenButtons: [
      [
        'undo',
        'redo',
        // 'bold',
        // 'italic',
        // 'underline',
        // 'strikeThrough',
        'subscript',
        'superscript',
        'justifyLeft',
        'justifyCenter',
        'justifyRight',
        'justifyFull',
        // 'indent',
        // 'outdent',
        // 'insertUnorderedList',
        // 'insertOrderedList',
        // 'heading',
        'fontName'
      ],
      [
        'fontSize',
        'textColor',
        'backgroundColor',
        // 'customClasses',
        'link',
        'unlink',
        'insertImage',
        'insertVideo',
        'insertHorizontalRule',
        'removeFormat',
        'toggleEditorMode'
      ]
    ]
  };

  onAddRules() {
    this.rulesArray = this.couponForm.get('rules') as FormArray;
    this.rulesArray.push(this.createRule());
  }

  onDeleteRules(index: number) {
    (<FormArray>this.couponForm.get('rules')).removeAt(index);
  }

  get rules_controls() { // a getter!
    return (<FormArray>this.couponForm.get('rules')).controls;
  }

  onSubmit() {
    (<FormArray>this.couponForm.get('rules')).value.forEach(element => {
      console.log(element.max_discount)
      if (element.max_discount == '') {
        delete element.max_discount;
      }
    });
    console.log(this.couponForm.value);
  
  }
  resetForm() {
    this.couponForm.reset();
  }
}
