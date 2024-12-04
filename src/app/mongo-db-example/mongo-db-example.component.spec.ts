import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MongoDbExampleComponent } from './mongo-db-example.component';

describe('MongoDbExampleComponent', () => {
  let component: MongoDbExampleComponent;
  let fixture: ComponentFixture<MongoDbExampleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MongoDbExampleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MongoDbExampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
