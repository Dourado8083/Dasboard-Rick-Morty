import { Routes } from '@angular/router';
import { authGuard,  } from './core/guards/auth.guard';
import { loginGuard } from './core/guards/login.guard';

export const routes: Routes = [

  //Rotas com Lazy Load, para serem acionadas fora o login com o click
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    canActivate: [loginGuard],
    loadComponent: () => import('./pages/login/login.component')
      .then(m => m.LoginComponent)
  },
  {
    path: 'register',
    loadComponent: () => import('./pages/create-profile/create-profile.component')
      .then(m => m.CreateProfileComponent)
  },
  {
    path: 'profile',
    canActivate: [authGuard],
    loadComponent: () => import('./pages/my-profile/my-profile.component')
      .then(m => m.MyProfileComponent)
  },
  {
    path: 'characters',
    canActivate: [authGuard],
    loadComponent: () => import('./pages/characters/characters.component')
      .then(m => m.CharactersComponent)
  },
  {
    path: 'locations',
    canActivate: [authGuard],
    loadComponent: () => import('./pages/location/location.component')
      .then(m => m.LocationComponent)
  },
  {
    path: 'episodes',
    canActivate: [authGuard],
    loadComponent: () => import('./pages/episodes/episodes.component')
      .then(m => m.EpisodesComponent)
  },
  {
    path: 'characters/:id',
    canActivate: [authGuard],
    loadComponent: () => import('./pages/characters/characters-details/characters-details.component')
      .then(m => m.CharactersDetailsComponent)
  },
  {
    path: 'locations/:id',
    canActivate: [authGuard],
    loadComponent: () => import('./pages/location/location-details/location-details.component')
      .then(m => m.LocationDetailsComponent)
  },
  {
    path: 'episodes/:id',
    canActivate: [authGuard],
    loadComponent: () => import('./pages/episodes/episodes-details/episodes-details.component')
      .then(m => m.EpisodesDetailsComponent)
  },
  {
    path: '**',
    redirectTo: 'login'
  }
];