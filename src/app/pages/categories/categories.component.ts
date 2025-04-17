import { Component, inject, OnInit } from '@angular/core';
import { CategoriesService } from '../../core/services/Categories/categories.service';
import { ICategories } from '../../shared/interfaces/icategories';

@Component({
  selector: 'app-categories',
  imports: [],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss',
})
export class CategoriesComponent implements OnInit {
  private readonly categotiesService = inject(CategoriesService);
  ngOnInit(): void {
    this.getCategoriesData();
  }
  categoriesData: ICategories[] = [];
  categoriesName: ICategories[] = [];
  getCategoriesData(): void {
    this.categotiesService.getAllCategories().subscribe({
      next: (res) => {
        this.categoriesData = res.data;
        console.log(this.categoriesData);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  getCategories(id: string): void {
    this.categotiesService.getspecificCategories(id).subscribe({
      next: (res) => {
        this.categoriesName = res.data;
        console.log(this.categoriesName);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
