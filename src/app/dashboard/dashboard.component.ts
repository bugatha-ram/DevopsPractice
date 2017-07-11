import { ViewChild, Component, OnInit } from '@angular/core';
import { User } from '../user';

import { UserService } from '../user.service';
import { AdhocService } from '../adhoc/adhoc.service';

import { ColsDisplayComponent } from '../cols_display/cols_display.component';
import { TestplanComponent } from '../testplans/testplans.component';
import { BizfunctionComponent } from '../bizfunctions/bizfunctions.component';
import { BizsubfunctionComponent } from '../bizsubfunctions/bizsubfunctions.component';
import { ReleaseComponent } from '../releases/releases.component';
import { TestTypeComponent } from '../test_types/test_types.component';
import { TestcaseownerComponent } from '../testcase_owners/testcase_owners.component';
import { TestscriptownerComponent } from '../testscript_owners/testscript_owners.component';
import { TestcaseComponent } from '../testcases/testcase.component';
import { ExecutionresultComponent } from '../execution_results/executionresult.component';
import { CapabilityTeamComponent } from '../capability_team/capability_team.component';

import { DataTableModule } from 'primeng/primeng';

@Component({
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {
  currentUser: User;
  users: User[] = [];
  loggedIn = localStorage.getItem('token');
  testplan_cols: any[] = [];
  testcase_cols: any[] = [];
  testscript_cols: any[] = [];
  testscript_step_cols: any[] = [];
  executionresult_cols: any[] = [];
  executionresult_step_cols: any[] = [];
  showreportdata: boolean;
  test_plans: any[] = [];
  test_cases: any[] = [];
  cols: any[];
  rows: any[] = [];
  row_count: number = 0;
  NoData: boolean;
  isResetting: boolean = false;

  @ViewChild(TestplanComponent) testplanComponent: TestplanComponent
  @ViewChild(TestcaseComponent) testcaseComponent: TestcaseComponent
  @ViewChild(BizfunctionComponent) bizfunctionComponent: BizfunctionComponent
  @ViewChild(ColsDisplayComponent) colsdisplayComponent: ColsDisplayComponent
  @ViewChild(BizsubfunctionComponent) bizsubfunctionComponent: BizsubfunctionComponent
  @ViewChild(TestcaseownerComponent) testcaseownerComponent: TestcaseownerComponent
  @ViewChild(TestscriptownerComponent) testscriptownerComponent: TestscriptownerComponent
  @ViewChild(ReleaseComponent) releaseComponent: ReleaseComponent
  @ViewChild(TestTypeComponent) testTypeComponent: TestTypeComponent
  @ViewChild(ExecutionresultComponent) executionResultComponent: ExecutionresultComponent
  @ViewChild(CapabilityTeamComponent) capabilityTeamComponent: CapabilityTeamComponent

  constructor(private adhocService: AdhocService) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.NoData = false;
  }

  // Takes a string in dot notation i.e. 'data_json.content.testplan.owner._'
  // And convert it to bracket notation i.e '[data_json][content][testplan][owner][_]'
  // So that we can access nested object properties
  readData(o: any, s: string): any {
    try {
      s = s.replace(/\[(\w+)\]/g, '.$1'); // convert indexes to properties
      s = s.replace(/^\./, '');           // strip a leading dot
      var a = s.split('.');
      for (var i = 0, n = a.length; i < n; ++i) {
        var k = a[i];
        if (k in o) {
          o = o[k];
        } else {
          return;
        }
      }
      return o;
    } catch (e) {
      return '';
    }
  }

  ngOnInit() {
  }

  //By Making isResetting true deletes the form
  //With in no time by making isResetting false creates new form
  reset() {
    this.NoData = false;
    this.test_plans = [];
    this.isResetting = true;
    setTimeout(() => this.isResetting = false, 0);
    return false;
  }

  getReport() {
    let testplan = this.testplanComponent.testplan;
    let bizfunction = this.bizfunctionComponent.bizfunction;
    let bizsubfunction = this.bizsubfunctionComponent.bizsubfunction;
    let testcase_owner = this.testcaseownerComponent.testcase_owner;
    let testscript_owner = this.testscriptownerComponent.testscript_owner;

    this.testplan_cols = this.colsdisplayComponent.testplan_cols.filter(function(testplan_col) {
      return testplan_col.selected;
    });
    this.testcase_cols = this.colsdisplayComponent.testcase_cols.filter(function(testcase_col) {
      return testcase_col.selected;
    });
    this.testscript_cols = this.colsdisplayComponent.testscript_cols.filter(function(testscript_col) {
      return testscript_col.selected;
    });

    this.testscript_step_cols = this.colsdisplayComponent.testscript_step_cols.filter(testscript_step_col => testscript_step_col.selected);

    this.executionresult_cols = this.colsdisplayComponent.executionresult_cols.filter(executionresult_col => executionresult_col.selected);

    this.executionresult_step_cols = this.colsdisplayComponent.executionresult_step_cols.filter(executionresult_step_col => executionresult_step_col.selected);

    this.cols = this.testplan_cols.concat(this.testcase_cols).concat(this.testscript_cols).concat(this.testscript_step_cols).concat(this.executionresult_cols).concat(this.executionresult_step_cols);

    let data = {
      test_plans: testplan,
      bizfunctions: bizfunction,
      bizsubfunctions: bizsubfunction,
      capability_teams:this.capabilityTeamComponent.capability_team,
      test_case_owners: testcase_owner,
      test_script_owners: testscript_owner,
      releases: this.releaseComponent.release,
      test_types: this.testTypeComponent.test_type,
      testcases: this.testcaseComponent.testcase,
      executionresults: this.executionResultComponent.executionresult,
      testplan_cols: this.testplan_cols.map(col => col.name).join(',') || null,
      testcase_cols: this.testcase_cols.map(col => col.name).join(',') || null,
      testscript_cols: this.testscript_cols.map(col => col.name).join(',') || null,
      testscript_step_cols: this.testscript_step_cols.map(col => col.name).join(',') || null,
      executionresult_cols: this.executionresult_cols.map(col => col.name).join(',') || null,
      executionresult_step_cols: this.executionresult_step_cols.map(col => col.name).join(',') || null,
    };

    this.adhocService.getReport(data).then((response: any[]) => {
      this.test_plans = response;
      let steps: any;
      // TODO: find a smarter way to do this
      // 1) Flatten `this.test_plans` into an array of rows so it's easier to display in a table format
      // 2) Remove data if columns-to-display are not chosen
      this.rows = [];
      this.row_count = 0;
      this.test_plans.forEach((test_plan: any) => {
        this.rows[this.row_count] = { test_plan: test_plan }
        if (test_plan.test_cases && (data.testcase_cols || data.testscript_cols || data.testscript_step_cols || data.executionresult_cols)) {
          test_plan.test_cases.forEach((test_case: any) => {
            this.rows[this.row_count] = { test_plan: test_plan, test_case: test_case }
            if (test_case.test_scripts && (data.testscript_cols || data.testscript_step_cols || data.executionresult_cols)) {
              test_case.test_scripts.forEach((test_script: any) => {
                this.rows[this.row_count] = { test_plan: test_plan, test_case: test_case, test_script: test_script }
                if ((test_script.steps && data.testscript_step_cols)) {
                  test_script.steps.forEach((step: any) => {
                    this.rows[this.row_count] = { test_plan: test_plan, test_case: test_case, test_script: test_script, test_script_step: step }
                    this.row_count++;                  
                  })
                }
                if ((test_script.execution && data.executionresult_step_cols) || (test_script.execution && data.executionresult_cols)) {
                  if (test_script.execution.current_execution_result) {
                    this.rows[this.row_count] = { test_plan: test_plan, test_case: test_case, test_script: test_script, execution_result: test_script.execution.current_execution_result }
                    test_script.execution.current_execution_result.steps.forEach((step: any) => {
                      step.stepType = step.stepType.split('.')[step.stepType.split('.').length - 1];
                      if (step.result.length > 0) {
                        step.result = step.result[0].split('.')[step.result[0].split('.').length - 1];
                      }
                      this.rows[this.row_count] = { test_plan: test_plan, test_case: test_case, test_script: test_script, execution_result: test_script.execution.current_execution_result, execution_step_result: step }
                      this.row_count++;
                    })
                  }
                }
                if (typeof this.rows[this.row_count] !== 'undefined') {
                  this.row_count++;
                }
              })
            }
            if (typeof this.rows[this.row_count] !== 'undefined') {
              this.row_count++;
            }
          })
        }
        if (typeof this.rows[this.row_count] !== 'undefined') {
          this.row_count++;
        }
      })
      // filter for rows that are the same size (ie. have the most keys)
      // because missing a key means it does not have all the data and should be excluded
      this.rows = this.rows.reduce((memo, row) => {
        let memo_length = Object.keys(memo[0]).length
        let row_length = Object.keys(row).length
        if (row_length > memo_length) {
          memo = [row];
        } else if (row_length === memo_length) {
          memo = memo.concat(row);
        }
        return memo;
      }, [{}]);
      this.NoData = this.test_plans.length == 0 ? true : false; // Purpose of displaying/reset no data available message
    });
  }

  tableToExcel(table: any, name: any) {
    // Importing these two packages doesn't work
    // There are some errors in their @types definitions
    // Doing this works and does not generate typescript errors
    let FileSaver = require('file-saver');
    let XLSX = require('xlsx');

    let tbl: HTMLTableElement = <HTMLTableElement> document.getElementById(table);
    let wb = XLSX.utils.table_to_book(tbl);

    // reference: http://sheetjs.com/demos/writexlsx.html
    let wbout = XLSX.write(wb, {bookType:'xlsx', bookSST:true, type: 'binary'});
	  let buf = new ArrayBuffer(wbout.length);
	  let view = new Uint8Array(buf);
	  for (var i=0; i!=wbout.length; ++i) view[i] = wbout.charCodeAt(i) & 0xFF;

    FileSaver(new Blob([buf],{type:"application/octet-stream"}), "adhoc.xlsx")
  }
}
