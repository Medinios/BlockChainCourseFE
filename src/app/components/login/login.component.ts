import { Component, OnInit, EventEmitter } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../../services/user.service';
import {Router} from '@angular/router';
import {catchError, take} from 'rxjs/operators';
import Swal from "sweetalert2";
import { throwError } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginFormGroup: FormGroup;
  public changeState = new EventEmitter();

  constructor(private fb: FormBuilder,
              private userService: UserService,
              private router: Router) { }

  ngOnInit(): void {
    this.buildForm();
  }

  buildForm() {
    this.loginFormGroup = this.fb.group(
      {
        username: [null, Validators.required],
        password: [null, Validators.required]
      }
    );
  }
  changeView() {
    this.changeState.emit('login');
  }

  login() {
    const {value, valid} = this.loginFormGroup;
    if (valid) {
      this.userService.login(value).pipe(take(1) , catchError((err) => {
        Swal.fire({
          title: 'Login Failed',
          text: `one or more credentials are not valid`,
          icon: 'error',
          showCancelButton: false,
          confirmButtonText: 'Ok',
        }).then((result) => {
          console.log("err");
        });
        return throwError(err);
      })).subscribe((res) => {
        window.localStorage.setItem( 'publicKey', res.publicKey);
        window.localStorage.setItem( 'username', res.username);
        this.router.navigate(['main']);
      });
    }
  }

}
