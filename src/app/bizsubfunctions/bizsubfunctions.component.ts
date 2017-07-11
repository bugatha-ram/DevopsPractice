import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Category } from '../categories/category';
import { CategoryService } from '../categories/categories.service';
import { SelectItem } from 'primeng/primeng';

@Component({
  selector: 'bizsubfunctions',
  templateUrl: './bizsubfunctions.component.html',
  providers: [CategoryService]
})
export class BizsubfunctionComponent implements OnInit {
  title = 'Business Subfunction';
  bizsubfunctions: SelectItem[];
  bizsubfunction: Category;

  constructor(private categoryService: CategoryService) {
    this.bizsubfunctions = [];
    this.bizsubfunctions.push({ label: 'Unassigned', value: 'unassigned' });
  }

  getBizSubFunctions(): void {
    this.categoryService.getCategories().then(categories => {
      categories.forEach(category => {
        if (category.category_type.title == "Business Subfunction") {
          this.bizsubfunctions.push({ label: category.title, value: category.title })
        }
      })
    });
  }
  ngOnInit(): void {
    this.getBizSubFunctions();
  }
}
