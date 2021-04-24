import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
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
couponStatus=[
  {value:true,dataValue:"Active"},
  {value:false,dataValue:"Inactive"}
]
  constructor(private fb: FormBuilder) {  }
  ngOnInit() {
    this.couponForm = this.fb.group({
      coupon_code: ['', Validators.required],
      coupon_type: ['', Validators.required],
      valid_from: ['', Validators.required],
      valid_to: ['', Validators.required],
      is_active: [undefined, Validators.required],
      coupon_count: ['', Validators.required],
      is_unlimited: ['', Validators.required],
      tnc: ['', Validators.required],
      rules: this.fb.array([this.createRule()]),
    });
    console.log(this.couponForm.value);
  }
  createRule(): FormGroup {
    return this.fb.group({
      min_amount: ['', Validators.required],
      max_amount: ['', Validators.required],
      discount_type: ['', Validators.required],
      discount: ['', Validators.required],
      max_discount: [
        // {value:'',disabled:(value==''?true:false)}
      ]

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
  onDeleteRules(index:number){
    (<FormArray>this.couponForm.get('rules')).removeAt(index);
  }
  get rules_controls() { // a getter!
    return (<FormArray>this.couponForm.get('rules')).controls;
  }
  onSubmit(){
    console.log(this.couponForm.value);
  }
}
