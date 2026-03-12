import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from '../../services/user';
import { User } from '../../models/user.model';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card'
import { MatInputModule } from '@angular/material/input'
import { MatFormFieldModule } from '@angular/material/form-field'

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule
  ],
  templateUrl: './users.html',
  styleUrl: './users.scss',
})
export class Users implements OnInit {

  users: User[] = []
  filteredUsers: User[] = []

  constructor(private userService: UserService){}

  ngOnInit(){

    this.userService.getUsers().subscribe(data => {

      this.users = data
      this.filteredUsers = data

    })

  }

  searchUsers(event: Event){

    const value = (event.target as HTMLInputElement).value.toLowerCase()

    this.filteredUsers = this.users.filter(user =>
      user.name.toLowerCase().includes(value)
    )

  }

}