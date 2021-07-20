import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { LosePage } from './lose.page';

describe('LosePage', () => {
  let component: LosePage;
  let fixture: ComponentFixture<LosePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LosePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(LosePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
