import { ActivatedRoute } from '@angular/router';
import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpModule } from '@angular/http';
import { TestscriptService } from './testscripts.service';

describe('TestscriptService', function() {
  let service: TestscriptService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpModule],
      providers: [TestscriptService]
    }).compileComponents();
  }));

  beforeEach(inject([TestscriptService], (testscriptService: TestscriptService) => {
    service = testscriptService;
    spyOn(service, 'getTestScripts').and.returnValue(Promise.resolve([
      { id: 1, test_script_id: 'test_script_1', title: 'testscript 1' },
      { id: 2, test_script_id: 'test_script_2', title: 'testscript 2' }
    ]));
  }));

  it('should able to get testscripts', async(() => {
    service.getTestScripts().then(response => {
      expect(response.length).toBe(2);
    });
  }));
});
