import { AfterViewInit } from '@angular/core';
import { Component, OnInit } from '@angular/core';

import { Map, tileLayer, Marker, icon } from 'leaflet';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit, AfterViewInit {

  private map!: Map;

  constructor() { }


  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.leafletMap();
  }

  leafletMap() {
    this.map = new Map('map').setView([-0.180653, -78.467834], 14); //Inicializa al mapa.
    tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { //Carga la capa base para el mapa.
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(this.map);
  }
}
