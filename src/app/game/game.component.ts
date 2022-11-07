import { UtilService } from './../services/util.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { GameService } from '../services/game.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
})
export class GameComponent implements OnInit {
  private currentLevelTimer: number = 30;
  public userDetails: any;
  public levelTimer: number;

  public livesCount: number;

  public score: number;

  private interval: any;

  public answerArr: number[];

  public levelQuestionsCount: number;

  public isFinished: boolean = false;

  public highScoreDetail: any;
  public myScoreDetails: any;
  public activeIndex: number;

  public btnDisabled: boolean = true;

  public queAns: {
    question: string;
    solution: number;
  } | null = null;

  public level: number;

  public items: MenuItem[] = [
    {
      label: 'Low',
    },
    {
      label: 'Medium',
    },
    {
      label: 'High',
    },
  ];

  getQuestion(): void {
    if (this.levelQuestionsCount === 0) {
      if (this.level === 1) {
        this.levelQuestionsCount = 8;
      } else if (this.level == 2) {
        this.levelQuestionsCount = 10;
      } else {
        this.livesCount = 0;
        this.isFinished = true;
        return;
      }

      this.level = this.level + 1;
      this.activeIndex = this.level - 1;
      this.currentLevelTimer = this.currentLevelTimer - 5;
    }
    --this.levelQuestionsCount;
    this.btnDisabled = true;
    this.gameService.getQuestion((data) => {
      this.queAns = data;
      this.btnDisabled = false;
      this.startTimer();
    });
  }

  constructor(
    private gameService: GameService,
    private utilService: UtilService,
    private router: Router
  ) {
    this.initializeGame();
    this.getUser();
    this.getQuestion();
  }

  getUser(): void {
    this.gameService.getUserData((data: any) => {
      this.userDetails = data;
    });
  }

  initializeGame(): void {
    this.userDetails = null;
    this.levelTimer = this.currentLevelTimer;
    this.livesCount = 3;
    this.score = 0;
    this.interval = null;
    this.answerArr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    this.queAns = null;
    this.level = 1;
    this.levelQuestionsCount = 5;
    this.activeIndex = 0;
  }

  startTimer(): void {
    if (this.interval) {
      clearInterval(this.interval);
      this.levelTimer = this.currentLevelTimer;
    }
    this.interval = setInterval(() => {
      --this.levelTimer;
      if (this.levelTimer === 0) {
        clearInterval(this.interval);
        this.wrongAnswer();
      }
    }, 1000);
  }

  ngOnInit(): void {}

  wrongAnswer(): void {
    --this.livesCount;

    this.score -= 1;
    if (this.livesCount === 0) {
      clearInterval(this.interval);
      this.gameService.addScore(
        {
          score: this.score,
          userName: this.userDetails.user.userName,
          uid: this.userDetails.user._id,
        },
        () => {
          this.getHighScoreDetails();
        }
      );
      return;
    }
    this.getQuestion();
  }

  onClick(value: number) {
    if (this.queAns?.solution !== value) {
      this.wrongAnswer();
      return;
    }
    this.score += 2;
    this.getQuestion();
  }

  startGame(): void {
    this.initializeGame();
    this.getUser();
    this.getQuestion();
  }

  getHighScoreDetails(): void {
    this.gameService.getHighScore((data: any) => {
      this.highScoreDetail = data;
    });

    this.gameService.getHighScore((data: any) => {
      this.myScoreDetails = data;
    }, `score/getScores/${this.userDetails.user._id}`);
  }

  newGame(): void {
    this.router.navigateByUrl('home');
  }

  logout(): void {
    this.utilService.removeToken();
    this.router.navigateByUrl('login');
  }
}
