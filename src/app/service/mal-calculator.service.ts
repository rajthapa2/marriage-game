import { Injectable } from '@angular/core';
import { Round } from '../models/Round';
import { PlayerRoundInfo } from '../models/PlayerRoundInfo';

@Injectable({
  providedIn: 'root',
})
export class MalCalculatorService {
  constructor() {}

  calculateMaal(currentRound: Round): Round {
    const totalMaal = this.getTotalMaal(currentRound);
    currentRound.roundInfo.forEach((p) => {
      if (!p.seen) {
        p.calculatedPoint = -(totalMaal + 10);
      } else if (p.seen && !p.gameWon) {
        let totalMalPlus3 = totalMaal;
        if (!p.dubliee) {
          totalMalPlus3 = totalMaal + 3;
        }
        p.calculatedPoint =
          this.getDefaultMal(p.maal) * currentRound.roundInfo.length -
          totalMalPlus3;
      }

      this.update15PointIfApplicable(p);
    });

    let gameWonPlayer = currentRound.roundInfo.find((p) => p.gameWon);
    if (gameWonPlayer) {
      let totalCalculatedPoint = 0;
      currentRound.roundInfo
        .filter((x) => !x.gameWon)
        .forEach(
          (r) =>
            (totalCalculatedPoint = totalCalculatedPoint + r.calculatedPoint)
        );
      gameWonPlayer.calculatedPoint = -totalCalculatedPoint;
    }

    currentRound.totalMaal = totalMaal;
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

  private update15PointIfApplicable(playerRound: PlayerRoundInfo) {
    if (playerRound.pandraPointFine) {
      playerRound.calculatedPoint -= 15;
    }
  }
}
