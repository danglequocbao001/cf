import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { BookingComboPage } from './booking-combo.page';

describe('BookingComboPage', () => {
  let component: BookingComboPage;
  let fixture: ComponentFixture<BookingComboPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookingComboPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(BookingComboPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
