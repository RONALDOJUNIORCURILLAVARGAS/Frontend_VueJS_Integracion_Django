import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/books',
    name: 'ListBook',
    component: () => import(/* webpackChunkName: "ListBook" */ '../components/Book/ListBook.vue')
  },
  {
    path: '/books/:bookId/edit',
    name: 'Edit-book',
    component: () => import(/* webpackChunkName: "EditBook" */ '../components/Book/EditBook.vue'),
    props:(route)=>{
      return {
        bookId:route.params.bookId
      }
    }
  },
  {
    path: '/books/add',
    name: 'AddBook',
    component: () => import(/* webpackChunkName: "AddBook" */ '../components/Book/AddBook.vue')
  },
]
const mode='history'

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  mode
})

export default router
