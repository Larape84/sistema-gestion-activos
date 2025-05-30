import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { getAuth, onAuthStateChanged, User } from 'firebase/auth';
import { AuthServiceService } from './core/services/auth-service.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ButtonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'sistema-gestion-activos';



  constructor(
    private AuthServiceService : AuthServiceService
  ){}











}
