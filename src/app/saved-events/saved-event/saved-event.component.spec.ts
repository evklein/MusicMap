import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SavedEventComponent } from './saved-event.component';

describe('SavedEventComponent', () => {
  let component: SavedEventComponent;
  let fixture: ComponentFixture<SavedEventComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SavedEventComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SavedEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
