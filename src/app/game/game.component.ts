import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Game } from '../models/game.model';
import { Round } from '../models/Round';
import { PlayerRoundInfo } from '../models/PlayerRoundInfo';
import { MalCalculatorService } from '../service/mal-calculator.service';
import { GameService } from './game.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css'],
})
export class GameComponent implements OnInit {
  gameId: string;
  game: Game;

  currentRound: Round;
  displayedColumns: string[] = ['name', 'seen', 'gameWon', 'dubliee', 'maal'];
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private gameService: GameService,
    private malCalculatorService: MalCalculatorService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((param: Params) => (this.gameId = param['id']));
    this.game = this.gameService.loadGame(this.gameId);
    if (!this.game) {
      this.router.navigate(['new-game']);
    }
    this.createNewRound();
  }

  createNewRound() {
    let round: Round = {
      roundNumber: this.game.rounds.length + 1,
      roundInfo: this.createRoundInfos(),
      totalMaal: 0,
    };
    this.currentRound = round;
  }

  seenChanged(hasSeen: boolean, name: string): void {
    if (!hasSeen) {
      let player = this.currentRound.roundInfo.find((p) => p.name === name);
      if (player) {
        player.maal = undefined;
        player.dubliee = false;
        player.gameWon = false;
      }
    }
  }

  toggleAllSeen() {
    this.currentRound.roundInfo.map((p) => (p.seen = !p.seen));
  }

  gameWonChecked(hasWon: boolean, name: string): void {
    let gameWonPlayer = this.currentRound.roundInfo.find(
      (p) => p.name === name
    );
    if (gameWonPlayer) gameWonPlayer.seen = true;
  }

  dublieeChanged(isDubliee: boolean, name: string): void {
    if (isDubliee) {
      let player = this.currentRound.roundInfo.find((p) => p.name === name);
      if (player) {
        player.seen = true;
      }
    }
  }

  gameCanBeWonByOnePlayerOnly(name: string): boolean {
    let gameWonPlayer = this.currentRound.roundInfo.find(
      (p) => p.gameWon === true
    );
    if (!gameWonPlayer) {
      return false;
    }

    if (gameWonPlayer.name !== name) {
      return true;
    }

    return false;
  }

  createRoundInfos(): Array<PlayerRoundInfo> {
    let playersRound = new Array<PlayerRoundInfo>();
    this.game.players.forEach((p) => {
      let roundInfo: PlayerRoundInfo = {
        name: p.name,
        seen: false,
        dubliee: false,
        gameWon: false,
        calculatedPoint: 0,
      };
      playersRound.push(roundInfo);
    });

    return playersRound;
  }

  checkIfGameIsWon(): boolean {
    const gameWonPlayer = this.currentRound.roundInfo.find(
      (p) => p.gameWon === true
    );
    if (gameWonPlayer) {
      return true;
    }
    return false;
  }

  calculateMaal() {
    this.currentRound = this.malCalculatorService.calculateMaal(
      this.currentRound
    );

    this.game.rounds = [...this.game.rounds, this.currentRound];
    this.gameService.persistGame(this.game);
    this.createNewRound();
    this.openSnackBar();
  }

  openSnackBar() {
    this.snackBar.open('Round Calculated', '', {
      duration: 2000,
    });
  }
}
