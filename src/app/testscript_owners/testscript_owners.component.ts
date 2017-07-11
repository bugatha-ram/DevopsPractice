import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Testscript } from '../testscripts/testscript';
import { TestscriptService } from '../testscripts/testscripts.service';
import { SelectItem } from 'primeng/primeng';


@Component({
  selector: 'testscript-owners',
  templateUrl: './testscript_owners.component.html',
  providers: [TestscriptService]
})
export class TestscriptownerComponent implements OnInit {
  testscript_owners: SelectItem[] = [];
  testscript_owner: string;

  constructor(private testscriptService: TestscriptService) {
    this.testscript_owners.push({ label: 'Unassigned', value: 'unassigned' });
  }

  getTestScripts(): void {
    this.testscriptService.getTestScripts().then(testscripts => {
      testscripts.map(testscript => testscript.owner).forEach((testscript_owner, index, self) => {
        if (self.indexOf(testscript_owner) === index) {
          this.testscript_owners.push({ label: testscript_owner, value: testscript_owner })
        }
      })
    });
  }
  ngOnInit(): void {
    this.getTestScripts();
  }
}
