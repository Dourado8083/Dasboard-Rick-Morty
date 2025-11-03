// location-details.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../../core/services/api.service';
import { Locations } from '../../../core/interfaces/location';
@Component({
  selector: 'app-location-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './location-details.component.html',
  styleUrl: './location-details.component.scss'
})
export class LocationDetailsComponent implements OnInit {
  location: Locations | null = null;
  Loading: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private apiService: ApiService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.getLocationDetails(+id);
    }
  }

  getLocationDetails(id: number) {
    this.Loading = true;
    this.apiService.getLocationById(id).subscribe({
      next: (location) => {
        this.location = location;
        this.Loading = false;
      },
      error: (err) => {
        console.error('Erro ao buscar detalhes:', err);
        this.Loading = false;
      }
    });
  }

  goBack() {
    this.router.navigate(['/locations']);
  }
}