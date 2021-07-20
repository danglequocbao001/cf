import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MainOrdersPage } from './main-orders.page';

describe('MainOrdersPage', () => {
  let component: MainOrdersPage;
  let fixture: ComponentFixture<MainOrdersPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MainOrdersPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MainOrdersPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
