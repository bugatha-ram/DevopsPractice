import { Component, OnInit } from '@angular/core';
import { Testplan } from './testplan';
import { TestplanService } from './testplans.service';
import { ActivatedRoute } from '@angular/router';
import { SelectItem } from 'primeng/primeng';

@Component({
  selector: 'testplans',
  templateUrl: './testplans.component.html',
  providers: [TestplanService]
})
export class TestplanComponent implements OnInit {
  title = 'Testplans';
  testplans: SelectItem[];
  testplan: any;

  constructor(private testplanService: TestplanService) {
    this.testplans = [];
  }
  getTestPlans(): void {
    this.testplanService.getTestPlans().then(test_plans => {
      test_plans.forEach(test_plan => {
        this.testplans.push({ label: test_plan.test_plan_id + ': ' + test_plan.title, value: test_plan.id })
      })
    });
  }
  ngOnInit(): void {
    this.getTestPlans();
  }
}
