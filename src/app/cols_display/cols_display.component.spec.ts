import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { ColsDisplayComponent } from './cols_display.component';
import { AdhocService } from '../adhoc/adhoc.service';

describe('ColsDisplayComponent', () => {
  let component: ColsDisplayComponent;
  let fixture: ComponentFixture<ColsDisplayComponent>;
  let service: AdhocService;
  let el: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, FormsModule, HttpModule],
      declarations: [ColsDisplayComponent],
      providers: [AdhocService]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ColsDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  beforeEach(inject([AdhocService], (adhocService: AdhocService) => {
    service = adhocService;
  }));

  it('should have a defined ColsDisplayComponent', () => {
    expect(component).toBeDefined();
  });

  it('should have all columns-to-display checkboxes', () => {
    component.testplan_cols.concat(component.testcase_cols).concat(component.testscript_cols).forEach((col)=>{
      el = fixture.debugElement.query(By.css("input[value='"+col.name+"']"));
      expect(el).not.toBeNull();
    });
  });
});
