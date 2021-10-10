import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Params } from '@angular/router';
import { MaalEntryDialogComponent } from 'src/app/dialog/maal-entry-dialog/maal-entry-dialog.component';
import { Game } from 'src/app/models/game.model';
import { PlayerRoundInfo } from 'src/app/models/PlayerRoundInfo';
import { Round } from 'src/app/models/Round';
import { NewGameComponent } from 'src/app/new-game/new-game.component';
import { GameComponent } from '../game.component';
import { GameService } from '../game.service';
import { MaalEntryComponent } from '../maal-entry/maal-entry.component';

@Component({
  selector: 'app-game-result',
  templateUrl: './game-result.component.html',
  styleUrls: ['./game-result.component.css'],
})
export class GameResultComponent implements OnInit {
  currentGame: Game;
  gameId: string;

  displayedColumns: string[];
  constructor(
    private gameService: GameService,
    private route: ActivatedRoute,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((param: Params) => {
      this.gameId = param['id'];
    });

    this.currentGame = this.gameService.loadGame(this.gameId);

    let m: string[] = ['round'];
    m.push(...this.currentGame.players.map((x) => x.name));
    m.push(...['totalMaal', 'edit']);

    this.displayedColumns = m;
  }

  displayPoint(roundInfo: Array<PlayerRoundInfo>, playerName: string): any {
    return roundInfo.find((x) => x.name === playerName)?.calculatedPoint;
  }

  displayMaal(roundInfo: Array<PlayerRoundInfo>, playerName: string): any {
    let playerRoundInfo = roundInfo.find((x) => x.name === playerName);

    if (playerRoundInfo?.seen && playerRoundInfo.maal) {
      return ` (${playerRoundInfo.maal})`;
    }
    return '';
  }

  applyWinningCss(
    roundInfo: Array<PlayerRoundInfo>,
    playerName: string
  ): string {
    let player = roundInfo.find((p) => p.name === playerName);

    if (player?.gameWon) {
      return 'game-won';
    } else if (!player?.seen) {
      return 'unseen';
    }
    return 'seen';
  }

  getTotal(playerName: string): number {
    let total = 0;
    this.currentGame.rounds.forEach((round) => {
      round.roundInfo.forEach((p) => {
        if (p.name === playerName) {
          total += p.calculatedPoint;
        }
      });
    });
    return total;
  }

  editLastRound(round: Round) {
    console.log(round);
    this.openEditRoundDialog(round);
  }

  openEditRoundDialog(round: Round): void {
    const dialogRef = this.dialog.open(MaalEntryDialogComponent, {
      maxWidth: '100vw',
      maxHeight: '70vh',
      width: '750px',
      height: 'auto',
      data: {
        gameId: this.gameId,
        currentRound: round,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
    });
  }
}
