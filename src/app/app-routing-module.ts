import { Component, NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';

import { PostsList} from './pages/posts-list/posts-list'
import { PostDetail} from './pages/post-detail/post-detail'
import { Users} from './pages/users/users'
import { Routes } from '@angular/router';

const routes: Routes = [
  {path: '', component: PostsList},
  {path: 'post/:id', component: PostDetail},
  {path: 'users', component: Users},
]

@NgModule({
  declarations: [],
  imports: [CommonModule],
})
export class AppRoutingModule {}
