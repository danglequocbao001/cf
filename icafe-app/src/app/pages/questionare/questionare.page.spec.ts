import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { QuestionarePage } from './questionare.page';

describe('QuestionarePage', () => {
  let component: QuestionarePage;
  let fixture: ComponentFixture<QuestionarePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuestionarePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(QuestionarePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
