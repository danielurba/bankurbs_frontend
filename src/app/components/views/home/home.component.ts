import { Component, OnInit } from '@angular/core';
import { GetUsers } from 'src/app/config/getusers.model';
import { UsersService } from 'src/app/config/users.service'
import { Update } from 'src/app/config/update.model';
import { Transfer } from 'src/app/config/transferUp.model';
import { Login } from 'src/app/config/login.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  getusers: GetUsers[]

  userkey = "_user_key_"

  user = {
    name: null,
    money: null,
    userIsTrue: false,
    conta: null
  }

  constructor(private users: UsersService) { }

  ngOnInit(): void {
    this.users.readUsers().subscribe(users => {
      this.getusers = users
    })
    this.getData(this.userkey)
  }

  getData(key: string): void {
    this.user = JSON.parse(localStorage.getItem(key))
  }
}
