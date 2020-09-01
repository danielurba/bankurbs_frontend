import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/config/users.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  userkey = "_user_key_"

  user = {
    name: null,
    money: null,
    userIsTrue: false
  }

  constructor(private users: UsersService) { }

  ngOnInit(): void {
    this.setUserIsTrue(this.userkey)
    this.getData(this.userkey)
  }

  setUserIsTrue(key: string): void {
    this.users.setUserTrue(key)
  }

  getData(key: string): void {
    this.user = JSON.parse(localStorage.getItem(key))
  }

  resetStore(): void {
    localStorage.clear()
    location.reload()
  }

}
