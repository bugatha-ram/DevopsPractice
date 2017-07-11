import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SelectItem } from 'primeng/primeng';

@Component({
  selector: 'executionresults',
  templateUrl: './executionresult.component.html'

})
export class ExecutionresultComponent implements OnInit {
  executionresults: SelectItem[];
  executionresult: any;

  constructor() {
    this.executionresults = [];
    this.executionresults.push({ label: 'Passed', value: 'Passed' });
    this.executionresults.push({ label: 'Failed', value: 'Failed' });
    this.executionresults.push({ label: 'Not Run', value: 'Not Run' });
    this.executionresults.push({ label: 'Blocked', value: 'Blocked' });
  }
  getExecutionResults(): void {

  }
  ngOnInit(): void {
    this.getExecutionResults();
  }
}