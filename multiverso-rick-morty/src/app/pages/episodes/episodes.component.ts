import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ApiService } from '../../core/services/api.service';
import { Episode } from '../../core/interfaces/episodes';

@Component({
  selector: 'app-episodes',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './episodes.component.html',
  styleUrl: './episodes.component.scss'
})


export class EpisodesComponent implements OnInit {
  episodes: Episode[] = [];
  pageActive: number = 1;
  totalofPage: number = 0;
  Loading: boolean = false;

  constructor(
    private apiService: ApiService,
    private router: Router
  ) {}

  ngOnInit() {
    this.getEpisodes(this.pageActive);
  }

  getEpisodes(page: number) {
    this.Loading = true;
    this.apiService.getEpisodes(page).subscribe({
      next: (response) => {
        this.episodes = response.results;
        this.totalofPage = response.info.pages;
        this.pageActive = page;
        this.Loading = false;
      },
      error: (err) => {
        console.error('Erro ao buscar episódios:', err);
        this.Loading = false;
      },
      complete: () => {
        console.log('Busca de episódios completa.');
      }
    });
  }

  episodesDetails(episode: Episode) {
    this.router.navigate(['/episodes', episode.id]);
  }

  nextPage() {
    if (this.pageActive < this.totalofPage) {
      this.getEpisodes(this.pageActive + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  previousPage() {
    if (this.pageActive > 1) {
      this.getEpisodes(this.pageActive - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  goToPage(page: number) {
    if (page >= 1 && page <= this.totalofPage) {
      this.getEpisodes(page);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  getPageNumbers(): number[] {
    const pages: number[] = [];
    const maxVisible = 5;
    
    let startPage = Math.max(1, this.pageActive - Math.floor(maxVisible / 2));
    let endPage = Math.min(this.totalofPage, startPage + maxVisible - 1);
    
    if (endPage - startPage < maxVisible - 1) {
      startPage = Math.max(1, endPage - maxVisible + 1);
    }
    
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    
    return pages;
  }
}