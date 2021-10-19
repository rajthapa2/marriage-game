import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Game } from '../../models/game.model';
import { Round } from '../../models/Round';
import { MalCalculatorService } from '../../service/mal-calculator.service';
import { GameService } from './../game.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-maal-entry',
  templateUrl: './maal-entry.component.html',
  styleUrls: ['./maal-entry.component.css'],
})
export class MaalEntryComponent implements OnInit {
  gameId: string;
  @Input() currentGame: Game;
  @Output() maalCalculated = new EventEmitter<Round>();

  @Input() currentRound: Round;

  displayedColumns: string[] = [
    'name',
    'seen',
    'gameWon',
    'dubliee',
    'maal',
    'pandraPointFine',
  ];
  constructor(
    private gameService: GameService,
    private malCalculatorService: MalCalculatorService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {}

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
    this.currentRound.roundInfo.forEach((p) => {
      p.seen = !anySeen;
      this.seenChanged(p.seen, p.name);
    });
  }

  gameWonChecked(hasGameWon: boolean, name: string): void {
    if (hasGameWon) {
      let gameWonPlayer = this.currentRound.roundInfo.find(
        (p) => p.name === name
      );
      if (gameWonPlayer) {
        gameWonPlayer.seen = true;
        gameWonPlayer.pandraPointFine = false;
      }
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

    let round = this.currentGame.rounds.find(
      (r) => r.roundNumber === this.currentRound.roundNumber
    );

    if (round) {
      round = this.currentRound;
      this.currentGame.rounds = [...this.currentGame.rounds];
    } else {
      this.currentGame.rounds = [...this.currentGame.rounds, this.currentRound];
    }

    this.gameService.persistGame(this.currentGame);
    this.openSnackBar();
    this.maalCalculated.next(this.currentRound);
  }

  openSnackBar() {
    this.snackBar.open('Round Calculated', '', {
      duration: 2000,
    });
  }
}
