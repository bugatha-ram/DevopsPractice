import { ActivatedRoute } from '@angular/router';
import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpModule } from '@angular/http';
import { TestcaseService } from './testcases.service';

describe('TestcaseService', function() {
  let service: TestcaseService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpModule],
      providers: [TestcaseService]
    }).compileComponents();
  }));

  beforeEach(inject([TestcaseService], (testcaseSerivce: TestcaseService) => {
    service = testcaseSerivce;
    spyOn(service, 'getTestCases').and.returnValue(Promise.resolve([
      { id: 1, test_case_id: 'test_case_1', title: 'testcase 1' },
      { id: 2, test_case_id: 'test_case_2', title: 'testcase 2' }
    ]));
  }));

  it('should able to get testcases', async(() => {
    service.getTestCases().then(response => {
      expect(response.length).toBe(2);
    });
  }));
});
