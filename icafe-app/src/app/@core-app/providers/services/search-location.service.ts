import { Injectable } from '@angular/core';
import {} from 'googlemaps';

interface Location {
  lat: number;
  lng: number;
  address: string;
}
interface ShipCost {
  distance: number;
  cost: number;
}
interface ReturnData{
  lat: number;
  lng: number;
  address: string;
  distance: number;
  cost: number;
}
@Injectable({
  providedIn: 'root'
})
export class SearchLocationService {
  storeLocation: Location = {
    lat: 10.9533151,
    lng: 106.6838891,
    address: "null"
  };
  
  location: google.maps.GeocoderResult;
  shipCost: ShipCost;
  returnData: ReturnData={
    lat: 0,
    lng: 0,
    address: "",
    cost: 0,
    distance: 0
  };
  constructor() { }
  
  setLocation(selectedLocation: google.maps.GeocoderResult){
    this.returnData.lat = selectedLocation.geometry.location.lat();
    this.returnData.lng = selectedLocation.geometry.location.lng();
    this.returnData.address = selectedLocation.formatted_address;
    
    this.returnData.cost = this.shippingCost();
    this.returnData.distance = this.distanceBetween2Points(this.storeLocation.lat, this.storeLocation.lng, this.returnData.lat, this.returnData.lng);
  }
  getLocation(){
    return this.returnData;
  }
  distanceBetween2Points(la1: number, lo1: number, la2: number, lo2: number) {
    const R = 6371000;
    const dLat = (la2 - la1) * (Math.PI / 180);
    const dLon = (lo2 - lo1) * (Math.PI / 180);
    const la1ToRad = la1 * (Math.PI / 180);
    const la2ToRad = la2 * (Math.PI / 180);
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(la1ToRad)
      * Math.cos(la2ToRad) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = R * c;
    return Math.round(d/1000);
  }

  shippingCost() {
    let distance = this.distanceBetween2Points(this.storeLocation.lat, this.storeLocation.lng, this.returnData.lat, this.returnData.lng); 
    if (distance <= 2) {
      return 0;
    }
    return 5000 * (distance - 2);
  }
}
