import { BizsubfunctionComponent } from './bizsubfunctions.component';
import { ActivatedRoute } from '@angular/router';
import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { CategoryService } from '../categories/categories.service';
import { Category } from '../categories/category';
import { MultiSelectModule, SelectItem } from 'primeng/primeng';

describe('BizsubfunctionComponent', function() {

  let comp: BizsubfunctionComponent;
  let fixture: ComponentFixture<BizsubfunctionComponent>;
  let el: HTMLSelectElement;
  let de: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, FormsModule, HttpModule, MultiSelectModule],
      declarations: [BizsubfunctionComponent],
      providers: [CategoryService]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BizsubfunctionComponent);
    comp = fixture.componentInstance;

    spyOn(fixture.debugElement.componentInstance.categoryService, 'getCategories').and.returnValue(Promise.resolve([
      { id: 1, category_id: '1', title: 'Business Subfunction', category_type: { title: 'Business Subfunction' } }
    ]));
  });

  it('should have a defined bizsubfunction component', () => {
    expect(comp).toBeDefined();
  });

  it('should able to getBizsubFunctions()', async(() => {
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      expect(comp.bizsubfunctions.length).toBeGreaterThan(0);
    });
  }));

  it('should able to display all the  bizsub functions in select html element', async(() => {
    de = fixture.debugElement.query(By.css('p-multiSelect'));
    el = de.nativeElement;
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      expect(el.getElementsByTagName('li').length).toEqual(comp.bizsubfunctions.length);
    });
  }));
});