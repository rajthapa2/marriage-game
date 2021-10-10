import { Injectable } from '@angular/core';
import { Player } from '../models/player.model';
import { Guid } from 'guid-typescript';
import { Game } from '../models/game.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  constructor(private router: Router) {}

  games: Array<Game> = [];

  createNewGame(players: Player[]): Guid {
    const id = Guid.create();
    let game: Game = {
      id: id.toString(),
      players: players,
      rounds: [],
    };
    this.persistGame(game);
    this.addToAllGames(id);
    return id;
  }

  loadGame(gameId: string): any {
    let cachedGame = this.games?.find((g) => g.id === gameId);
    if (cachedGame) {
      return cachedGame;
    }

    let gameString = localStorage.getItem(gameId);
    if (gameString) {
      const game = JSON.parse(gameString);
      this.games.push(game);
      return game;
    }

    this.router.navigate(['new-game']);
    // return null;
  }

  loadGames(): Array<Guid> {
    let games = localStorage.getItem('games');
    if (games) {
      return JSON.parse(games) as Array<Guid>;
    }
    return new Array<Guid>();
  }

  persistGame(game: Game) {
    localStorage.setItem(game.id, JSON.stringify(game));
  }

  private addToAllGames(id: Guid) {
    let allGames = this.loadGames();
    allGames.push(id);
    localStorage.setItem('games', JSON.stringify(allGames));
  }
}
