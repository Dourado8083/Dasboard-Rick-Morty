import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../core/services/api.service';
import { Locations } from '../../core/interfaces/location';
import { Router } from '@angular/router';

@Component({
  selector: 'app-location',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './location.component.html',
  styleUrl: './location.component.scss'
})
export class LocationComponent implements OnInit {
  locations: Locations[] = [];
  pageActive: number = 1;
  totalofPage: number = 0;
  Loading: boolean = false;

  constructor(
    private apiService: ApiService,
    private router: Router
  ) { }

  ngOnInit() {
    this.getLocations(this.pageActive);
  }

  getLocations(page: number): void {
    this.Loading = true;

    this.apiService.getLocation(page).subscribe({
      next: (response) => {
        this.locations = response.results;
        this.totalofPage = response.info.pages;
        this.pageActive = page;
        this.Loading = false;
      },
      error: (err) => {
        this.Loading = false;
      }
    });
  }

 validePage(page: number): void {
    if (
      page >= 1 &&
      page <= this.totalofPage &&
      page !== this.pageActive
    ) {
      this.getLocations(page);
      this.scrollToTop();
    }
  }

  nextPage(): void {
    this.validePage(this.pageActive + 1);
  }

  previousPage(): void {
    this.validePage(this.pageActive - 1);
  }

  getPageNumbers(): number[] {
    const pages: number[] = [];
    const maxVisible = 5;
    const halfVisible = Math.floor(maxVisible / 2);

    let startPage = this.pageActive - halfVisible;

    if (startPage < 1) {
      startPage = 1;
    }

    let endPage = startPage + maxVisible - 1;

    if (endPage > this.totalofPage) {
      endPage = this.totalofPage;
      startPage = Math.max(1, endPage - maxVisible + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    return pages;
  }

  scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  locationDetails(location: Locations): void {
    this.router.navigate(['/locations', location.id]);
  }
}