import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { NgIf } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [NgIf, FormsModule],
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent {
  email = '';
  password = ''
  mensagem = '';

  constructor(private authService: AuthService, private router: Router) { }
  
  goToRegister() {
    this.router.navigate(['/signup']);
  }
  goToRecovery() {
    this.router.navigate(['/recovery']);
  }
  OnLogin() {
    if(!this.email || !this.password) {
      this.mensagem = 'Por favor, preencha todos os campos.';
      return;
    }

  this.authService.login(this.email, this.password).subscribe({
      next: (res) => {
        localStorage.setItem('token', res.token);
        this.mensagem = 'Login bem-sucedido!';
        this.router.navigate(['/home']);
      },
      error: (err) => {
        this.mensagem = 'Erro no login: ' + (err.error?.error || 'Erro desconhecido');
      }
    });      
  }

}
