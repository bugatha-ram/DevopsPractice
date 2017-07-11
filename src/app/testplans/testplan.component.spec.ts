import { ActivatedRoute } from '@angular/router';
import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { TestplanService } from './testplans.service';
import { TestplanComponent } from './testplans.component';
import { MultiSelectModule, SelectItem } from 'primeng/primeng';

describe('TestplanComponent', function() {

  let comp: TestplanComponent;
  let fixture: ComponentFixture<TestplanComponent>;
  let el: HTMLSelectElement;
  let de: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, FormsModule, HttpModule, MultiSelectModule],
      declarations: [TestplanComponent],
      providers: [TestplanService]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestplanComponent);
    comp = fixture.componentInstance;

    spyOn(fixture.debugElement.componentInstance.testplanService, 'getTestPlans').and.returnValue(Promise.resolve([
      { id: 1, test_plan_id: 100, title: 'string' }
    ]));
  });

  it('should have a defined TestplanComponent', () => {
    expect(comp).toBeDefined();
  });

  it('should able to getTestPlans()', async(() => {
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      expect(comp.testplans.length).toBeGreaterThan(0);
    });
  }));

  it('should able to display all the  testplans in select html element', async(() => {
    de = fixture.debugElement.query(By.css('p-multiSelect'));
    el = de.nativeElement;
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      expect(el.getElementsByTagName('li').length).toEqual(comp.testplans.length);
    });
  }));
});
