import { ActivatedRoute } from '@angular/router';
import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpModule } from '@angular/http';
import { AdhocService } from '../adhoc/adhoc.service';


describe('AdhocService', function() {
  let service: AdhocService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpModule],
      providers: [AdhocService]
    }).compileComponents();
  }));

  beforeEach(inject([AdhocService], (adhocService: AdhocService) => {
    service = adhocService;
    spyOn(service, 'getReport').and.returnValue(Promise.resolve([
      {id:1,test_plan_id:'test_plan_id_1',title:'test plan 1'},
      {id:2,test_plan_id:'test_plan_id_2',title:'test plan 2'}
    ]));
  }));

  it('should able to get the response for adhoc report', async(() => {
    service.getReport({test_plans:"1,2"}).then(function(response: any)  {
      expect(response.length).toBe(2);
    });
  }));
});
