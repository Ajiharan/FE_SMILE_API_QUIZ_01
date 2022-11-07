import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GameService } from '../services/game.service';
import { UtilService } from '../services/util.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  public highScoreDetails: any;

  constructor(
    private gameService: GameService,
    private utilService: UtilService,
    private router: Router
  ) {
    this.getHighScoreDetail();
  }

  getHighScoreDetail(): void {
    this.gameService.getHighScore((data) => {
      this.highScoreDetails = data;
    });
  }
  ngOnInit(): void {}

  startGame(): void {
    const token = this.utilService.getToken();
    if (!token) {
      this.router.navigateByUrl('login');
      return;
    }
    this.router.navigateByUrl('game');
  }
}
