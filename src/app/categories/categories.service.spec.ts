import { ActivatedRoute } from '@angular/router';
import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpModule } from '@angular/http';
import { CategoryService } from '../categories/categories.service';
import { Category } from '../categories/category';

describe('CategoryService', function() {
  let service: CategoryService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpModule],
      providers: [CategoryService]
    }).compileComponents();
  }));

  beforeEach(inject([CategoryService], (categorySerivce: CategoryService) => {
    service = categorySerivce;
    spyOn(service, 'getCategories').and.returnValue(Promise.resolve([
      {id:1,title:"Function 1",category_id:"category_id_1"},
      {id:2,title:"Function 2",category_id:"category_id_2"}
    ]));
  }));

  it('should able to get categories', async(() => {
    service.getCategories().then(response => {
      expect(response.length).toBe(2);
    });
  }));
});
