import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { User } from '../../core/interfaces/user';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
  name:string | null = null;
  menu:boolean = true;

constructor(private authService: AuthService){
this.getName();
}

  logout() {
    if (confirm('Tem certeza que deseja sair?')) {
      this.authService.logout();
    }
  }
getName(){
 this.name =  this.authService.getCurrentUser()?.name ?? null;

}
}

