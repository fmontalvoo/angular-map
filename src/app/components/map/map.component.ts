import { Component, OnInit, AfterViewInit, Input, EventEmitter, Output } from '@angular/core';

import { Map, tileLayer, Marker, icon, Icon, LatLng, Polyline } from 'leaflet';
import { Address } from 'src/app/models/address.model';
import { Place } from 'src/app/models/place.model';

import { LocationService } from 'src/app/services/location.service';

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

  @Output() private location!: EventEmitter<Address>;

  private address: Address;
  private places: Array<Place>;

  constructor(private locationService: LocationService) {
    this.lat = this.lat ?? 0.0;
    this.lng = this.lng ?? 0.0;

    this.location = new EventEmitter();
    this.address = {};
    this.places = new Array();
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
    if (this.map) {
      this.map.off();
      this.map.remove();
    }
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
    this.getLocation();
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

  public searchLocation(query: string) {
    if (!query) return;

    this.locationService.searchLocation(query).subscribe(response => {
      this.places = [];
      this.address = {};
      this.location.emit(this.address);
      for (let res of response) {
        let place: Place = {
          display_name: res['display_name'],
          latitude: parseFloat(res['lat'] || 0.0),
          longitude: parseFloat(res['lon'] || 0.0),
          icon: res['icon'],
          type: res['type'],
        };
        this.places.push(place);
      }
    });
  }

  public setLocation(place: Place) {
    if (!place) return;

    this.lat = place.latitude;
    this.lng = place.longitude;

    this.leafletMap();

    this.marcador.setLatLng(new LatLng(this.lat, this.lng));
    this.marcador.addTo(this.map);

    this.places = [];

    this.getLocation();
  }

  getLocation() {
    this.locationService.getLatLngInfo(this.lat, this.lng)
      .subscribe(response => {
        this.address.city = response['address']['county'];
        this.address.country = response['address']['country'];
        this.address.latitude = this.lat;
        this.address.longitude = this.lng;
        this.address.neighbourhood = response['address']['neighbourhood'];
        this.address.postcode = response['address']['postcode'];
        this.address.road = response['address']['road'];
        this.address.city_district = response['address']['city_district'];
        this.address.state = response['address']['state'];
      });
    this.location.emit(this.address);
  }

  public getPlaces(): Place[] {
    return this.places;
  }

}

// drawPolyline() {
//   let pointList = [
//     new LatLng(-0.1694981953266305, -78.48332756675502),
//     new LatLng(-0.1702277539547838, -78.47982082708465),
//     new LatLng(-0.17626055092305826, -78.48096650714875),
//     new LatLng(-0.17652877055342844, -78.4814438711425),
//     new LatLng(-0.17577775557867212, -78.48521032580548),
//     new LatLng(-0.17539688368707115, -78.48546712281681),
//     new LatLng(-0.16934584753561924, -78.48435700120623),
//     new LatLng(-0.16934584753561924, -78.48435700120623),
//     new LatLng(-0.1695389657402086, -78.48334298704056),
//   ];

//   let firstpolyline = new Polyline(pointList, {
//     color: 'blue',
//     weight: 5,
//     opacity: 0.7,
//     smoothFactor: 1
//   });
//   firstpolyline.addTo(this.map);
// }