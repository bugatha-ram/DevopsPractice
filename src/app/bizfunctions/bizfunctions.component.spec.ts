import { BizfunctionComponent } from './bizfunctions.component';
import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { CategoryService } from '../categories/categories.service';
import { Category } from '../categories/category';
import { MultiSelectModule, SelectItem } from 'primeng/primeng';

describe('BizfunctionComponent', function() {

  let comp: BizfunctionComponent;
  let fixture: ComponentFixture<BizfunctionComponent>;
  let el: HTMLSelectElement;
  let de: DebugElement;
  let service: CategoryService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, FormsModule, HttpModule, MultiSelectModule],
      declarations: [BizfunctionComponent],
      providers: [CategoryService]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BizfunctionComponent);
    comp = fixture.componentInstance;

    spyOn(fixture.debugElement.componentInstance.categoryService, 'getCategories').and.returnValue(Promise.resolve([
      { id: 1, category_id: '1', title: 'Business Function', category_type: { title: 'Business Function' } }, { id: 2, category_id: '12', title: 'Business Function 2', category_type: { title: 'Business Function' } }
    ]));
  });

  it('should have a defined bizfunction component', () => {
    expect(comp).toBeDefined();
  });

  it('should able to getBizFunctions()', async(() => {
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      expect(comp.bizfunctions.length).toBeGreaterThan(0);
    });
  }));

  it('should able to display all the biz functions in select html element', async(() => {
    de = fixture.debugElement.query(By.css('p-multiSelect'));
    el = de.nativeElement;
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      expect(el.getElementsByTagName('li').length).toEqual(comp.bizfunctions.length);
    });
  }));
});

