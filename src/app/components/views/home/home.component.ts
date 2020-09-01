import { Component, OnInit } from '@angular/core';
import { GetUsers } from 'src/app/config/getusers.model';
import { UsersService } from 'src/app/config/users.service'
import { Update } from 'src/app/config/update.model';
import { Transfer } from 'src/app/config/transferUp.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  getusers: GetUsers[]

  userkey = "_user_key_"

  update: Update = {
    conta: '',
    money: '',
  }

  transfer: Transfer = {
    agencia: '',
    conta: '',
    money: ''
  }

  operation = {
    depositar: '',
    sacar: ''
  }

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

  deposit(operation: string): void {
    this.update.conta = this.user[0].conta
    if(operation === "soma") {
      this.update.money = ((Number(this.operation.depositar)) + Number(this.user[0].money)).toString()
    } else if(operation === "subtration") {
      this.update.money = ((Number(this.user[0].money)) - (Number(this.operation.sacar))).toString()
    }
    this.users.updateUsers(this.update).subscribe(() => {
      if(this.user[0].money > this.update.money) {
        alert('Sacado com sucesso !')
      } else {
        alert('Depositado com sucesso !')
      }
      this.user[0].money = this.update.money
      localStorage.setItem(this.userkey, JSON.stringify(this.user))
      location.reload()
    }, erro => {
      alert(erro.error)
    })
  }

  transferencia(): void {
    this.users.readAccount(this.transfer).subscribe(res => {
      this.update.conta = this.user[0].conta
      this.update.money = ((Number(this.user[0].money)) - (Number(this.transfer.money))).toString()
      this.transfer.money = ((Number(res.money) + Number(this.transfer.money))).toString()
      this.users.updateUsers(this.update).subscribe(() => {
        this.users.updateUsers(this.transfer).subscribe(() => {
          alert('Transferência realizada com Sucesso !')
          this.users.setUserTrue(this.userkey)
          location.reload()
        }, erro => {
          alert(erro.error)
        })
      })
    })
  }

}
