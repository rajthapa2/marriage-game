import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Game } from '../../models/game.model';
import { Round } from '../../models/Round';
import { PlayerRoundInfo } from '../../models/PlayerRoundInfo';
import { MalCalculatorService } from '../../service/mal-calculator.service';
import { GameService } from './../game.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-maal-entry',
  templateUrl: './maal-entry.component.html',
  styleUrls: ['./maal-entry.component.css'],
})
export class MaalEntryComponent implements OnInit {
  gameId: string;

  @Input() currentGame: Game;

  currentRound: Round;
  displayedColumns: string[] = ['name', 'seen', 'gameWon', 'dubliee', 'maal'];
  constructor(
    private gameService: GameService,
    private malCalculatorService: MalCalculatorService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
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
    let anySeen = this.currentRound.roundInfo.find((p) => p.seen);
    this.currentRound.roundInfo.forEach((p) => (p.seen = !anySeen));
  }

  gameWonChecked(hasGameWon: boolean, name: string): void {
    if (hasGameWon) {
      let gameWonPlayer = this.currentRound.roundInfo.find(
        (p) => p.name === name
      );
      if (gameWonPlayer) gameWonPlayer.seen = true;
    }
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
    this.currentGame.players.forEach((p) => {
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

    this.currentGame.rounds = [...this.currentGame.rounds, this.currentRound];
    this.gameService.persistGame(this.currentGame);
    this.createNewRound();
    this.openSnackBar();
  }

  openSnackBar() {
    this.snackBar.open('Round Calculated', '', {
      duration: 2000,
    });
  }
}
