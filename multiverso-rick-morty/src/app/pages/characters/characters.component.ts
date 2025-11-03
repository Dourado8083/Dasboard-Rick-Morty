import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../core/services/api.service';
import { Character } from '../../core/interfaces/characters';
import { Router } from '@angular/router';

@Component({
  selector: 'app-characters',
  standalone: true,
  imports: [CommonModule], 
  templateUrl: './characters.component.html',
  styleUrl: './characters.component.scss'
})
export class CharactersComponent implements OnInit {
  characters: Character[] = [];
  pageActive: number = 1;
  totalofPage: number = 0;
  Loading: boolean = false;

  //Array de conversão de valores- tradução 
  gender: any = {
    Male: 'Masculino',
    Female: 'Feminino',
    Genderless: 'Sem gênero',
    unknown: 'Desconhecido'
  }

  lifeStatus:any = {
  Alive: 'Vivo',
  Dead: 'Morto',
  unknown:'Desconhecido'
  }

  constructor(private apiService: ApiService, private router:Router) {}




  ngOnInit(): void {
    this.getCharacters(this.pageActive);
  }

  getCharacters(page: number) {
    this.Loading = true;
    this.apiService.getCharacters(page).subscribe({
      next: (response) => {
        this.characters = response.results;
        this.totalofPage = response.info.pages;
        this.pageActive = page;
        this.Loading = false;
      },
      error: () => {
        this.Loading = false;
      },
    
    });
  }

  nextPage() {
    if (this.pageActive < this.totalofPage) {
      this.getCharacters(this.pageActive + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  previousPage() {
    if (this.pageActive > 1) {
      this.getCharacters(this.pageActive - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  goToPage(page: number) {
    if (page >= 1 && page <= this.totalofPage) {
      this.getCharacters(page);
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

    charactersDetails(character: Character) {
    this.router.navigate(['/characters', character.id]);
  }
}