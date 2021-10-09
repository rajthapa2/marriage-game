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
    this.persistGame(game);
    this.addToAllGames(id);
    return id;
  }

  loadGame(gameId: string): any {
    let game = localStorage.getItem(gameId);
    if (game) {
      return JSON.parse(game) as Game;
    }
    return null;
  }

  loadGames(): Array<Guid> {
    var games = localStorage.getItem('games');
    if (games) {
      return JSON.parse(games) as Array<Guid>;
    }
    return new Array<Guid>();
  }

  persistGame(game: Game) {
    // let allGames = this.loadGames();
    // let indexOfGameToUpdate = allGames.findIndex((p) => p.id == game.id);

    // allGames[indexOfGameToUpdate] = game;
    // this.storeGame(allGames);
    localStorage.setItem(game.id, JSON.stringify(game));
  }

  addToAllGames(id: Guid) {
    let allGames = this.loadGames();
    allGames.push(id);
    localStorage.setItem('games', JSON.stringify(allGames));
  }
  // private storeGame(games: Game[]) {
  //   localStorage.setItem('games', JSON.stringify(games));
  // }
}
