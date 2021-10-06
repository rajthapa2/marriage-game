import { Injectable } from '@angular/core';
import { PlayerRoundInfo, Round } from '../models/game.model';

@Injectable({
  providedIn: 'root',
})
export class MalCalculatorService {
  constructor() {}

  calculateMaal(currentRound: Round): Round {
    const totalMaal = this.getTotalMaal(currentRound);

    let totalCalculatedPoint = 0;

    currentRound.roundInfo.forEach((p) => {
      if (!p.seen) {
        p.calculatedPoint = -(totalMaal + 10);
        totalCalculatedPoint = totalCalculatedPoint + p.calculatedPoint;
      } else if (p.seen && !p.gameWon) {
        let totalMalWith3 = totalMaal;
        if (!p.dubliee) {
          totalMalWith3 = totalMaal + 3;
        }
        p.calculatedPoint =
          this.getDefaultMal(p.maal) * currentRound.roundInfo.length -
          totalMalWith3;
        totalCalculatedPoint = totalCalculatedPoint + p.calculatedPoint;
      }
    });

    let gameWonPlayer = currentRound.roundInfo.find((p) => p.gameWon);
    if (gameWonPlayer) gameWonPlayer.calculatedPoint = -totalCalculatedPoint;

    return currentRound;
  }

  getDefaultMal(maal: any): number {
    if (maal == undefined) {
      return 0;
    }
    return Number.parseInt(maal);
  }

  private getTotalMaal(currentRound: Round): number {
    let totalMaal = 0;
    const allSeenPlayers = currentRound.roundInfo.filter((x) => x.seen);
    allSeenPlayers.forEach((x) => {
      totalMaal += this.getDefaultMal(x.maal);
    });
    return totalMaal;
  }
}
