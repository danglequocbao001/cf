import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CoffeebookingPage } from './coffeebooking.page';

describe('CoffeebookingPage', () => {
  let component: CoffeebookingPage;
  let fixture: ComponentFixture<CoffeebookingPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoffeebookingPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CoffeebookingPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
