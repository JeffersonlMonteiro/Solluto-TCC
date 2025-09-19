import { Component } from '@angular/core';
import { NgIf } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-signup-page',
  standalone: true,
  imports: [NgIf, FormsModule],
  templateUrl: './signup-page.component.html',
  styleUrls: ['./signup-page.component.scss']
})

export class SignupPageComponent {

name = '';
email = '';
telefone = '';
password = '';
mensagem = '';


constructor(private authService: AuthService, private router: Router) { }

onSubmit() {
  const userData = {
    USU_VAR_NOME: this.name,
    USU_VAR_EMAIL: this.email,
    USU_VAR_TELEFONE: this.telefone,
    USU_VAR_SENHA: this.password
  };

  this.authService.register(userData).subscribe({
    next: (res) => {
      this.mensagem = 'Cadastro realizado com sucesso!';
      this.router.navigate(['/login']);
    },
    error: (err) => {
      console.log('Erro detalhado:', err);
      let detalhes = '';
      if (err.status) detalhes += ` [Status: ${err.status}]`;
      if (err.error) detalhes += ` [Corpo: ${JSON.stringify(err.error)}]`;
      this.mensagem = 'Erro ao realizar cadastro: ' + (err.error?.error || 'Erro desconhecido') + detalhes;
    }
  });
}
 }
