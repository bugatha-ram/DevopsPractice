import { Component, OnInit } from '@angular/core';
import { TestcaseService } from './testcases.service';
import { ActivatedRoute } from '@angular/router';
import { Testcase } from './testcase';
import { SelectItem } from 'primeng/primeng';

@Component({
  selector: 'testcases',
  templateUrl: './testcase.component.html',
  providers: [TestcaseService]
})

export class TestcaseComponent implements OnInit {
  testcases: SelectItem[];
  testcase: Testcase;

  constructor(private testcaseService: TestcaseService) {
    this.testcases = [];
  }

  getTestCases(): void {
    this.testcaseService.getTestCases().then(test_cases => {
      test_cases.forEach(test_case => {
        this.testcases.push({ label: test_case.test_case_id + ': ' + test_case.title, value: test_case.id })
      })
    });
  }
  ngOnInit(): void {
    this.getTestCases();
  }
}

