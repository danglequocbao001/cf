import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import{ IonicModule } from '@ionic/angular';
import { CurrencyPipe } from "@angular/common";
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RequiredFieldComponent } from './required-field/required-field.component';
import { HeadTitleComponent } from './head-title/head-title.component';
import { ModalProductComponent } from './modal-product/modal-product.component';
import { ChangeProductAmountComponent } from './change-product-amount/change-product-amount.component';
import { GoogleMapsModule } from '@angular/google-maps';

import { GoogleMapSearchComponent } from './google-map-search/google-map-search.component';

// import { ModalWinComponent } from './modal-win/modal-win.component';
// import { ModalLoseComponent } from './modal-lose/modal-lose.component';
@NgModule({
	declarations: [
		RequiredFieldComponent, 
		HeadTitleComponent,
		ModalProductComponent,
		ChangeProductAmountComponent,
		GoogleMapSearchComponent
		
	],
	imports: [CommonModule, IonicModule, FormsModule, GoogleMapsModule],
	exports: [
		RequiredFieldComponent, 
		HeadTitleComponent,
		ModalProductComponent,
		ChangeProductAmountComponent,
		GoogleMapSearchComponent,
			
		CommonModule, 
		FormsModule, ReactiveFormsModule
	],
	entryComponents: [
		RequiredFieldComponent, 
		HeadTitleComponent,
		ModalProductComponent,
		ChangeProductAmountComponent,
		GoogleMapSearchComponent
	],
	schemas: [
		CUSTOM_ELEMENTS_SCHEMA	
	],
  providers: [CurrencyPipe]
})
export class ComponentsModule {}
