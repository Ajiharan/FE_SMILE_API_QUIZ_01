import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { GameService } from '../services/game.service';
import { UtilService } from '../services/util.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  constructor(
    public utilService: UtilService,
    private gameService: GameService,
    private router: Router
  ) {}
  signInForm: FormGroup = new FormGroup({
    userName: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });

  ngOnInit(): void {}

  onSubmit(): void {
    this.gameService.login(this.signInForm.value, (res: boolean) => {
      if (res) {
        this.router.navigateByUrl('game');
      }
    });
  }
}
