import { PlayerRoundInfo } from './PlayerRoundInfo';

export interface Round {
  roundNumber: number;
  totalMaal: number;
  roundInfo: Array<PlayerRoundInfo>;
}
