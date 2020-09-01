import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from './users.model'
import { GetUsers } from './getusers.model'
import { Login } from './login.model'
import { Update } from './update.model'
import { Observable } from 'rxjs';
import { Transfer } from './transferUp.model';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  baseUrl = "http://localhost:8080"

  userIs = [{name: null, money: null},{userIsTrue: false}]

  transfer: Transfer = {
    agencia: '',
    conta: '',
    money: ''
  }

  constructor(private http: HttpClient) { }

  setUserTrue(key: string) {
    const data = JSON.parse(localStorage.getItem(key))
    if(data === null) {
      localStorage.setItem(key, JSON.stringify(this.userIs))
    } else if(data[1].userIsTrue === true) {
      this.transfer.agencia = data[0].agencia
      this.transfer.conta = data[0].conta
      this.readAccount(this.transfer).subscribe(res => {
        data[0].money = res.money
        localStorage.setItem(key, JSON.stringify(data))
      })
    }
  }

  createUsers(user: User): Observable<User> {
    return this.http.post<User>(this.baseUrl + "/registerlogin", user)
  }

  readUsers(): Observable<GetUsers[]> {
    return this.http.get<GetUsers[]>(this.baseUrl + "/users")
  }

  loginUsers(login: Login): Observable<Login> {
    return this.http.post<Login>(this.baseUrl + "/login", login)
  }

  updateUsers(update: Update): Observable<Update> {
    return this.http.put<Update>(this.baseUrl + "/update",update)
  }

  readAccount(transfer: Transfer): Observable<Transfer> {
    return this.http.post<Transfer>(this.baseUrl + "/account", transfer)
  }
}
