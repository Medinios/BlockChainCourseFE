import {Component, EventEmitter, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../../services/user.service';
import {take} from 'rxjs/operators';
import Swal from 'sweetalert2';
import {Router} from '@angular/router';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerFormGroup: FormGroup;
  public changeState = new EventEmitter();

  constructor(private fb: FormBuilder,
              private userService: UserService,
              private router: Router) { }

  ngOnInit(): void {
    this.buildForm();
  }

  buildForm() {
    this.registerFormGroup = this.fb.group(
      {
        username: [null, Validators.required],
        password: [null, Validators.required],
        mail: [null, Validators.required],
      }
    );
  }
  changeView() {
    this.changeState.emit('login');
  }

  register() {
    const {value, valid} = this.registerFormGroup;
    if (valid) {
      this.userService.register(value).pipe(take(1)).subscribe((res) => {
        Swal.fire({
          title: 'Register Successfuly',
          html:
           '<div>You register <b>Successfully</b> to SashaCoin</div>' +
            '<div>This is your private key (Save it and keep it in secret)</div>' +
            `<div><b>${res.privateKey}</b></div>`,
          icon: 'success',
          showCancelButton: false,
          confirmButtonText: 'Ok',
        }).then((result) => {
          this.changeView();
        });
    });
  }
}
}
