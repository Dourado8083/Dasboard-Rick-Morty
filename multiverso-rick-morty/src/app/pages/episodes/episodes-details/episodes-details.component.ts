// episodes-details.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../../core/services/api.service';
import { Episode } from '../../../core/interfaces/episodes';

@Component({
  selector: 'app-episodes-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './episodes-details.component.html',
  styleUrl: './episodes-details.component.scss'
})
export class EpisodesDetailsComponent implements OnInit {
  episode: Episode | null = null;
  Loading: boolean = false;
  currentId: number = 1;
  totalEpisodes: number = 51;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private apiService: ApiService
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      const id = params['id'];
      if (id) {
        this.currentId = +id;
        this.getEpisodeDetails(this.currentId);
      }
    });
  }

  getEpisodeDetails(id: number) {
    this.Loading = true;
    this.apiService.getEpisodeById(id).subscribe({
      next: (episode) => {
        this.episode = episode;
        this.Loading = false;
        window.scrollTo({ top: 0, behavior: 'smooth' });
      },
      error: (err) => {
        console.error('Erro ao buscar detalhes:', err);
        this.Loading = false;
      }
    });
  }

  back() {
    this.router.navigate(['/episodes']);
  }

  previousEpisode() {
    if (this.currentId > 1) {
      this.router.navigate(['/episodes', this.currentId - 1]);
    }
  }

  nextEpisode() {
    if (this.currentId < this.totalEpisodes) {
      this.router.navigate(['/episodes', this.currentId + 1]);
    }
  }

  goToEpisode(id: number) {
    if (id >= 1 && id <= this.totalEpisodes) {
      this.router.navigate(['/episodes', id]);
    }
  }
}