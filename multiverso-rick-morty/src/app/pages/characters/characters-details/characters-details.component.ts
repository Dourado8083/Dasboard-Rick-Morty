import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../../core/services/api.service';
import { Character } from '../../../core/interfaces/characters';


@Component({
  selector: 'app-characters-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './characters-details.component.html',
  styleUrl: './characters-details.component.scss'
})
export class CharactersDetailsComponent implements OnInit {
  character: Character | null = null;
  Loading: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private apiService: ApiService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.getCharacterDetails(+id);
    }
  }

  getCharacterDetails(id: number) {
    this.Loading = true;
    this.apiService.getCharacterById(id).subscribe({
      next: (character) => {
        this.character = character;
        this.Loading = false;
      },
      error: (err) => {
        console.error('Erro ao buscar detalhes:', err);
        this.Loading = false;
      }
    });
  }

  goBack() {
    this.router.navigate(['/characters']);
  }
}