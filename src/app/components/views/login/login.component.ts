import { Component, OnInit} from '@angular/core';
import { UsersService } from 'src/app/config/users.service'
import { Login } from 'src/app/config/login.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  userkey = "_user_key_"

  login: Login = {
    email: "",
    password: ""
  }

  list = []

  constructor(private users: UsersService, private router: Router) { }

  ngOnInit(): void {
  }

  loginUser(): void {
    this.users.loginUsers(this.login).subscribe(res => {
      this.list.push(res)
      this.list.push({userIsTrue: true})
      localStorage.setItem(this.userkey, JSON.stringify(this.list))
      alert('Logado com Sucesso !')
      this.router.navigate(['/']).then(() => {
        location.reload()
      })
    }, erro => {
      alert(erro.error)
    })
  }

}
