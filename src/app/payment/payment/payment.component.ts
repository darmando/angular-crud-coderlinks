import { Component, OnInit, ViewChild } from '@angular/core';
import { Payment } from './../../model/payment';
import { PaymentDrawerComponent } from './../payment-drawer/payment-drawer.component';
@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  isEdit = false;
  data = {};
  showDrawer = false;

  listPayment: Payment[] = [
    {
      key: 1,
      name: 'Google Play Music',
      payment: 149.50,
      paid: false
    },
    {
      key: 2,
      name: 'Netflix',
      payment: 199.99,
      paid: false
    },
    {
      key: 3,
      name: 'House Rent',
      payment: 7000.00,
      paid: false
    },
    {
      key: 4,
      name: 'Credit Card',
      payment: 800.00,
      paid: true
    },
  ];

  @ViewChild(PaymentDrawerComponent, { static: false }) PaymentDrawerComponent: any;
  constructor() { }

  ngOnInit() {
  }

  delete(key){
    this.listPayment = this.listPayment.filter(d => d.key !== key);
  }
  add(){
    const last = this.listPayment[this.listPayment.length-1];
    let payload: Payment;
    const id =  last.key+1;
    payload = {
      key : id,
      name: `Payment ${id}`,
      payment: parseFloat( (Math.random() * (0.120 - 0.0200) + 0.0200).toFixed(4) ),
      paid :  Math.random() >= 0.5
    }
    this.listPayment.push(payload);
    this.listPayment = [...this.listPayment];
  }

  save($event){
    var test = this.listPayment.find(function(element) { 
      return element.key === $event.data.key; 
    }); 

    
    let itemIndex = this.listPayment.findIndex(item => item.key == $event.data.key);
    this.listPayment[itemIndex] = $event.data;
  
    this.listPayment = [...this.listPayment];
  }



  showUpdatedItem(newItem){

  }

  findIndexToUpdate(newItem) { 
        return newItem.key === this;
  }

  close(){

  }

  open(isEdit, data){
    this.showDrawer = true;
    this.isEdit     = isEdit;
    this.data       = data;
    setTimeout(
      function() {
        this.PaymentDrawerComponent.openDrawer();
      }.bind(this),
      0,
    );
  }

}
