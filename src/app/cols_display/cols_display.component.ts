import { Component, OnInit } from '@angular/core';
import { AdhocService } from '../adhoc/adhoc.service';

@Component({
  selector: 'cols-display',
  templateUrl: './cols_display.component.html',
  styleUrls: ['./cols_display.component.css']
})
export class ColsDisplayComponent implements OnInit {
  testplan_cols: any[];
  testcase_cols: any[];
  testscript_cols: any[];
  testscript_step_cols: any[];
  executionresult_cols: any[];
  executionresult_step_cols: any[];
  selectAllTestscripts: boolean;
  selectAllTestcases: boolean;
  selectAllTestplans: boolean;
  stepCheck: boolean;
  executionCheck: boolean;

  constructor() {
    this.testplan_cols = [
      { datakey: 'test_plan_id', name: 'test_plan_id', label: 'Test Plan ID', selected: false },
      { datakey: 'title', name: 'test_plan_name', label: 'Test Plan Name', selected: false },
      { datakey: 'state', name: 'test_plan_state', label: 'Test Plan State', selected: false },
      { datakey: 'summary', name: 'test_plan_overview', label: 'Test Plan Overview', selected: false },
      { datakey: 'release', name: 'test_plan_release', label: 'Release', selected: false },
      { datakey: 'test_type', name: 'test_plan_testType', label: 'Test Type', selected: false },
      { datakey: 'text', name: 'test_plan_text', label: 'Test Plan Description', selected: false },
    ]

    this.testcase_cols = [
      { datakey: 'test_case_id', name: 'test_case_id', label: 'Test Case ID', selected: false },
      { datakey: 'title', name: 'test_case_name', label: 'Test Case Name', selected: false },
      { datakey: 'state', name: 'test_case_state', label: 'Test Case State', selected: false },
      { datakey: 'originator', name: 'test_case_originator', label: 'Test Case Originator', selected: false },
      { datakey: 'owner', name: 'test_case_owner', label: 'Test Case Owner', selected: false },
      { datakey: 'data_json.content.testcase.description', name: 'test_case_description', label: 'Test Case Description', selected: false },
      { datakey: 'bizfunctions', name: 'bizfunction', label: 'Business Function', selected: false },
      { datakey: 'bizsubfunctions', name: 'bizsubfunction', label: 'Business Subfunction', selected: false },
      { datakey: 'capability_teams', name: 'test_case_capabilityTeam', label: 'Capability Team', selected: false },
      { datakey: 'estimated_number_of_test_scripts', name: 'test_case_EstNoOfScripts', label: 'Est Number of Scripts', selected: false },
      { datakey: 'loe_total', name: 'test_case_TestScriptWritingLOE', label: 'Test Script Writing LOE', selected: false },
      { datakey: 'expected_results', name: 'test_case_ExpectedResults', label: 'Test Case Expected Results', selected: false },
      { datakey: 'test_case_design', name: 'test_case_TestCaseDesign', label: 'Test Case Design', selected: false },
      { datakey: 'notes', name: 'test_case_precondition', label: 'Test Case Precondition', selected: false },
      { datakey: 'updated', name: 'test_case_lastModifiedDate', label: 'Test Case Last Modified Date', selected: false },
    ]

    this.testscript_cols = [
      { datakey: 'test_script_id', name: 'test_script_id', label: 'Test Script ID', selected: false },
      { datakey: 'title', name: 'test_script_name', label: 'Test Script Name', selected: false },
      { datakey: 'state', name: 'test_script_state', label: 'Test Script State', selected: false },
      { datakey: 'test_script_originator', name: 'test_script_originator', label: 'Test Script Originator', selected: false },
      { datakey: 'owner', name: 'test_script_owner', label: 'Test Script Owner', selected: false },
      { datakey: 'test_script_description', name: 'test_script_description', label: 'Test Script Description', selected: false },
      { datakey: 'test_script_testdata', name: 'test_script_testdata', label: 'Test Script Data', selected: false },
      { datakey: 'loe_total', name: 'test_script_TestScriptExecutionLOE', label: 'Test Script Execution LOE', selected: false },
      { datakey: 'test_script_attachmentlinks', name: 'test_script_attachmentlinks', label: 'Test Script Attachment/links', selected: false },
      { datakey: 'notes', name: 'test_script_precondition', label: 'Test Script Precondition', selected: false },
      { datakey: 'updated', name: 'test_script_lastModifiedDate', label: 'Test Script Last Modified Date', selected: false },
    ]

    this.testscript_step_cols = [
      { datakey: 'stepIndex', name: 'test_script_step_number', label: 'Test Script Step Number', selected: false },
      { datakey: 'type', name: 'test_script_step_type', label: 'Test Script Step Type', selected: false },
      { datakey: 'description', name: 'test_script_step_description', label: 'Test Script Step Description', selected: false },
      { datakey: 'expectedResult', name: 'test_script_step_expected_result', label: 'Test Script Step Expected Result', selected: false },
    ]

    this.executionresult_cols = [
      { datakey: 'execution_result_id', name: 'header_block_execution_result_id', label: 'Execution ID', selected: false },
      { datakey: 'state', name: 'header_block_execution_result', label: 'Execution  Result', selected: false },
      { datakey: 'notes', name: 'notes_text', label: 'Notes', selected: false },
    ]

    this.executionresult_step_cols = [
      { datakey: 'tester', name: 'tester', label: 'Tester', selected: false },
      { datakey: 'stepIndex', name: 'step_number', label: 'Test Script Step Number', selected: false },
      { datakey: 'description', name: 'description', label: 'Test Script Step Description', selected: false },
      { datakey: 'step_type', name: 'step_type', label: 'Test Script Step Type', selected: false },
      { datakey: 'result', name: 'step_state', label: 'Test Script Step Execution Result', selected: false },
      { datakey: 'expectedResult', name: 'expected_result', label: 'Test Script Step Expected Result', selected: false },
      { datakey: 'actualResult', name: 'actual_result', label: 'Test Script Step Actual Result', selected: false }
    ]
  }

  toggleSelectAllTestplans(ischecked: boolean) {
    for (var i = 0; i < this.testplan_cols.length; i++) {
      this.testplan_cols[i].selected = ischecked;
    }
  }

  toggleSelectAllTestcases(ischecked: boolean) {
    for (var i = 0; i < this.testcase_cols.length; i++) {
      this.testcase_cols[i].selected = ischecked;
    }
  }

  toggleSelectAllTestscripts(ischecked: boolean) {
    let count = 0;
    for (var i = 0; i < this.testscript_cols.length; i++) {
      this.testscript_cols[i].selected = ischecked;
    }
    for (var j = 0; j < this.testscript_step_cols.length; j++) {
      this.testscript_step_cols[j].selected = ischecked;

      if (this.testscript_step_cols[j].selected) {
        this.stepCheck = true;
      }
      else {
        count++;
        if (count == this.testscript_step_cols.length) {
          this.stepCheck = false;
        }
      }
    }
  }

  toggleSelectAllExecutionresults(ischecked: boolean) {
    let count = 0;
    for (var i = 0; i < this.executionresult_cols.length; i++) {
      this.executionresult_cols[i].selected = ischecked;
      if (this.executionresult_cols[i].selected) {
        this.executionCheck = true;
      }
      else {
        count++;
        if (count == this.executionresult_cols.length) {
          this.executionCheck = false;
        }
      }
    }
    for (var j = 0; j < this.executionresult_step_cols.length; j++) {
      this.executionresult_step_cols[j].selected = ischecked;
      if (this.executionresult_step_cols[j].selected) {
        this.executionCheck = true;
      }
      else {
        count++;
        if (count == this.executionresult_step_cols.length) {
          this.executionCheck = false;
        }
      }
    }
  }

  disableStep(ischecked: boolean) {
    let count = 0;
    for (var j = 0; j < this.testscript_step_cols.length; j++) {

      if (this.testscript_step_cols[j].selected) {
        this.stepCheck = true;
      }
      else {
        count++;
        if (count == this.testscript_step_cols.length) {
          this.stepCheck = false;
        }
      }
    }
  }

  disableExe(ischecked: boolean) {
    let count = 0;
    for (var i = 0; i < this.executionresult_cols.length; i++) {

      if (this.executionresult_cols[i].selected) {
        this.executionCheck = true;
      }
      else {
        count++;
        if (count == this.executionresult_cols.length) {
          this.executionCheck = false;
        }
      }
    }
  }
  
  disableExeStep(ischecked: boolean) {
    let count = 0;
    for (var j = 0; j < this.executionresult_step_cols.length; j++) {

      if (this.executionresult_step_cols[j].selected) {
        this.executionCheck = true;
      }
      else {
        count++;
        if (count == this.executionresult_step_cols.length) {
          this.executionCheck = false;
        }
      }
    }
  }
  ngOnInit() {
  }
}
