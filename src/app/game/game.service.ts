import { Injectable } from '@angular/core';
import { Player } from '../models/player.model';
import { Guid } from 'guid-typescript';
import { Game } from '../models/game.model';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  constructor() {}

  createNewGame(players: Player[]): Guid {
    const id = Guid.create();
    let game: Game = {
      id: id.toString(),
      players: players,
      rounds: [],
    };
    let games = this.loadGames();
    games.push(game);
    localStorage.setItem('games', JSON.stringify(games));
    return id;
  }

  loadGame(gameId: string): any {
    let games = this.loadGames();
    let game = games.find((x) => x.id === gameId);
    return game;
  }

  loadGames(): Array<Game> {
    var games = localStorage.getItem('games');
    if (games) {
      return JSON.parse(games) as Array<Game>;
    }
    return new Array<Game>();
  }
}
