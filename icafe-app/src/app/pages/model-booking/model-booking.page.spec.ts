import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ModelBookingPage } from './model-booking.page';

describe('ModelBookingPage', () => {
  let component: ModelBookingPage;
  let fixture: ComponentFixture<ModelBookingPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModelBookingPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ModelBookingPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
