import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PlayByLevelPage } from './play-by-level.page';

describe('PlayByLevelPage', () => {
  let component: PlayByLevelPage;
  let fixture: ComponentFixture<PlayByLevelPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlayByLevelPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PlayByLevelPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
