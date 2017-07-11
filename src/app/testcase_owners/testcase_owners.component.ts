import { Component, OnInit } from '@angular/core';
import { TestcaseService } from '../testcases/testcases.service';
import { ActivatedRoute } from '@angular/router';
import { Testcase } from '../testcases/testcase';
import { SelectItem } from 'primeng/primeng';

@Component({
  selector: 'testcase-owners',
  templateUrl: './testcase_owners.component.html',
  providers: [TestcaseService]
})
export class TestcaseownerComponent implements OnInit {
  testcase_owners: SelectItem[] = [];
  testcase_owner: string;

  constructor(private testcaseService: TestcaseService) {
    this.testcase_owners.push({ label: 'Unassigned', value: 'unassigned' });
  }

  getTestCaseOwners(): void {
    this.testcaseService.getTestCases().then(testcases => {
      testcases.map(testcase => testcase.owner).forEach((testcase_owner, index, self) => {
        if (self.indexOf(testcase_owner) === index) {
          this.testcase_owners.push({ label: testcase_owner, value: testcase_owner })
        }
      })
    });
  }
  ngOnInit(): void {
    this.getTestCaseOwners();
  }
}
