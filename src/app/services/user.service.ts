import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { environment } from '../../environments/environment';
import {Observable} from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpService: HttpClient) { }


  login(req): Observable<any> {
    return this.httpService.post(`${environment.server}/users/login`, req);
  }
  register(req): Observable<any> {
    return this.httpService.post(`${environment.server}/users/create`, req);
  }

  getProfile(req): Observable<any> {
    return  this.httpService.get(`${environment.server}/users/profile/${req}`);
  }

  sendCoins(req): Observable<any> {
    return this.httpService.post(`${environment.server}/blockchain/add_transaction`, req);
  }

  userBalance(req): Observable<any> {
    return this.httpService.post(`${environment.server}/blockchain/get_balance`, {publicKey: req});
  }

  userTransactions(req): Observable<any> {
    return this.httpService.post(`${environment.server}/blockchain/get_transactions`, {publicKey: req});
  }

  getUsersList(): Observable<any> {
    return this.httpService.get(`${environment.server}/users/users_list`);
  }

  goMining(req): Observable<any> {
    return this.httpService.post(`${environment.server}/blockchain/mining`,{publicKey: req});
  }

  getPeding(): Observable<any> {
    return this.httpService.post(`${environment.server}/blockchain/get_pending` , {});
  }

  getTotalCash(): Observable<any> {
    return this.httpService.post(`${environment.server}/blockchain/get_total` , {});
  }

  getLastBlocks(): Observable<any> {
    return this.httpService.post(`${environment.server}/blockchain/get_last_blocks` , {});
  }
  goVerify(req): Observable<any> {
    return this.httpService.post(`${environment.server}/blockchain/verify` , req);
  }
}
