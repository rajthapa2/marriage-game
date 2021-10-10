import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Params } from '@angular/router';
import { Game } from 'src/app/models/game.model';
import { PlayerRoundInfo } from 'src/app/models/PlayerRoundInfo';
import { NewGameComponent } from 'src/app/new-game/new-game.component';
import { GameComponent } from '../game.component';
import { MaalEntryComponent } from '../maal-entry/maal-entry.component';

@Component({
  selector: 'app-game-result',
  templateUrl: './game-result.component.html',
  styleUrls: ['./game-result.component.css'],
})
export class GameResultComponent implements OnInit {
  @Input() currentGame: Game;
  gameId: string;

  displayedColumns: string[];
  constructor(private route: ActivatedRoute, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.route.params.subscribe((param: Params) => {
      this.gameId = param['id'];
    });

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

  editLastRound() {
    console.log('last round editing');
    this.openEditRoundDialog();
  }

  openEditRoundDialog(): void {
    const dialogRef = this.dialog.open(MaalEntryComponent, {
      width: '250px',
      data: {
        currentGame: this.currentGame,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
      // this.animal = result;
    });
  }
}
