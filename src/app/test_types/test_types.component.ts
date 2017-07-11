import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Category } from '../categories/category';
import { CategoryService } from '../categories/categories.service';
import { SelectItem } from 'primeng/primeng';

@Component({
  selector: 'test-types',
  templateUrl: './test_types.component.html',
  providers: [CategoryService]
})

export class TestTypeComponent implements OnInit {
  title = 'Test Types';
  test_types: SelectItem[];
  test_type: Category;

  constructor(private categoryService: CategoryService) {
    this.test_types = [];
    this.test_types.push({ label: 'Unassigned', value: 'unassigned' });
  }

  getTestTypes(): void {
    this.categoryService.getCategories().then(categories => {
      categories.forEach(category => {
        if (category.category_type.title == "Test Type") {
          this.test_types.push({ label: category.title, value: category.title })
        }
      })
    });
  }
  ngOnInit(): void {
    this.getTestTypes();
  }
}
