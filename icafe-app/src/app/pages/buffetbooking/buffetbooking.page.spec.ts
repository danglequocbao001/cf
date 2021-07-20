import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { BuffetbookingPage } from './buffetbooking.page';

describe('BuffetbookingPage', () => {
  let component: BuffetbookingPage;
  let fixture: ComponentFixture<BuffetbookingPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuffetbookingPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(BuffetbookingPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
