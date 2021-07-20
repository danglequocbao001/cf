import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
// import { NativeGeocoderReverseResult } from '@ionic-native/native-geocoder/ngx';


@Injectable()
export class AddressProvider {
  constructor(public http: HttpClient) {
  }
  // public toLabel(address: NativeGeocoderReverseResult) {
  //   const add = `${address.subThoroughfare ? address.subThoroughfare + " " : ""}${address.thoroughfare ? address.thoroughfare + ", " : ""}`
  //   const locality = `${address.subLocality ? address.subLocality + ", " : ""}${address.locality ? address.locality + ", " : ""}`
  //   const administrativeArea = `${address.subAdministrativeArea ? address.subAdministrativeArea + ", " : ""}${address.administrativeArea ? address.administrativeArea : ""}`
  //   return `${add}${locality}${administrativeArea}`
  // }
  // public combineAddress(results: NativeGeocoderReverseResult[]) {
  //   let address: NativeGeocoderReverseResult;
  //   results.forEach((value, index) => {
  //     if(value )
  //     if(index === 0) {
  //       address = value;
  //     } else {
  //       Object.keys(address).filter( x => {
  //         if(!address[x]) {
  //           address[x] = value[x]
  //         } 
  //       })
  //     }
  //   })
  //   if(address.locality){
  //     address.locality = '';
  //   }
  //   if(address.subLocality && address.locality && (address.subLocality.toLocaleLowerCase() === address.locality.toLocaleLowerCase())) {
  //     address.subLocality = '';
  //   }
  //   if(address.subThoroughfare && address.thoroughfare && (address.subThoroughfare.toLocaleLowerCase() === address.thoroughfare.toLocaleLowerCase())) {
  //     address.subThoroughfare = '';
  //   }
  //   if(address.subAdministrativeArea && address.administrativeArea && (address.subAdministrativeArea.toLocaleLowerCase() === address.administrativeArea.toLocaleLowerCase())) {
  //     address.subAdministrativeArea = '';
  //   }
  //   if(address.administrativeArea.toLocaleLowerCase() === address.locality.toLocaleLowerCase()){
  //     address.locality = '';
  //   }
  //   if(address.locality.toLocaleLowerCase() === address.subAdministrativeArea.toLocaleLowerCase()){
  //     address.locality = '';
  //   }
  //   return address;
  // }
}
