import { Component, OnInit } from '@angular/core';
import { Update } from 'src/app/config/update.model';
import { Transfer } from 'src/app/config/transferUp.model';
import { Login } from 'src/app/config/login.model';
import { UsersService } from 'src/app/config/users.service';
import { GetUsers } from 'src/app/config/getusers.model';

@Component({
  selector: 'app-administrar',
  templateUrl: './administrar.component.html',
  styleUrls: ['./administrar.component.css']
})
export class AdministrarComponent implements OnInit {

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

  login: Login = {
    email: '',
    password: ''
  }

  user = {
    name: null,
    money: null,
    userIsTrue: false,
    conta: null
  }

  initialTransfer = {
    agencia: '',
    conta: '',
    money: ''
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

  deposit(): void {
    if(this.operation.depositar.indexOf('+') > -1 || this.operation.depositar.indexOf('-') > -1 || !this.operation.depositar) {
      alert('Valor inválido !')
      return
    }
    this.update.conta = this.user[0].conta
    this.update.money = ((Number(this.operation.depositar)) + Number(this.user[0].money)).toString()
    this.users.updateUsers(this.update).subscribe(() => {
      alert('Depositado com sucesso !')
      this.user[0].money = this.update.money
      localStorage.setItem(this.userkey, JSON.stringify(this.user))
      location.reload()
    }, erro => {
      alert(erro.error)
    })
  }

  withdraw(): void {
    if(this.operation.sacar.indexOf('+') > -1 || this.operation.sacar.indexOf('-') > -1 || !this.operation.sacar) {
      alert('Valor inválido !')
      return
    }
    if(Number(this.operation.sacar) >= Number(this.user[0].money) + 1) {
      alert(`Limite de saque de ${this.user[0].money}`)
      return
    }
    if(Number(this.operation.sacar) <= 10) return alert('Saque de até 10 R$')
    this.update.conta = this.user[0].conta
    this.update.money = ((Number(this.user[0].money)) - (Number(this.operation.sacar))).toString()
    this.users.updateUsers(this.update).subscribe(() => {
      alert('Sacado com sucesso !')
      this.user[0].money = this.update.money
      localStorage.setItem(this.userkey, JSON.stringify(this.user))
      location.reload()
    }, erro => {
      alert(erro.error)
    })
  }

  transferencia(): void {
    this.transfer.agencia = this.initialTransfer.agencia
    this.transfer.conta = this.initialTransfer.conta
    this.transfer.money = this.initialTransfer.money
    if(!this.transfer.money) return alert('Informe um valor para transferência !')
    if(this.transfer.money.indexOf('+') > -1 || this.transfer.money.indexOf('-') > -1) return alert('Valor inválido !')
    if(Number(this.transfer.money) >= Number(this.user[0].money) +1) return alert(`Valor para transferência e de ${this.user[0].money}`)
    this.users.readAccount(this.transfer).subscribe(res => {
      if(res == null) return alert('Agência/conta não encontrada !')
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
      }, erro => {
        alert(erro.error)
      })
    }, erro => {
      alert(erro.error)
    })
  }

  deleteAccount(): void {
    if(this.login.email != this.user[0].email) return alert('Usuário não é você !')
    this.users.deleteUsers(this.login).subscribe(() => {
      alert('Usuário deletado')
      localStorage.clear()
      location.reload()
    }, erro => {
      alert(erro.error)
    })
  }

}
