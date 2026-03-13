import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from '../../services/user';
import { User } from '../../models/user.model';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card'
import { MatInputModule } from '@angular/material/input'
import { MatFormFieldModule } from '@angular/material/form-field'
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinner } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatIconModule,
    MatProgressSpinner
  ],
  templateUrl: './users.html',
  styleUrl: './users.scss',
})
export class Users implements OnInit {

  users: User[] = []
  filteredUsers: User[] = []
  searchTerm = ''
  loading = true
  

  constructor(private userService: UserService){}

  ngOnInit(){

    this.userService.getUsers().subscribe(data => {

      this.users = data
      this.filteredUsers = data
      this.loading = false

    })

  }

  filterUsers(){

    const term = this.searchTerm.toLowerCase()
  
    if(!term){
      this.filteredUsers = this.users
      return
    }
  
    this.filteredUsers = this.users.filter(user =>
      user.name.toLowerCase().includes(term) ||
      user.email.toLowerCase().includes(term) ||
      user.company?.name.toLowerCase().includes(term)
    )
  
  }
  

}