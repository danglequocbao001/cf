import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DetailComboPage } from './detail-combo.page';

describe('DetailComboPage', () => {
  let component: DetailComboPage;
  let fixture: ComponentFixture<DetailComboPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailComboPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DetailComboPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
