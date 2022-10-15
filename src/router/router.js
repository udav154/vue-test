import MainPage from '@/pages/MainPage'
import PostsPage from '@/pages/PostsPage'
import PostPage from '@/pages/PostPage'
import PostPageWithStore from '@/pages/PostPageWithStore'
import {createRouter,createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    component: MainPage
  },
  {
    path: '/posts',
    component: PostsPage
  },
  {
    path: '/posts/:id',
    component: PostPage
  },
  {
    path:'/store',
    component: PostPageWithStore
  }
]
const router = createRouter({
  routes,
  history: createWebHashHistory(process.env.BASE_URL),
})

export default router