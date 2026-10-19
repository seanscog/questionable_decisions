import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Questionable } from './questionable';

describe('Questionable', () => {
  let component: Questionable;
  let fixture: ComponentFixture<Questionable>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Questionable],
    }).compileComponents();

    fixture = TestBed.createComponent(Questionable);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
