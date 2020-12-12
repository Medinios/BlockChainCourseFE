import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {UserService} from '../../services/user.service';
import Swal from "sweetalert2";
import {catchError, take} from 'rxjs/operators';
import {throwError} from 'rxjs';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  user;
  userBalance = 0;
  yourProfile = false;
  transactions;
  pending = 0;
  constructor(private router: ActivatedRoute,
              private userService: UserService) { }

  ngOnInit(): void {
  this.getUserProfile();
  }

  getUserProfile() {
    this.router.paramMap.subscribe((params) => {
      const username = params.get('username');
      const localUser = window.localStorage.getItem("username");
      this.yourProfile = (username === localUser) ? true : false;
      this.userService.getProfile(username).pipe(catchError((err) => {
        Swal.fire({
          title: 'Error',
          text: `Opss.. Something want wrong , Please try again`,
          icon: 'error',
          showCancelButton: false,
          confirmButtonText: 'Ok',
        }).then((result) => {
          console.log("err");
        });
        return throwError(err);
      })).subscribe((res) => {
        this.user = res;
        this.getBalance(this.user.publicKey);
        this.getTransactions(this.user.publicKey);
        this.getPending();
      });
    });
  }

  getPending() {
    this.userService.getPeding().pipe(take(1)).pipe(catchError((err) => {
      Swal.fire({
        title: 'Error',
        text: `Opss.. Something want wrong , Please try again`,
        icon: 'error',
        showCancelButton: false,
        confirmButtonText: 'Ok',
      }).then((result) => {
        console.log("err");
      });
      return throwError(err);
    })).subscribe((res) => {
      this.pending = res.count;
    });
  }
  getBalance(publicKey: string) {
    this.userService.userBalance(publicKey).pipe(take(1)).pipe(catchError((err) => {
      Swal.fire({
        title: 'Error',
        text: `Opss.. Something want wrong , Please try again`,
        icon: 'error',
        showCancelButton: false,
        confirmButtonText: 'Ok',
      }).then((result) => {
        console.log("err");
      });
      return throwError(err);
    })).subscribe((res) => {
      this.userBalance = res.balance;
    });
  }

  getTransactions(publicKey: string) {
    this.userService.userTransactions(publicKey).pipe(take(1)).pipe(catchError((err) => {
      Swal.fire({
        title: 'Error',
        text: `Opss.. Something want wrong , Please try again`,
        icon: 'error',
        showCancelButton: false,
        confirmButtonText: 'Ok',
      }).then((result) => {
        console.log("err");
      });
      return throwError(err);
    })).subscribe((res) => {
      this.transactions = res;
    });
  }

   async sendMoney(toWho) {
    const { value: formValues } = await Swal.fire({
      title: 'Send Coins',
      icon: 'info',
      html:
        '<input id="swal-input1" class="swal2-input" placeholder="Amount">' +
        '<input id="swal-input2" class="swal2-input" placeholder="Your Private Key">',
      focusConfirm: false,
      preConfirm: () => {
        return [
          (document.getElementById('swal-input1') as HTMLInputElement).value,
          (document.getElementById('swal-input2') as HTMLInputElement).value,
        ];
      }
    });
    if (formValues) {
      console.log(formValues);
      this.userService.sendCoins({
        'from': window.localStorage.getItem('publicKey'),
        'to': toWho,
        'privateKey': formValues[1],
        'amount': formValues[0]
      }).pipe(catchError((err) => {
        Swal.fire({
          title: 'Error',
          text: `Opss.. Something want wrong , Please try again`,
          icon: 'error',
          showCancelButton: false,
          confirmButtonText: 'Ok',
        }).then((result) => {
          console.log("err");
        });
        return throwError(err);
      })).subscribe((res) => {
        this.getBalance(this.user.publicKey);
        this.getTransactions(this.user.publicKey);
        this.getPending();
      });
    }

}

  mining() {
    this.userService.goMining(window.localStorage.getItem("publicKey")).pipe(take(1)).subscribe((res)=> {
      Swal.fire({
        title: 'Mining Successfully Done',
        icon: 'success',
      })
      this.getBalance(this.user.publicKey);
      this.getTransactions(this.user.publicKey);
      this.getPending();
    });
  }

  verify(req) {
   delete req.signature;
   this.userService.goVerify(req).pipe(take(1)).subscribe((res)=> {
    if(res.hasTransaction) {
      Swal.fire({
        title: 'Verify Transaction Success',
        icon: 'success',
      });
    }
    else {
      Swal.fire({
        title: 'Verify Transaction Failed',
        icon: 'error',
      });
    }
  });
  }

}
