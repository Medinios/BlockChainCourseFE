import { Component, OnInit } from '@angular/core';
import {UserService} from '../../services/user.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-first-page',
  templateUrl: './first-page.component.html',
  styleUrls: ['./first-page.component.scss']
})
export class FirstPageComponent implements OnInit {
  totalCash;
  lastBlocks;
  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.getTotal();
    this.getLastBlocks();
  }

  getTotal() {
    this.userService.getTotalCash().subscribe((res) => {
      this.totalCash = res.totalCoins;
    });
  }

  getLastBlocks() {
    this.userService.getLastBlocks().pipe(take(1)).subscribe((res)=> {
      this.lastBlocks = res;
    });
  }
}
