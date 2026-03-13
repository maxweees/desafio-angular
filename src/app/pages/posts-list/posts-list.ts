import { Component, OnInit } from '@angular/core';
import { Post } from '../../models/post.model';
import { PostService } from '../../services/post';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterModule } from '@angular/router';
import { UserService } from '../../services/user';
import { MatButtonModule } from '@angular/material/button';
import {MatCardModule} from '@angular/material/card'
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from "@angular/material/icon";
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner'

@Component({
  selector: 'app-posts-list',
  standalone: true,
  imports: [CommonModule,
    RouterModule,
    MatButtonModule,
    RouterLink,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule, 
    MatIconModule,
    MatProgressSpinnerModule],
  templateUrl: './posts-list.html',
  styleUrl: './posts-list.scss',
})

export class PostsList implements OnInit{

  posts: any[] = []
  filteredPosts: any[] = []
  loading = true
  error = false
  searchTerm = ''


  
  constructor(
    private postService: PostService,
    private userService: UserService
  ){}

  ngOnInit(): void {

    this.loading = true

    this.postService.getPosts().subscribe({

      next: (posts) => {

        this.posts = posts
        this.filteredPosts = posts
        this.loading = false

        this.posts.forEach(post => {

          this.userService.getUser(post.userId)
            .subscribe(user => {
              post.userName = user.name
            })

        })
      },

      error: () => {
        this.loading = false
        this.error = true
      }

    })
  }

  clearSearch(){
    this.searchTerm = ''
    this.filteredPosts = this.posts
  }

  filterPosts(){

    const term = this.searchTerm.toLowerCase()

    if(!term){
      this.filteredPosts = this.posts
      return
    }

    this.filteredPosts = this.posts.filter(post =>
      post.title.toLowerCase().includes(term) ||
      post.userName?.toLowerCase().includes(term)
    )

  }

}
