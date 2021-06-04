import { Component, OnInit, AfterViewInit, Input } from '@angular/core';

import { Map, tileLayer, Marker, icon } from 'leaflet';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit, AfterViewInit {

  private map!: Map;

  @Input() lat!: number;
  @Input() lng!: number;
  @Input() zoom: number = 14;
  @Input() isEditing: boolean | undefined;

  constructor() {
  }


  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.leafletMap();
  }

  leafletMap() {
    this.map = new Map('map').setView([this.lat || 0.0, this.lng || 0.0], this.zoom); //Inicializa al mapa.
    tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { //Carga la capa base para el mapa.
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(this.map);
  }
}
