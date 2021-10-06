import { Player } from './player.model';
export interface Game {
  id: string;
  players: Array<Player>;
  rounds: Array<Round>;
}

export interface Round {
  roundNumber: number;
  roundInfo: Array<PlayerRoundInfo>;
}

export interface PlayerRoundInfo {
  name: string;
  maal?: number;
  seen: boolean;
  dubliee: boolean;
  gameWon: boolean;
  calculatedPoint: number;
}
