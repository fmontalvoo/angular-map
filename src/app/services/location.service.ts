import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class LocationService {
  private URL: string = 'https://us1.locationiq.com/v1';
  constructor(private http: HttpClient) { }

  getLatLngInfo(lat: number, lng: number): Observable<any> {
    const api_url = `${this.URL}/reverse.php?key=${environment.map_key}&lat=${lat}&lon=${lng}&format=json`;
    return this.http.get(api_url);
  }

  searchLocation(query: string): Observable<any> {
    const api_url = `${this.URL}/search.php?key=b9f62d2bd99bbf&q=${query}&format=json`;
    return this.http.get(api_url);
  }
}
