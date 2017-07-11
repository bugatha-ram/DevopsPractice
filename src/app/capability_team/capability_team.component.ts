import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Category } from '../categories/category';
import { CategoryService } from '../categories/categories.service';
import { SelectItem } from 'primeng/primeng';

@Component({
  selector: 'capability-team',
  templateUrl: './capability_team.component.html',
  providers: [CategoryService]
})

export class CapabilityTeamComponent implements OnInit {
  title = 'Capability Team';
  capability_teams: SelectItem[];
  capability_team: Category;

  constructor(private categoryService: CategoryService) {
    this.capability_teams = [];
    this.capability_teams.push({ label: 'Unassigned', value: 'unassigned' });
  }

  getCapabilityTeams(): void {
    this.categoryService.getCategories().then(categories => {
      categories.forEach(category => {
        if (category.category_type.title == "Capability Team") {
          this.capability_teams.push({ label: category.title, value: category.title });
        }
      })
    });
  }
  ngOnInit(): void {
    this.getCapabilityTeams();
  }
}

