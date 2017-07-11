import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Category } from '../categories/category';
import { CategoryService } from '../categories/categories.service';
import { SelectItem } from 'primeng/primeng';

@Component({
  selector: 'bizfunctions',
  templateUrl: './bizfunctions.component.html',
  providers: [CategoryService]
})

export class BizfunctionComponent implements OnInit {
  bizfunctions: SelectItem[];
  bizfunction: Category;

  constructor(private categoryService: CategoryService) {
    this.bizfunctions = [];
    this.bizfunctions.push({ label: 'Unassigned', value: 'unassigned' });
  }

  getBizFunctions(): void {
    this.categoryService.getCategories().then(categories => {
      categories.forEach(category => {
        if (category.category_type.title == "Business Function") {
          this.bizfunctions.push({ label: category.title, value: category.title });
        }
      })
    });
  }
  ngOnInit(): void {
    this.getBizFunctions();
  }
}
