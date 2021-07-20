import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PlayByTopicPage } from './play-by-topic.page';

describe('PlayByTopicPage', () => {
  let component: PlayByTopicPage;
  let fixture: ComponentFixture<PlayByTopicPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlayByTopicPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PlayByTopicPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
