import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditNotePage } from './edit.page';

describe('EditNotePage', () => {
  let component: EditNotePage;
  let fixture: ComponentFixture<EditNotePage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditNotePage]
    }).compileComponents();

    fixture = TestBed.createComponent(EditNotePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});