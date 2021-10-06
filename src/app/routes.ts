import { Routes } from '@angular/router';
import { GameComponent } from './game/game.component';
import { HistoryComponent } from './history/history.component';
import { NewGameComponent } from './new-game/new-game.component';

export const routes: Routes = [
  { path: 'new-game', component: NewGameComponent },
  { path: 'history', component: HistoryComponent },
  { path: 'game/:id', component: GameComponent },
  { path: '', redirectTo: 'new-game', pathMatch: 'full' },
];
