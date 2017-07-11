import { ActivatedRoute } from '@angular/router';
import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { DebugElement } from '@angular/core';
import { TestplanService } from './testplans.service';
import { TestplanComponent } from './testplans.component';
import { MultiSelectModule, SelectItem } from 'primeng/primeng';

describe('TestplanService', function() {
  let service: TestplanService;
  let comp: TestplanComponent;
  let fixture: ComponentFixture<TestplanComponent>;
  let de: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule,FormsModule, HttpModule, MultiSelectModule],
      declarations: [TestplanComponent],
      providers: [TestplanService]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestplanComponent);
    comp = fixture.componentInstance;

    spyOn(fixture.debugElement.componentInstance.testplanService, 'getTestPlans').and.returnValue(Promise.resolve([
      { id: 1, test_plan_id: 100, title: 'string' }
    ]));
  });
  
  it('should able to get the testplans', async(() => {
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      fixture.detectChanges();
    
      expect(comp.testplans.length).toBeGreaterThan(0);
    });
    
  }));
});