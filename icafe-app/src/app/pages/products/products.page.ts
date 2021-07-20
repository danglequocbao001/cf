import { Component, OnInit } from '@angular/core';
import { ModalController, LoadingController, AlertController } from '@ionic/angular';
import { RequiredFieldComponent } from 'src/app/components/required-field/required-field.component';
import { ModalProductComponent } from 'src/app/components/modal-product/modal-product.component';
import { Router, ActivatedRoute } from '@angular/router';
import { GoogleMaps, GoogleMap, GoogleMapOptions, Environment } from '@ionic-native/google-maps';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { NativeGeocoder, NativeGeocoderOptions, NativeGeocoderResult } from '@ionic-native/native-geocoder/ngx';
import { ProductSerivce, BookingService, OrderService } from 'src/app/@core-app';
import { ProductGroupSerivce } from 'src/app/@core-app/providers/services/productGroup.service';
import { GetLocationComponent } from 'src/app/components/get-location/get-location.component';
import { noop } from 'rxjs';
import { doesNotThrow } from 'assert';
import { Diagnostic } from '@ionic-native/diagnostic/ngx';
import { ShoppingCartService } from 'src/app/@core-app/providers/services/shopping-cart.service';
import { async } from '@angular/core/testing';
import { promise } from 'protractor';
import { LocationAccuracy } from '@ionic-native/location-accuracy/ngx'
import { OrderLocationService } from 'src/app/@core-app/providers/services/order-location.service';

interface Location {
  lat: number;
  lng: number;
  address: string;
}
interface ShipCost {
  distance: number,
  cost: number
}
@Component({
  selector: 'app-products',
  templateUrl: './products.page.html',
  styleUrls: ['./products.page.scss'],
})
export class ProductsPage implements OnInit {
  address: string;
  map: GoogleMap;
  storeLocation: Location = {
    lat: 10.9533151,
    lng: 106.6838891,
    address: "null"
  };
  customerLocation: Location = {
    lat: 0,
    lng: 0,
    address: "null"
  };
  distance;
  shipCost={
    cost: 0,
    distance: 0
  };
  zoomlv = 18;
  accuracy: number;
  geoencoderOptions: NativeGeocoderOptions = {
    useLocale: true,
    maxResults: 5
  };
  totalOrder = {
    amount: 0,
    totalPrice: 0
  };

  pageProductGroup = {
    page: 1,
    per_page: 10,
    total_objects: 0,
    search: '',
    product_type: 'food'
  }
  pageProduct = {
    page: 1,
    per_page: 10,
    total_objects: 0,
    search: '',
    product_group_id: 0
  }
  menuProduct = [];
  public Tab = 0;

  dataItem: any;
  totalPrice: number = 0;

  constructor(
    public modalController: ModalController,
    private router: Router,
    private route: ActivatedRoute,
    private productService: ProductSerivce,
    private geolocation: Geolocation,
    private nativeGeocoder: NativeGeocoder,
    private productGroupsService: ProductGroupSerivce,
    public loadingCtrl: LoadingController,
    private bookingservice: BookingService,
    private diagnostic: Diagnostic,
    private alertController: AlertController,
    private shoppingCart: ShoppingCartService,
    private orderservice: OrderService,
    private locationAccuracy: LocationAccuracy,
    private locationOrder: OrderLocationService
  ) { 
   }
  products: any = [];
  dataById: any;
  ionViewDidEnter(){
    this.getOrderTotal();
  };
  ngOnInit() {
    const temp =this.locationOrder.getLocationOrder();
    if(temp){
      this.shipCost.distance = temp.distance;
      this.shipCost.cost = temp.shipCost;
      this.customerLocation.lat = temp.lat;
      this.customerLocation.lng = temp.long;
      this.customerLocation.address = temp.full_address;
      
      this.shoppingCart.setShipCost(this.shipCost);
    }
    
    else{
      this.locationAccuracy.canRequest().then((canReq: boolean)=>{
        this.locationAccuracy.request(this.locationAccuracy.REQUEST_PRIORITY_HIGH_ACCURACY).then(
          () => {
            this.getGeolocation();
          },
          error => console.log('Error requesting location permissions', error)
        )
      })
    }
    
    this.route.queryParams.subscribe((params) => {
      console.log(params);
      this.pageProductGroup.product_type = params.typeProduct;
      console.log("pageProductGroup__", this.pageProductGroup);
      this.getProductGroups();
    })
    this.getOrderTotal();

    let mapOptions: GoogleMapOptions = {
      camera: {
        target: {
          lat: 10.812076,
          lng: 106.712214,
        },
        zoom: 10,
        tilt: 30
      }
    };
    this.map = GoogleMaps.create(mapOptions);
  }
  
  ionViewWillEnter(){
    const temp =this.locationOrder.getLocationOrder();
    if(temp){
      console.log('shipcost__', this.shipCost);
      console.log('temp__', temp);
      this.shipCost.distance = temp.distance;
      this.shipCost.cost = temp.shipCost;
      this.customerLocation.lat = temp.lat;
      this.customerLocation.lng = temp.long;
      this.customerLocation.address = temp.full_address;
      
      this.shoppingCart.setShipCost(this.shipCost);
    }
  }
  
  
  getProductGroups() {
    this.productGroupsService.getDataLists(this.pageProductGroup).then((data: any) => {
      console.log("data__",data);
      this.menuProduct = data.product_groups;
      this.Tab = data.product_groups[0].id;
      this.getProducts();
    });
    
  }

  getOrderTotal() {
    this.productService.getchosseFoodList.subscribe((data: any) => {
      const dataTemp = this.productService.totalInfoShopCart();
      this.totalOrder.amount = dataTemp.totalAmount || 0;
      this.totalOrder.totalPrice = dataTemp.totalPrice || 0;
    })
    
    this.dataItem = this.productService.shopCart();
    let tempPrice = 0;
    for(const item of this.dataItem){
      let toppingPrice = 0;
      item.topping_obj.forEach(element => {
        toppingPrice += element.price;
      });
      tempPrice += (item.amount * item.price + toppingPrice);
    }
    this.totalPrice = tempPrice;
    
  }

  getProducts() {
    this.pageProduct.product_group_id = this.Tab;
    console.log("pageProduct", this.pageProduct);
    this.productService.getFood(this.pageProduct).then(data => {
      this.products = data.products;
      
      this.products.forEach(product => {
        if (product.product_image == null) {
          product.product_image = 'assets/images/meal.png';
        }
      });
    })
  }
  
  
  getGeolocation() {
    this.popupModal();
    this.geolocation.getCurrentPosition({enableHighAccuracy: true}).then(async (resp) => {
      this.dismiss();
      this.customerLocation.lat = resp.coords.latitude;
      this.customerLocation.lng = resp.coords.longitude;
      this.accuracy = resp.coords.accuracy;
      this.getGeoencoder(resp.coords.latitude, resp.coords.longitude);
      this.shippingCost();
      this.shipCost = {
        cost: this.shippingCost(),
        distance: this.distanceBetween2Points(this.storeLocation.lat, this.storeLocation.lng, this.customerLocation.lat, this.customerLocation.lng)
      }
      this.shoppingCart.setShipCost(this.shipCost);
    }).catch((error) => {
      this.presentAlert();
    });
    
    // this.geolocation.watchPosition({enableHighAccuracy: true}).subscribe(resp=>{
    //   this.dismiss();
    //   this.customerLocation.lat = resp.coords.latitude;
    //   this.customerLocation.lng = resp.coords.longitude;
    //   this.accuracy = resp.coords.accuracy;
    //   this.getGeoencoder(resp.coords.latitude, resp.coords.longitude);
    //   this.shippingCost();
    //   this.shipCost = {
    //     cost: this.shippingCost(),
    //     distance: this.distanceBetween2Points(this.storeLocation.lat, this.storeLocation.lng, this.customerLocation.lat, this.customerLocation.lng)
    //   }
    //   this.shoppingCart.setShipCost(this.shipCost);
    // });
    
  }
  async popupModal() {
    const modal = await this.modalController.create({
      component: GetLocationComponent,
      cssClass: 'popup-modal'
    });
    return await modal.present();
  }
  getGeoencoder(latitude, longitude) {
    this.nativeGeocoder.reverseGeocode(latitude, longitude, this.geoencoderOptions)
      .then((result: NativeGeocoderResult[]) => {
        this.customerLocation.address = this.generateAddress(result[0]);
      })
      .catch((error: any) => {
      });
  }
  generateAddress(addressObj) {
    let obj = [];
    let address = "";
    for (let key in addressObj) {
      obj.push(addressObj[key]);
    }
    obj.reverse();
    for (let val in obj) {
      if (obj[val].length)
        address += obj[val] + ', ';
    }
    return address.slice(0, -2);
  }
  loadmap() {
    Environment.setEnv({
      'API_KEY_FOR_BROWSER_RELEASE': 'AIzaSyBH-sWHs1mfptQLcfd-UgRWwExsVQ45vAk',
      'API_KEY_FOR_BROWSER_DEBUG': 'AIzaSyBH-sWHs1mfptQLcfd-UgRWwExsVQ45vAk'
    });
    this.map.moveCamera({
      target: {
        lat: this.customerLocation.lat,
        lng: this.customerLocation.lng
      },
      zoom: this.zoomlv,
      tilt: 30
    })
    this.map.clear()
    this.map.addMarkerSync({
      icon: 'blue',
      animation: 'DROP',
      position: {
        lat: this.customerLocation.lat,
        lng: this.customerLocation.lng
      }
    })
  }
  async presentModal(id: string) {
    this.productService.getFoodById(id).then(data => {
      this.dataById = data.product;
    })
    // this.router.navigateByUrl
    const modal = await this.modalController.create({
      component: ModalProductComponent, cssClass: 'custom-modal', componentProps: { data: id }
    })

    return await modal.present();
  }
  back() {
    this.router.navigate(['main-orders']);
  }
  changeTabs(tabs) {
    this.Tab = tabs;
    this.getProducts();
  }
  gotoDetail() {
    const dataOrder = {
      // long: this.lng,
      // lat: this.lat,
      long: this.customerLocation.lng,
      lat: this.customerLocation.lat,
      full_address: this.customerLocation.address,
      order_details_attributes: [
        {
          product_id: this.dataById,
          amount: 0
        }
      ]
    }
    this.bookingservice.setBooking(dataOrder);
    this.router.navigate(['item-detail']);
  }
  async segmentChanged(event) {
    this.Tab = event.target.value;
  }
  
  dismiss() {
    this.modalController.dismiss();
  }
  checkLocation() {
    this.diagnostic.isLocationEnabled().then(isEnable => {
      if (isEnable) this.getGeolocation();
      else this.presentAlert();
    })
  }
  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'GPS is disabled',
      message: 'This is an alert message.',
      buttons: [
        {
          text: "Go to setting",
          handler: () => {
            this.diagnostic.switchToLocationSettings();
          }
        }
      ]
    });
    await alert.present();
  }

  keySearch: any;
  getKey(event) {

    setTimeout(() => {
      this.keySearch = event.target.value;
      // console.log('search: ', this.keySearch);
    },1000)

    this.keySearch = event.target.value;

  }
  getSearch() {
    setTimeout(() => {
      this.productService.getSearchTerm(this.keySearch).then((data: any) => {
        if (this.keySearch !== '') {
          this.products = data.products;
        }
        else {

        }
      });

    }, 1000)
  } 

  public distanceBetween2Points(la1: number, lo1: number, la2: number, lo2: number) {
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

  public shippingCost() {
    let distance = this.distanceBetween2Points(this.storeLocation.lat, this.storeLocation.lng, this.customerLocation.lat, this.customerLocation.lng); 
    if (distance <= 2) {
      return 0;
    }
    return 5000 * (distance - 2);
  }
}

