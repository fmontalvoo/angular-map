import { Component, OnInit, AfterViewInit, Input } from '@angular/core';

import { Map, tileLayer, Marker, icon, Icon, LatLng, Polyline } from 'leaflet';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit, AfterViewInit {

  private map!: Map;
  private marcador!: Marker;
  private icono!: Icon;

  @Input() lat!: number;
  @Input() lng!: number;
  @Input() zoom: number = 14;
  @Input() isEditing: boolean | undefined;

  constructor() {
    this.lat = this.lat || 0.0;
    this.lng = this.lng || 0.0;
  }


  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.leafletMap();
  }

  /**
   * Inicializa todo el componente del mapa.
   */
  leafletMap() {
    this.map = new Map('map').setView([this.lat, this.lng], this.zoom); //Inicializa al mapa.
    tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { //Carga la capa base para el mapa.
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a> contributors',
    }).addTo(this.map);

    // Crea un nuevo icono personalizado para el marcador.
    this.icono = icon({
      iconUrl: 'assets/img/marker.png',
      iconSize: [50, 90],
      iconAnchor: [22, 94],
      popupAnchor: [2, -70]
    });

    // Si la variable isEditing tiene un valor de falso, entonces solo permite setear al componente del mapa 
    // en modo de solo lectura; por el contrario, si esta está en verdadero permite la edición de las coordenadas 
    // del marcador en el mapa. 
    if (!this.isEditing) {
      // this.marcador = new Marker([this.lat, this.lng], { icon: this.icono, draggable: this.isEditing });
      this.marcador = new Marker([this.lat, this.lng], { icon: this.icono });
      this.marcador.addTo(this.map);
      this.marcador.bindPopup(`<a href="https://www.google.com/maps/?q=${this.lat},${this.lng}" target="_blank">Google Maps</a>`);
    } else {
      this.marcador = new Marker([0, 0], { icon: this.icono });
      this.map.on('click', this.changeMakerLatLng);
      this.marcador.on('move', this.getMarkerLatLng);
    }

  }

  /**
   * Cambia la latitud y longitud del marcador en el mapa.
   * 
   * @param event 
   */
  changeMakerLatLng = (event: any) => {
    let latlng = event.latlng;
    this.marcador.setLatLng(latlng);
    this.marcador.addTo(this.map);
  }

  /**
   * Obtiene la latitud y longitud de la posición actual del marcador en el mapa.
   * 
   * @param event 
   */
  getMarkerLatLng = (event: any) => {
    let latlng = event.latlng;
    this.lat = latlng.lat;
    this.lng = latlng.lng;
  }
}
