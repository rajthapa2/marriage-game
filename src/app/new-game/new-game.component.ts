import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { from, Observable, of } from 'rxjs';
import { GameService } from '../game/game.service';
import { Player } from '../models/player.model';
import { PlayerService } from '../service/player.service';

@Component({
  selector: 'app-new-game',
  templateUrl: './new-game.component.html',
  styleUrls: ['./new-game.component.css'],
})
export class NewGameComponent implements OnInit {
  players$: Observable<Player[]>;
  selectedPlayers: any = [];
  public addPlayerRef: (name: string) => void;

  constructor(
    private playerService: PlayerService,
    private gameService: GameService,
    private router: Router
  ) {
    this.addPlayerRef = this.addPlayer.bind(this);
  }

  ngOnInit(): void {
    this.players$ = this.playerService.loadPlayers$;
  }

  addPlayer(name: string) {
    name = name.toUpperCase();
    this.playerService.addPlayer(name);
    return { name: name, tag: true };
  }

  startGame() {
    const id = this.gameService.createNewGame(this.selectedPlayers);
    this.router.navigate(['game', id.toString()]);
  }
}
