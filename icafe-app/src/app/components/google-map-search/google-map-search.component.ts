import { Component, Input, OnInit, SimpleChange, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { GeocoderResult } from '@ionic-native/google-maps';
import { ModalController } from '@ionic/angular';
import {} from 'googlemaps';
import { SearchLocationService } from 'src/app/@core-app/providers/services/search-location.service';

@Component({
  selector: 'app-google-map-search',
  templateUrl: './google-map-search.component.html',
  styleUrls: ['./google-map-search.component.scss'],
})
export class GoogleMapSearchComponent{
  @ViewChild('map', {static: true}) mapElement: any;
  map :google.maps.Map;
  geoCoder: google.maps.Geocoder;
  searchInput: string = '';
  geoReq: google.maps.GeocoderRequest = {
    address: '',
    
  };
  geoRes: google.maps.GeocoderResult[];
  constructor(
    private modal: ModalController,
    private searchLocationService: SearchLocationService,
    private router: Router
  ) {
  }
  ngOnInit() {
  }
  ngAfterViewInit(){
    const mapProperties = {
      center: new google.maps.LatLng(10.9533151, 106.6838891),
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
     };
    this.map = new google.maps.Map(this.mapElement.nativeElement, mapProperties);
    this.geoCoder = new google.maps.Geocoder();
  }
  checkLocation(){
    this.geoReq.address = this.searchInput;
    this.geoCoder.geocode(this.geoReq, (result: google.maps.GeocoderResult[], stat: google.maps.GeocoderStatus)=>{
      this.geoRes = result;
    });
  }
  selectLocation(index: number){
    this.searchLocationService.setLocation(this.geoRes[index]);
    this.modal.dismiss(this.searchLocationService.getLocation());
  }
}