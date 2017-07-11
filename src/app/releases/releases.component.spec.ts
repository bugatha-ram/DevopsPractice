import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { MultiSelectModule, SelectItem } from 'primeng/primeng';

import { ReleaseComponent } from './releases.component';
import { CategoryService } from '../categories/categories.service';
import { Category } from '../categories/category';

describe('ReleaseComponent', () => {
  let comp: ReleaseComponent;
  let fixture: ComponentFixture<ReleaseComponent>;
  let el: HTMLSelectElement;
  let de: DebugElement;
  let service: CategoryService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, FormsModule, HttpModule, MultiSelectModule],
      declarations: [ReleaseComponent],
      providers: [CategoryService]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReleaseComponent);
    comp = fixture.componentInstance;

    spyOn(fixture.debugElement.componentInstance.categoryService, 'getCategories').and.returnValue(Promise.resolve([
      { id: 2, category_id: '2', title: 'Release', category_type: { title: 'Release' } }
    ]));
  });

  it('should have a defined releases component', () => {
    expect(comp).toBeDefined();
  });

  it('getReleases() should able to get all the  releases', async(() => {
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      expect(comp.releases.length).toBeGreaterThan(0);
    });
  }));

  it('should able to display all the  releases in select html element', async(() => {
    de = fixture.debugElement.query(By.css('p-multiSelect'));
    el = de.nativeElement;
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      expect(el.getElementsByTagName('li').length).toEqual(comp.releases.length);
    });
  }));
});


