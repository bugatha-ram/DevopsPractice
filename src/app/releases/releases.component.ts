import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Category } from '../categories/category';
import { CategoryService } from '../categories/categories.service';
import { SelectItem } from 'primeng/primeng';

@Component({
  selector: 'releases',
  templateUrl: './releases.component.html',
  providers: [CategoryService]
})

export class ReleaseComponent implements OnInit {
  title = 'Releases';
  releases: SelectItem[];
  release: Category;

  constructor(private categoryService: CategoryService) {
    this.releases = [];
    this.releases.push({label:'Unassigned', value: 'unassigned'});
  }

  getReleases(): void {
    this.categoryService.getCategories().then(categories => {
      categories.forEach(category => {
        if (category.category_type.title == "Release") {
          this.releases.push({ label: category.title, value: category.title })
        }
      })
    });
  }
  ngOnInit(): void {
    this.getReleases();
  }
}
