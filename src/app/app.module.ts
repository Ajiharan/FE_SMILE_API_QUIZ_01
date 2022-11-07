import { A11yModule } from '@angular/cdk/a11y';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CookieService } from 'ngx-cookie-service';
import { AccordionModule } from 'primeng/accordion'; //accordion and accordion tab
import { MessageService } from 'primeng/api';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { ListboxModule } from 'primeng/listbox';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { RadioButtonModule } from 'primeng/radiobutton';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { CommonTableComponent } from './core/common-table/common-table.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { GameComponent } from './game/game.component';

@NgModule({
  declarations: [AppComponent, HomeComponent, CommonTableComponent, LoginComponent, RegisterComponent, GameComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CardModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AccordionModule,
    InputTextModule,
    ButtonModule,
    ProgressSpinnerModule,
    ToastModule,
    BrowserAnimationsModule,
    AvatarModule,
    OverlayPanelModule,
    ListboxModule,
    TableModule,
    A11yModule,
    RadioButtonModule,
    DialogModule,
  ],
  providers: [MessageService, CookieService],
  bootstrap: [AppComponent],
})
export class AppModule {}
