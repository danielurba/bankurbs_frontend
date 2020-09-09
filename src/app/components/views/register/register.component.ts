import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/config/users.service'
import { User } from 'src/app/config/users.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  user: User = {
    name: "",
    email: "",
    agencia: 0,
    conta: 0,
    password: ""
  }

  constructor(private users: UsersService, private router: Router) { }

  ngOnInit(): void {
  }

  getRandomAcount(): void {
    const agen = Math.floor(Math.random() * 10000)
    const cont = Math.floor(Math.random() * 1000000)
    this.user.agencia = agen
    this.user.conta = cont
  }

  postUser(): void {
    this.getRandomAcount()
    this.users.createUsers(this.user).subscribe(() => {
      alert('Usuário Criado com sucesso !')
      this.router.navigate(["/login"])
    }, erro => {
        alert(erro.error)
    })
  }

}
