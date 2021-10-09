import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChange,
  SimpleChanges,
} from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Game } from 'src/app/models/game.model';
import { PlayerRoundInfo } from 'src/app/models/PlayerRoundInfo';

@Component({
  selector: 'app-game-result',
  templateUrl: './game-result.component.html',
  styleUrls: ['./game-result.component.css'],
})
export class GameResultComponent implements OnInit {
  @Input() currentGame: Game;
  gameId: string;

  displayedColumns: string[];
  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.params.subscribe((param: Params) => {
      this.gameId = param['id'];
    });

    let m: string[] = ['round'];

    m.push(...this.currentGame.players.map((x) => x.name));
    m.push(...['totalMaal']);

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
}
