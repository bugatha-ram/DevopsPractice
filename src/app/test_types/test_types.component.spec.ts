import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { MultiSelectModule, SelectItem } from 'primeng/primeng';

import { TestTypeComponent } from './test_types.component';
import { CategoryService } from '../categories/categories.service';
import { Category } from '../categories/category';

describe('TestTypeComponent', () => {
  let comp: TestTypeComponent;
  let fixture: ComponentFixture<TestTypeComponent>;
  let el: HTMLSelectElement;
  let de: DebugElement;
  let service: CategoryService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, FormsModule, HttpModule,MultiSelectModule],
      declarations: [TestTypeComponent],
      providers: [CategoryService]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestTypeComponent);
    comp = fixture.componentInstance;

    spyOn(fixture.debugElement.componentInstance.categoryService, 'getCategories').and.returnValue(Promise.resolve([
      { id: 2, category_id: '2', title: 'Test Type', category_type: { title: 'Test Type' } }
    ]));
  });

  it('should have a defined testtype component', () => {
    expect(comp).toBeDefined();
  });

  it('getTestTypes() should able to get all the  test_types', async(() => {
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      expect(comp.test_types.length).toBeGreaterThan(0);
    });
  }));

  it('should able to display all the  test_types in select html element', async(() => {
    de = fixture.debugElement.query(By.css('p-multiSelect'));
    el = de.nativeElement;
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      expect(el.getElementsByTagName('li').length).toEqual(comp.test_types.length);
    });
  }));
});

