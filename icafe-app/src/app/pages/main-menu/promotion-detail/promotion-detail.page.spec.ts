import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PromotionDetailPage } from './promotion-detail.page';

describe('PromotionDetailPage', () => {
  let component: PromotionDetailPage;
  let fixture: ComponentFixture<PromotionDetailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PromotionDetailPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PromotionDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
