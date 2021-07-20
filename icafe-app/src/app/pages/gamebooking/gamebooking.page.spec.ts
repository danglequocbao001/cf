import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { GamebookingPage } from './gamebooking.page';

describe('GamebookingPage', () => {
  let component: GamebookingPage;
  let fixture: ComponentFixture<GamebookingPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GamebookingPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(GamebookingPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
