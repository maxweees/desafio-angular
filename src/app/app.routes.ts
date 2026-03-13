import { Routes } from '@angular/router';

import { PostsList } from './pages/posts-list/posts-list'
import { PostDetail } from './pages/post-detail/post-detail'
import { Users } from './pages/users/users'

export const routes: Routes = [

    { 
      path: '',
      pathMatch: 'full',
       loadComponent: () => 
          import('./pages/posts-list/posts-list')
          .then(m => m.PostsList) 
    },

    { 
      path: 'posts/:id', 
      loadComponent: () =>
       import('./pages/post-detail/post-detail')
       .then(m => m.PostDetail) 
    },

    {
      path: 'users',
      loadComponent: () =>
        import('./pages/users/users')
          .then(m => m.Users)
    },

];
 