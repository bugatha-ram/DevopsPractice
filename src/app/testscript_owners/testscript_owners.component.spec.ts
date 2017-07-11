import { ActivatedRoute } from '@angular/router';
import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { TestscriptService } from '../testscripts/testscripts.service';
import { TestscriptownerComponent } from './testscript_owners.component';
import { MultiSelectModule, SelectItem } from 'primeng/primeng';

describe('TestscriptownerComponent', function() {

  let comp: TestscriptownerComponent;
  let fixture: ComponentFixture<TestscriptownerComponent>;
  let el: HTMLSelectElement;
  let de: DebugElement;
  let service: TestscriptService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, FormsModule, HttpModule, MultiSelectModule],
      declarations: [TestscriptownerComponent],
      providers: [TestscriptService]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestscriptownerComponent);
    comp = fixture.componentInstance;

    spyOn(fixture.debugElement.componentInstance.testscriptService, 'getTestScripts').and.returnValue(Promise.resolve([
      { id: 1, title: 'string', data_json: { content: { testscript: { owner: { _: 'string' } } } } }
    ]));
  });

  beforeEach(inject([TestscriptService], (testscriptService: TestscriptService) => {
    service = testscriptService;
  }));

  it('should have a defined testscript owner component', () => {
    expect(comp).toBeDefined();
  });

  it('should able to getTestScripts()', async(() => {
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      expect(comp.testscript_owners.length).toBeGreaterThan(0);
    });
  }));

  it('should able to display all the  testscript owners in select html element', async(() => {
    de = fixture.debugElement.query(By.css('p-multiSelect'));
    el = de.nativeElement;
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      expect(el.getElementsByTagName('li').length).toEqual(comp.testscript_owners.length);
    });
  }));
});

