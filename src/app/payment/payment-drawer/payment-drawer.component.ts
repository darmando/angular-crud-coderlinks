import { Component, OnInit, EventEmitter,Input,Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-payment-drawer',
  templateUrl: './payment-drawer.component.html',
  styleUrls: ['./payment-drawer.component.css']
})
export class PaymentDrawerComponent implements OnInit {
  visible = true;
  title = '';
  validateForm: FormGroup;
  
  @Input() isEdit: boolean;
  @Input() data: any;
  @Output() save = new EventEmitter<any>();
  @Output() close = new EventEmitter<any>();

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.title = this.isEdit ? 'Edit' : 'Add';
    this.validateForm = this.fb.group({
      formLayout: ['horizontal'],
      key: [{ value: null, disabled: true }, [Validators.required]],
      name: [{ value: null, disabled: false }, [Validators.required]],
      payment: [{ value: null, disabled: false }, [Validators.required]],
      paid: [{ value: null, disabled: false }, [Validators.required]],
    });
  }

 
  closeDrawer = () => {
    this.visible = false;
   
  };

  openDrawer = () => {
    this.visible = true;
    if (this.isEdit) {
      this.validateForm.patchValue({
        key: this.data.key,
        name: this.data.name,
        payment: this.data.payment,
        paid: this.data.paid,
      });
    }else{

    }
  }
  submitForm(): void {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }

    if (this.validateForm.valid) {
      const data = {
        key: this.validateForm.controls.key.value,
        name: this.validateForm.controls.name.value,
        payment: this.validateForm.controls.payment.value,
        paid: this.validateForm.controls.paid.value,
      };
      this.save.emit({ data });
      this.closeDrawer();
    }

    
  }
}
