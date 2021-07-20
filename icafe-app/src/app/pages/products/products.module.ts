import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ProductsPageRoutingModule } from './products-routing.module';
import { ProductsPage } from './products.page';
import { ComponentsModule } from 'src/app/components/component.module';
import { GetLocationComponent } from 'src/app/components/get-location/get-location.component';
import { ModalProductComponent } from 'src/app/components/modal-product/modal-product.component';

@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    IonicModule,
    ComponentsModule,
    ProductsPageRoutingModule,
  ],
  schemas:[
    CUSTOM_ELEMENTS_SCHEMA
  ],
  declarations: [ProductsPage, GetLocationComponent],
  entryComponents: [GetLocationComponent]
})
export class ProductsPageModule {}
