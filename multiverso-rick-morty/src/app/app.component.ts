import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { SidebarComponent } from './shared/sidebar/sidebar.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SidebarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'multiverso-rick-morty';


  constructor(private router: Router){

  }

  isLogin(){
    return this.router.url === '/login' ||   this.router.url === '/register' ;
  }
}
