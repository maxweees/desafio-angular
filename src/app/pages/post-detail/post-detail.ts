import { Component,OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

import { PostService } from '../../services/post';
import { UserService } from '../../services/user';

import { Post } from '../../models/post.model';
import { User } from '../../models/user.model';
import { RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule, MatDivider } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'


@Component({
  selector: 'app-post-detail',
  standalone: true,
  imports: [CommonModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule, 
    MatDivider,
    MatProgressSpinnerModule,
   ],
  templateUrl: './post-detail.html',
  styleUrl: './post-detail.scss',
})
export class PostDetail implements OnInit{

  post?: Post
  user?: User
  loading = true

  constructor(
    private route: ActivatedRoute,
    private postService: PostService,
    private userService:  UserService
  ){}

  ngOnInit(): void {

    this.route.params.subscribe(params => {

      const id = Number(params['id'])

      this.postService.getPost(id).subscribe(post => {  this.post = post
        this.loading = false
        this.userService.getUser(post.userId).subscribe(user => {
          this.user = user
        })
  
      })
    })
    
  }
}
