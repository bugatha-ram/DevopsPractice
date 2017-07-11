import { ActivatedRoute } from '@angular/router';
import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { TestcaseService } from '../testcases/testcases.service';
import { TestcaseownerComponent } from './testcase_owners.component';
import { MultiSelectModule, SelectItem } from 'primeng/primeng';

describe('TestcaseownerComponent', function() {

  let comp: TestcaseownerComponent;
  let fixture: ComponentFixture<TestcaseownerComponent>;
  let el: HTMLSelectElement;
  let de: DebugElement;
  let service: TestcaseService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, FormsModule, HttpModule,MultiSelectModule],
      declarations: [TestcaseownerComponent],
      providers: [TestcaseService]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestcaseownerComponent);
    comp = fixture.componentInstance;

    spyOn(fixture.debugElement.componentInstance.testcaseService, 'getTestCases').and.returnValue(Promise.resolve([
      { id: 1, title: 'string', data_json: { content: { testcase: { owner: { _: 'string' } } } } }
    ]));
  });

  beforeEach(inject([TestcaseService], (testcaseService: TestcaseService) => {
    service = testcaseService;
  }));

  it('should have a defined testcase owner component', () => {
    expect(comp).toBeDefined();
  });

  it('should able to getTestCaseOwners()', async(() => {
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      expect(comp.testcase_owners.length).toBeGreaterThan(0);
    });
  }));

  it('should able to display all the  testcase owners in select html element', async(() => {
    de = fixture.debugElement.query(By.css('p-multiSelect'));
    el = de.nativeElement;
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      expect(el.getElementsByTagName('li').length).toEqual(comp.testcase_owners.length);
    });
  }));
});
