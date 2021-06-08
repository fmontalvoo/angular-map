import { Component } from '@angular/core';
import { Address } from './models/address.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular-map';

  private address!: Address;

  public getAddress(address: Address) {
    this.address = address;
  }

  public getAdrs() {
    if (this.address?.latitude && this.address?.longitude)
      return this.address;
    return undefined;
  }
}
