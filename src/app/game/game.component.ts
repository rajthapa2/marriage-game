import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Game } from '../models/game.model';
import { GameService } from './game.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css'],
})
export class GameComponent implements OnInit {
  gameId: any;
  game: Game;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private gameService: GameService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((param: Params) => (this.gameId = param['id']));
    this.game = this.gameService.loadGame(this.gameId);
    if (!this.game) {
      this.router.navigate(['new-game']);
    }
  }
}
