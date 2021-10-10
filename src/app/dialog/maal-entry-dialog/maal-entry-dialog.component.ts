import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { GameService } from 'src/app/game/game.service';
import { Game } from 'src/app/models/game.model';
import { Round } from 'src/app/models/Round';
import { DialogData } from './dialog.data';

@Component({
  selector: 'app-maal-entry-dialog',
  templateUrl: './maal-entry-dialog.component.html',
  styleUrls: ['./maal-entry-dialog.component.css'],
})
export class MaalEntryDialogComponent implements OnInit {
  game: Game;
  constructor(
    public dialogRef: MatDialogRef<MaalEntryDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private gameService: GameService
  ) {}

  ngOnInit(): void {
    this.game = this.gameService.loadGame(this.data.gameId);
  }

  maalCalculated(round: Round) {
    this.dialogRef.close();
  }
}
