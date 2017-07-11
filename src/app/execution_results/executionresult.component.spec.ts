import { ActivatedRoute } from '@angular/router';
import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { ExecutionresultComponent } from './executionresult.component';
import { MultiSelectModule, SelectItem } from 'primeng/primeng';

describe('ExecutionresultComponent', function() {

  let comp: ExecutionresultComponent;
  let fixture: ComponentFixture<ExecutionresultComponent>;
  let el: HTMLSelectElement;
  let de: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, FormsModule, HttpModule, MultiSelectModule],
      declarations: [ExecutionresultComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExecutionresultComponent);
    comp = fixture.componentInstance;
  });

  it('should have a defined ExecutionresultComponent', () => {
    expect(comp).toBeDefined();
  });

  it('should able to display all the  executionresults in select html element', () => {
    de = fixture.debugElement.query(By.css('p-multiSelect'));
    el = de.nativeElement;
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      expect(el.getElementsByTagName('li').length).toEqual(comp.executionresults.length);
    });
  });
});