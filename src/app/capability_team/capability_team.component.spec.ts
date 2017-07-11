import { CapabilityTeamComponent } from './capability_team.component';
import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { CategoryService } from '../categories/categories.service';
import { Category } from '../categories/category';
import { MultiSelectModule, SelectItem } from 'primeng/primeng';

describe('CapabilityTeamComponent', function() {

  let comp: CapabilityTeamComponent;
  let fixture: ComponentFixture<CapabilityTeamComponent>;
  let el: HTMLSelectElement;
  let de: DebugElement;
  let service: CategoryService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, FormsModule, HttpModule, MultiSelectModule],
      declarations: [CapabilityTeamComponent],
      providers: [CategoryService]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CapabilityTeamComponent);
    comp = fixture.componentInstance;

    spyOn(fixture.debugElement.componentInstance.categoryService, 'getCategories').and.returnValue(Promise.resolve([
      { id: 1, category_id: '1', title: 'Capability Team', category_type: { title: 'Capability Team' } }, { id: 2, category_id: '12', title: 'Capability Team 2', category_type: { title: 'Capability Team' } }
    ]));
  });

  it('should have a defined capability_team component', () => {
    expect(comp).toBeDefined();
  });

  it('should able to getCapabilityTeams()', async(() => {
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      expect(comp.capability_teams.length).toBeGreaterThan(0);
    });
  }));

  it('should able to display all the capability_teams in select html element', async(() => {
    de = fixture.debugElement.query(By.css('p-multiSelect'));
    el = de.nativeElement;
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      expect(el.getElementsByTagName('li').length).toEqual(comp.capability_teams.length);
    });
  }));
});