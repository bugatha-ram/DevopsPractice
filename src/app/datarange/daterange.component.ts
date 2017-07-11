import { Component, OnInit } from '@angular/core';
import { Daterange } from './daterange';
import { DaterangeService } from './daterange.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'my-daterange',
  templateUrl: './daterange.component.html'
  
})
export class DaterangeComponent  {
  title = 'Dateranges';
  dateranges: Daterange[];
  
  constructor(private daterangeService: DaterangeService) { }
  getDateRanges(): void {
    this.daterangeService.getDateRanges().then(dateranges => this.dateranges = dateranges);
  }
  ngOnInit(): void {
    this.getDateRanges();
  }
}
