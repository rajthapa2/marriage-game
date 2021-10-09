import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NewGameComponent } from './new-game/new-game.component';
import { HistoryComponent } from './history/history.component';
import { AppSideNavComponent } from './app-side-nav/app-side-nav.component';
import { GameComponent } from './game/game.component';
import { RouterModule } from '@angular/router';
import { routes } from './routes';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgOptionHighlightModule } from '@ng-select/ng-option-highlight';

import { MaterialModule } from './material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GameResultComponent } from './game/game-result/game-result.component';

@NgModule({
  declarations: [
    AppComponent,
    NewGameComponent,
    HistoryComponent,
    AppSideNavComponent,
    GameComponent,
    ToolbarComponent,
    GameResultComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    NgSelectModule,
    NgOptionHighlightModule,
    MaterialModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
