import { Injectable, OnInit } from '@angular/core';
import { from, Observable, of } from 'rxjs';
import { Player } from '../models/player.model';
import { map, tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class PlayerService {
  constructor() {}

  loadPlayers$: Observable<Player[]> = this.loadPlayersFromStorage();

  addPlayer(name: string): void {
    const newPlayer: Player = {
      name: name,
    };

    let allPlayers = [];

    this.loadPlayersFromStorage().subscribe((d) => (allPlayers = d));

    allPlayers.push(newPlayer);
    localStorage.setItem('players', JSON.stringify(allPlayers));
  }

  private loadPlayersFromStorage(): Observable<Player[]> {
    const playersJson = localStorage.getItem('players');
    const players =
      playersJson != null
        ? (JSON.parse(playersJson) as Array<Player>)
        : Array<Player>();
    return of(players);
  }
}
