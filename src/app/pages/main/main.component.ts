import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import {Router} from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  items: MenuItem[];
  login = false;
  username;
  constructor(private router: Router) { }

  ngOnInit(): void {
    this.checkLogin();
  }

  checkLogin() {
    if (window.localStorage.getItem('username') && window.localStorage.getItem('publicKey')) {
      this.login = true;
      this.username = window.localStorage.getItem('username');
    }
    else {
      this.router.navigate(['/auth']);
    }
  }


  usersList() {
    this.router.navigate(['/users']);
  }
}
