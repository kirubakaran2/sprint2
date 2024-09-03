import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService, User } from './user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'user-module';
  userDetails: User[] = [];
  userToUpdate: User = { id: undefined, username: "", password: "", email: "", role: "" };

  constructor(private userService: UserService) {
    this.getUserDetails();
  }

  register(registerForm: NgForm) {
    this.userService.registerUser(registerForm.value).subscribe(
      (resp: User) => {
        console.log(resp);
        registerForm.reset();
        this.getUserDetails();
      },
      (err: any) => {
        console.log(err);
      }
    );
  }

  getUserDetails() {
    this.userService.getUsers().subscribe(
      (resp: User[]) => {
        console.log(resp);
        this.userDetails = resp;
      },
      (err: any) => {
        console.log(err);
      }
    );
  }

  deleteUser(user: User) {
    this.userService.deleteUser(user.id!).subscribe(
      () => {
        this.getUserDetails();
      },
      (err: any) => {
        console.log(err);
      }
    );
  }

  edit(user: User) {
    this.userToUpdate = { ...user };
  }

  updateUser() {
    this.userService.updateUser(this.userToUpdate).subscribe(
      (resp: User) => {
        console.log(resp);
        this.getUserDetails();
      },
      (err: any) => {
        console.log(err);
      }
    );
  }
}
