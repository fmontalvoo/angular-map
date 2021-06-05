import { Component } from '@angular/core';
import { AddressModel } from './models/address.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular-map';

  private address!: AddressModel;

  getAddress(address: AddressModel) {
    this.address = address;
  }

  getAdrs() {
    return this.address;
  }
}
