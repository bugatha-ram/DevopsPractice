import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpModule } from "@angular/http";
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';

import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { MultiSelectModule } from 'primeng/primeng';

import { DashboardComponent } from './dashboard.component';
import { TestplanComponent } from '../testplans/testplans.component';
import { BizfunctionComponent } from '../bizfunctions/bizfunctions.component';
import { BizsubfunctionComponent } from '../bizsubfunctions/bizsubfunctions.component';
import { ReleaseComponent } from '../releases/releases.component';
import { TestTypeComponent } from '../test_types/test_types.component';
import { TestcaseownerComponent } from '../testcase_owners/testcase_owners.component';
import { TestscriptownerComponent } from '../testscript_owners/testscript_owners.component';
import { ColsDisplayComponent } from '../cols_display/cols_display.component';
import { TestcaseComponent } from '../testcases/testcase.component';
import { ExecutionresultComponent } from '../execution_results/executionresult.component';
import { CapabilityTeamComponent } from '../capability_team/capability_team.component';

import { AdhocService } from '../adhoc/adhoc.service';

describe('DashboardComponent', () => {

  let comp: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let de: DebugElement;
  let el: HTMLElement;
  let getReportSpy: jasmine.Spy;
  let testplans: any;
  let testcases: any;
  let testscripts: any;
  let testscript_steps: any;
  let execution_results: any;

  // async beforeEach
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [
        AdhocService
      ],
      imports: [
        RouterTestingModule,
        FormsModule,
        MultiSelectModule,
        HttpModule
      ],
      declarations: [
        DashboardComponent,
        TestplanComponent,
        BizfunctionComponent,
        BizsubfunctionComponent,
        ReleaseComponent,
        TestTypeComponent,
        TestcaseownerComponent,
        TestscriptownerComponent,
        TestcaseComponent,
        ExecutionresultComponent,
        CapabilityTeamComponent,
        ColsDisplayComponent
      ], // declare the test component
    })
      .compileComponents();  // compile template and css
  }));

  // synchronous beforeEach
  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComponent);

    comp = fixture.componentInstance; // DashboardComponent test instance

    // TODO: figure out how to generate this
    // Some fake data
    testplans = [{ id: 1, test_plan_id: 'test_plan_1', title: 'testplan 1', release: '1.0', test_type: 'System Test', test_cases: [] as any }];
    testcases = [{ id: 1, test_case_id: 'test_case_1', title: 'testcase 1', test_scripts: [] as any }, { id: 2, test_case_id: 'test_case_2', title: 'testcase 2', test_scripts: [] as any }];
    testscripts = [{ id: 1, test_script_id: 'test_script_1', title: 'testscript 1' }, { id: 2, test_script_id: 'test_script_2', title: 'testscript 2' }, { id: 3, test_script_id: 'test_script_3', title: 'testscript 3' }];
    testscript_steps = [{ name: 'step_1', stepIndex: '1', type: 'step_type_1' }, { name: 'step_2', stepIndex: '2', type: 'step_type_2' }]
    execution_results = [{ expectedResult: 'pass', stepIndex: '1', type: 'step_type_1' }, { name: 'fail', stepIndex: '2', type: 'step_type_2' }]

    testplans[0].test_cases = testcases;
    testplans[0].test_cases[0].test_scripts = testscripts;
    testplans[0].test_cases[0].test_scripts[0].steps = testscript_steps;
    testplans[0].test_cases[0].test_scripts[0].executions = execution_results;

    // The *ngIf on the form#adhocReport requires us to do this or else
    // fixture.debugElement.componentInstance.testplanComponent will be undefined
    // TODO: figure out wtf is going on
    fixture.detectChanges();

    spyOn(fixture.debugElement.componentInstance.testplanComponent.testplanService, 'getTestPlans').and.returnValue(Promise.resolve([
      { 'id': 1, 'test_plan_id': 100, title: 'test plan 1' }
    ]));

    spyOn(fixture.debugElement.componentInstance.testcaseComponent.testcaseService, 'getTestCases').and.returnValue(Promise.resolve([
      { id: 1, test_case_id: '123', title: 'string', data_json: { content: { testcase: { owner: { _: 'string' } } } } }
    ]));

    spyOn(fixture.debugElement.componentInstance.bizfunctionComponent.categoryService, 'getCategories').and.returnValue(Promise.resolve([
      { 'id': 1, 'category_id': '1', 'title': 'Business Function', 'category_type': { title: 'Business Function' } },
    ]));

    spyOn(fixture.debugElement.componentInstance.bizsubfunctionComponent.categoryService, 'getCategories').and.returnValue(Promise.resolve([
      { 'id': 2, 'category_id': '2', 'title': 'Business Subfunction', 'category_type': { title: 'Business Subfunction' } }
    ]));

    spyOn(fixture.debugElement.componentInstance.capabilityTeamComponent.categoryService, 'getCategories').and.returnValue(Promise.resolve([
      { 'id': 2, 'category_id': '2', 'title': 'Capability Team', 'category_type': { title: 'Capability Team' } }
    ]));

    spyOn(fixture.debugElement.componentInstance.releaseComponent.categoryService, 'getCategories').and.returnValue(Promise.resolve([
      { 'id': 3, 'category_id': '3', 'title': 'Release', 'category_type': { title: 'Release' } }
    ]));

    spyOn(fixture.debugElement.componentInstance.testTypeComponent.categoryService, 'getCategories').and.returnValue(Promise.resolve([
      { 'id': 4, 'category_id': '4', 'title': 'Test Type', 'category_type': { title: 'Test Type' } }
    ]));

    spyOn(fixture.debugElement.componentInstance.testcaseownerComponent.testcaseService, 'getTestCases').and.returnValue(Promise.resolve([
      { id: 1, title: 'string', data_json: { content: { testcase: { owner: { _: 'string' } } } } }
    ]));

    spyOn(fixture.debugElement.componentInstance.testscriptownerComponent.testscriptService, 'getTestScripts').and.returnValue(Promise.resolve([
      { id: 1, title: 'string', data_json: { content: { testscript: { owner: { _: 'string' } } } } }
    ]));

    spyOn(fixture.debugElement.componentInstance.adhocService, 'getReport').and.returnValue(Promise.resolve(testplans));
  });

  it('should display TestplanComponent', async(() => {
    el = fixture.debugElement.query(By.css('#testplans')).nativeElement;

    fixture.detectChanges();

    fixture.whenStable().then(() => {
      fixture.detectChanges();

      expect(el.getElementsByTagName('li').length).toEqual(2);
    });
  }));

  it('should display TestcaseComponent', async(() => {
    el = fixture.debugElement.query(By.css('#testcases')).nativeElement;

    fixture.detectChanges();

    fixture.whenStable().then(() => {
      fixture.detectChanges();

      expect(el.getElementsByTagName('li').length).toEqual(2);
    });
  }));

  it('should display BizfunctionComponent', async(() => {
    el = fixture.debugElement.query(By.css('#bizfunctions')).nativeElement;

    fixture.detectChanges();

    fixture.whenStable().then(() => {
      fixture.detectChanges();

      expect(el.getElementsByTagName('li').length).toEqual(2);
    });
  }));

  it('should display BizsubfunctionComponent', async(() => {
    el = fixture.debugElement.query(By.css('#bizsubfunctions')).nativeElement;

    fixture.detectChanges();

    fixture.whenStable().then(() => {
      fixture.detectChanges();

      expect(el.getElementsByTagName('li').length).toEqual(2);
    });
  }));

  it('should display CapabilityTeamComponent', async(() => {
    el = fixture.debugElement.query(By.css('#capability_teams')).nativeElement;

    fixture.detectChanges();

    fixture.whenStable().then(() => {
      fixture.detectChanges();

      expect(el.getElementsByTagName('li').length).toEqual(2);
    });
  }));

  it('should display ReleaseComponent', async(() => {
    el = fixture.debugElement.query(By.css('#releases')).nativeElement;

    fixture.detectChanges();

    fixture.whenStable().then(() => {
      fixture.detectChanges();

      expect(el.getElementsByTagName('li').length).toEqual(2);
    });
  }));

  it('should display TestTypeComponent', async(() => {
    el = fixture.debugElement.query(By.css('#test_types')).nativeElement;

    fixture.detectChanges();

    fixture.whenStable().then(() => {
      fixture.detectChanges();

      expect(el.getElementsByTagName('li').length).toEqual(2);
    });
  }));

  it('should display TestcaseownerComponent', async(() => {
    el = fixture.debugElement.query(By.css('#testcase_owners')).nativeElement;

    fixture.detectChanges();

    fixture.whenStable().then(() => {
      fixture.detectChanges();

      expect(el.getElementsByTagName('li').length).toEqual(2);
    });
  }));

  it('should display TestscriptownerComponent', async(() => {
    el = fixture.debugElement.query(By.css('#testscript_owners')).nativeElement;

    fixture.detectChanges();

    fixture.whenStable().then(() => {
      fixture.detectChanges();

      expect(el.getElementsByTagName('li').length).toEqual(2);
    });
  }));

  it('should display ExecutionresultComponent', async(() => {
    el = fixture.debugElement.query(By.css('#executionresults')).nativeElement;

    fixture.detectChanges();

    fixture.whenStable().then(() => {
      fixture.detectChanges();

      expect(el.getElementsByTagName('li').length).toBeGreaterThan(1);
    });
  }));

  // TODO: Maybe add checking for some input fields?
  it('should display ColsDisplayComponent', async(() => {
    fixture.detectChanges();

    fixture.whenStable().then(() => {
      fixture.detectChanges();
      el = fixture.debugElement.query(By.css("cols-display")).nativeElement;
      expect(el.getElementsByTagName('input').length).toBeGreaterThan(0);
    });
  }));

  it('should display datatable after getReport()', async(() => {
    fixture.detectChanges();
    comp.colsdisplayComponent.testplan_cols[0].selected = true
    comp.colsdisplayComponent.testplan_cols[2].selected = true
    comp.colsdisplayComponent.testcase_cols[0].selected = true
    comp.colsdisplayComponent.testcase_cols[2].selected = true
    comp.colsdisplayComponent.testscript_cols[0].selected = true
    comp.colsdisplayComponent.testscript_cols[2].selected = true

    comp.getReport();

    fixture.whenStable().then(() => {
      fixture.detectChanges();

      el = fixture.debugElement.query(By.css("#datatable")).nativeElement;
      expect(el.getElementsByTagName('th').length).toBeGreaterThan(0);
      expect(el.getElementsByTagName('tr').length).toBeGreaterThan(0);
    });
  }));

  it('should display test_cases if testcase_cols are requested in getReport()', async(() => {
    fixture.detectChanges();

    comp.colsdisplayComponent.testplan_cols[0].selected = true
    comp.colsdisplayComponent.testcase_cols[0].selected = true

    comp.getReport();

    fixture.whenStable().then(() => {
      fixture.detectChanges();

      el = fixture.debugElement.query(By.css("#datatable")).nativeElement;
      expect(el.getElementsByTagName('th')[0].innerText).toEqual(comp.colsdisplayComponent.testplan_cols[0].label);
      expect(el.getElementsByTagName('th')[1].innerText).toEqual(comp.colsdisplayComponent.testcase_cols[0].label);
      // one row for header, two rows for each testcase
      expect(el.getElementsByTagName('tr').length).toBe(3);
      expect(el.getElementsByTagName('tr')[1].getElementsByTagName('td')[0].innerText).toEqual(testplans[0].test_plan_id);
      expect(el.getElementsByTagName('tr')[1].getElementsByTagName('td')[1].innerText).toEqual(testplans[0].test_cases[0].test_case_id);
      expect(el.getElementsByTagName('tr')[2].getElementsByTagName('td')[0].innerText).toEqual(testplans[0].test_plan_id);
      expect(el.getElementsByTagName('tr')[2].getElementsByTagName('td')[1].innerText).toEqual(testplans[0].test_cases[1].test_case_id);
    });
  }));

  it('should display test_scripts if testscript_cols are requested in getReport()', async(() => {
    fixture.detectChanges();

    comp.colsdisplayComponent.testplan_cols[0].selected = true
    comp.colsdisplayComponent.testscript_cols[0].selected = true

    comp.getReport();

    fixture.whenStable().then(() => {
      fixture.detectChanges();

      el = fixture.debugElement.query(By.css("#datatable")).nativeElement;
      expect(el.getElementsByTagName('th')[0].innerText).toEqual(comp.colsdisplayComponent.testplan_cols[0].label);
      expect(el.getElementsByTagName('th')[1].innerText).toEqual(comp.colsdisplayComponent.testscript_cols[0].label);
      // one row for header, three rows for testscripts from test_cases[0]
      expect(el.getElementsByTagName('tr').length).toBe(4);
      expect(el.getElementsByTagName('tr')[1].getElementsByTagName('td')[0].innerText).toEqual(testplans[0].test_plan_id);
      expect(el.getElementsByTagName('tr')[1].getElementsByTagName('td')[1].innerText).toEqual(testplans[0].test_cases[0].test_scripts[0].test_script_id);
      expect(el.getElementsByTagName('tr')[2].getElementsByTagName('td')[0].innerText).toEqual(testplans[0].test_plan_id);
      expect(el.getElementsByTagName('tr')[2].getElementsByTagName('td')[1].innerText).toEqual(testplans[0].test_cases[0].test_scripts[1].test_script_id);
      expect(el.getElementsByTagName('tr')[3].getElementsByTagName('td')[0].innerText).toEqual(testplans[0].test_plan_id);
      expect(el.getElementsByTagName('tr')[3].getElementsByTagName('td')[1].innerText).toEqual(testplans[0].test_cases[0].test_scripts[2].test_script_id);
    });
  }));

  it('should not display test_cases if testcase_cols are not requested in getReport()', async(() => {
    fixture.detectChanges();

    comp.colsdisplayComponent.testplan_cols[0].selected = true

    comp.getReport();

    fixture.whenStable().then(() => {
      fixture.detectChanges();

      el = fixture.debugElement.query(By.css("#datatable")).nativeElement;
      expect(el.getElementsByTagName('th')[0].innerText).toEqual(comp.colsdisplayComponent.testplan_cols[0].label);
      // There should only be two rows, the header, and the testplan.
      expect(el.getElementsByTagName('tr').length).toBe(2);
      expect(el.getElementsByTagName('tr')[1].getElementsByTagName('td')[0].innerText).toEqual(testplans[0].test_plan_id);
    });
  }));

  it('should not display test_scripts if testscript_cols are not requested in getReport()', async(() => {
    fixture.detectChanges();

    comp.colsdisplayComponent.testplan_cols[0].selected = true
    comp.colsdisplayComponent.testcase_cols[0].selected = true

    comp.getReport();

    fixture.whenStable().then(() => {
      fixture.detectChanges();

      el = fixture.debugElement.query(By.css("#datatable")).nativeElement;
      expect(el.getElementsByTagName('th')[0].innerText).toEqual(comp.colsdisplayComponent.testplan_cols[0].label);
      expect(el.getElementsByTagName('th')[1].innerText).toEqual(comp.colsdisplayComponent.testcase_cols[0].label);
      // one for header, two for testcases
      expect(el.getElementsByTagName('tr').length).toBe(3);
      expect(el.getElementsByTagName('tr')[1].getElementsByTagName('td')[0].innerText).toEqual(testplans[0].test_plan_id);
      expect(el.getElementsByTagName('tr')[1].getElementsByTagName('td')[1].innerText).toEqual(testcases[0].test_case_id);
      expect(el.getElementsByTagName('tr')[2].getElementsByTagName('td')[0].innerText).toEqual(testplans[0].test_plan_id);
      expect(el.getElementsByTagName('tr')[2].getElementsByTagName('td')[1].innerText).toEqual(testcases[1].test_case_id);
    });
  }));

  it('should display testscript_steps if testscript_step_cols are requested in getReport()', async(() => {
    fixture.detectChanges();

    comp.colsdisplayComponent.testplan_cols[0].selected = true
    comp.colsdisplayComponent.testscript_step_cols[0].selected = true

    comp.getReport();

    fixture.whenStable().then(() => {
      fixture.detectChanges();

      el = fixture.debugElement.query(By.css("#datatable")).nativeElement;
      expect(el.getElementsByTagName('th')[0].innerText).toEqual(comp.colsdisplayComponent.testplan_cols[0].label);
      expect(el.getElementsByTagName('th')[1].innerText).toEqual(comp.colsdisplayComponent.testscript_step_cols[0].label);
      // one for header, two testscript_steps
      expect(el.getElementsByTagName('tr').length).toBe(3);
      expect(el.getElementsByTagName('tr')[1].getElementsByTagName('td')[0].innerText).toEqual(testplans[0].test_plan_id);
      expect(el.getElementsByTagName('tr')[1].getElementsByTagName('td')[1].innerText).toEqual(testscript_steps[0].stepIndex);
      expect(el.getElementsByTagName('tr')[2].getElementsByTagName('td')[0].innerText).toEqual(testplans[0].test_plan_id);
      expect(el.getElementsByTagName('tr')[2].getElementsByTagName('td')[1].innerText).toEqual(testscript_steps[1].stepIndex);
    });
  }));

  it('should display execution results if executionresult_cols are requested in getReport()', async(() => {
    fixture.detectChanges();

    comp.colsdisplayComponent.testplan_cols[0].selected = true
    comp.colsdisplayComponent.executionresult_cols[0].selected = true

    comp.getReport();

    fixture.whenStable().then(() => {
      fixture.detectChanges();

      el = fixture.debugElement.query(By.css("#datatable")).nativeElement;
      expect(el.getElementsByTagName('th')[0].innerText).toEqual(comp.colsdisplayComponent.testplan_cols[0].label);
      expect(el.getElementsByTagName('th')[1].innerText).toEqual(comp.colsdisplayComponent.executionresult_cols[0].label);
      // one for header, two testscript_steps
      expect(el.getElementsByTagName('tr').length).toBe(3);
      expect(el.getElementsByTagName('tr')[1].getElementsByTagName('td')[0].innerText).toEqual(testplans[0].test_plan_id);
      expect(el.getElementsByTagName('tr')[1].getElementsByTagName('td')[1].innerText).toEqual(execution_results[0].stepIndex);
      expect(el.getElementsByTagName('tr')[2].getElementsByTagName('td')[0].innerText).toEqual(testplans[0].test_plan_id);
      expect(el.getElementsByTagName('tr')[2].getElementsByTagName('td')[1].innerText).toEqual(execution_results[1].stepIndex);
    });
  }));

  // regression test for missing relese data bug found during sprint 7 demo
  it('should display release data if testplan_cols `release` is selected', async(() => {
    fixture.detectChanges();

    let release_col = comp.colsdisplayComponent.testplan_cols.find((col) => {
      return col.datakey == 'release'
    });

    release_col.selected = true;

    comp.getReport();

    fixture.whenStable().then(() => {
      fixture.detectChanges();

      el = fixture.debugElement.query(By.css("#datatable")).nativeElement;
      expect(el.getElementsByTagName('th')[0].innerText).toEqual(release_col.label);
      // one for header, one for testplan
      expect(el.getElementsByTagName('tr').length).toBe(2);
      expect(el.getElementsByTagName('tr')[1].getElementsByTagName('td')[0].innerText).toEqual(testplans[0].release);
    });
  }));

  // regression test for missing test_type data bug found during sprint 7 demo
  it('should display test_type data if testplan_cols `test_type` is selected', async(() => {
    fixture.detectChanges();

    let test_type_col = comp.colsdisplayComponent.testplan_cols.find((col) => {
      return col.datakey == 'test_type'
    });

    test_type_col.selected = true;

    comp.getReport();

    fixture.whenStable().then(() => {
      fixture.detectChanges();

      el = fixture.debugElement.query(By.css("#datatable")).nativeElement;
      expect(el.getElementsByTagName('th')[0].innerText).toEqual(test_type_col.label);
      // one for header, one for testplan
      expect(el.getElementsByTagName('tr').length).toBe(2);
      expect(el.getElementsByTagName('tr')[1].getElementsByTagName('td')[0].innerText).toEqual(testplans[0].test_type);
    });
  }));

  it('should empty all selections and datatable by clicking reset button', async(() => {
    fixture.detectChanges();

    comp.reset();

    fixture.whenStable().then(() => {
      fixture.detectChanges();

      el = fixture.debugElement.query(By.css("#adhocReport")).nativeElement;
      expect(comp.test_plans.length).toEqual(0);
      expect(comp.isResetting).toBe(false);
    });
  }));
});
