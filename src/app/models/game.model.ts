import { Player } from './player.model';
import { Round } from './Round';
export interface Game {
  id: string;
  players: Array<Player>;
  rounds: Array<Round>;
}
