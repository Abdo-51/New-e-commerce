import { Component, inject } from '@angular/core';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { CategoriesService } from '../../services/categories.service';
import { Category } from '../../interfaces/product';

@Component({
  selector: 'app-category-slider',
  standalone: true,
  imports: [CarouselModule],
  templateUrl: './category-slider.component.html',
  styleUrl: './category-slider.component.scss'
})
export class CategorySliderComponent {
  categories : Category [] = [];
  private _category = inject(CategoriesService)
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    autoplay:true,
    autoplayTimeout:3000,
    margin:10,
    navSpeed: 700,
    navText: ['prev', 'next'],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 1
      },
      740: {
        items: 1
      },
      940: {
        items: 8
      }
    },
    nav: false
  }

  ngOnInit(){
    this.getCategories();
  }

  getCategories = ()=>{
    this._category.getCategories().subscribe({
      next: (res)=>{
        this.categories = res.data;
        console.log(res);
        
      },
      error: (err)=>{
        console.log(err);
        
      }
    })
  }
}
