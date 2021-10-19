import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Game } from '../models/game.model';
import { PlayerRoundInfo } from '../models/PlayerRoundInfo';
import { Round } from '../models/Round';
import { GameService } from './game.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css'],
})
export class GameComponent implements OnInit {
  gameId: any;
  currentGame: Game;
  currentRound: Round;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private gameService: GameService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((param: Params) => (this.gameId = param['id']));
    this.currentGame = this.gameService.loadGame(this.gameId);
    if (!this.currentGame) {
      this.router.navigate(['new-game']);
    }
    this.createNewRound();
  }

  createNewRound() {
    let round: Round = {
      roundNumber: this.currentGame.rounds.length + 1,
      roundInfo: this.createRoundInfos(),
      totalMaal: 0,
    };
    this.currentRound = round;
  }

  createRoundInfos(): Array<PlayerRoundInfo> {
    let playersRound = new Array<PlayerRoundInfo>();
    this.currentGame.players.forEach((p) => {
      let roundInfo: PlayerRoundInfo = {
        name: p.name,
        seen: false,
        dubliee: false,
        gameWon: false,
        calculatedPoint: 0,
        pandraPointFine: false,
      };
      playersRound.push(roundInfo);
    });

    return playersRound;
  }

  maalCalculated(round: Round) {
    this.createNewRound();
  }
}
