import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { distinctUntilChanged, Subscription } from 'rxjs';
import { UtilService } from '../services/util.service';
import { GameService } from '../services/game.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit, OnDestroy {
  private subscription = new Subscription();

  constructor(
    public utilService: UtilService,
    private gameService: GameService,
    private router: Router
  ) {}

  registerForm: FormGroup = new FormGroup({
    userName: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
    confirmPassword: new FormControl('', [
      Validators.required,
      this.checkPasswordMatch.bind(this)('password'),
    ]),
  });

  checkPasswordMatch(controlName: string): any {
    return (control: AbstractControl): { [key: string]: boolean } | null => {
      if (this.registerForm?.get(controlName)?.value !== control.value) {
        return { invalidPassword: true };
      }
      return null;
    };
  }

  ngOnInit(): void {
    this.subscription.add(
      this.registerForm
        .get('password')
        ?.valueChanges.pipe(distinctUntilChanged())
        .subscribe(() => {
          this.registerForm.get('confirmPassword')?.updateValueAndValidity();
        })
    );
  }

  onSubmit(): void {
    this.gameService.create(this.registerForm.value, (isCreated) => {
      if (isCreated) {
        this.router.navigateByUrl('login');
      }
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
