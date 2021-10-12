import { Component, OnInit } from '@angular/core';
import { GameService } from '../game/game.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css'],
})
export class HistoryComponent implements OnInit {
  constructor(private gameService: GameService) {}

  ngOnInit(): void {
    let allGames = this.gameService.loadAllGames();
    console.log(allGames);
  }
}
