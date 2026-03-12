import { Component, OnInit } from '@angular/core';
import { Post } from '../../models/post.model';
import { PostService } from '../../services/post';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterModule } from '@angular/router';
import { UserService } from '../../services/user';
import { MatButtonModule } from '@angular/material/button';
import {MatCardModule} from '@angular/material/card'

@Component({
  selector: 'app-posts-list',
  standalone: true,
  imports: [CommonModule, 
            RouterModule,
            MatButtonModule,
            RouterLink,
            MatCardModule],
  templateUrl: './posts-list.html',
  styleUrl: './posts-list.scss',
})
export class PostsList implements OnInit{

  posts: any[] = []
  loading = true

  constructor(private postService: PostService,
              private userService: UserService
  ){}

  ngOnInit(): void {
   
    this.postService.getPosts().subscribe(posts => {
      this.posts = posts
      this.loading = false

      this.posts.forEach(post => {

        this.userService.getUser(post.userId)
        .subscribe(user => {
          post.userName = user.name
        })
      })
    })
  }
}
