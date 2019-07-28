import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import About from './views/About.vue'
import TripEdit from './views/TripEdit.vue'
import TripDetails from './views/TripDetails.vue'
import Signup from './views/Signup.vue'
import UserAccount from './views/UserAccount.vue'
import UserProfile from './views/UserProfile.vue'
import AllTrips from './views/AllTrips.vue'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/about',
      name: 'about',
      component: About
    },
    {
      path: '/TripEdit/:id?',
      name: 'TripEdit',
      component: TripEdit
    },
    {
      path: '/TripDetails/:id',
      name: 'TripDetails',
      component: TripDetails
    },
    {
      path: '/UserAccount/:id',
      name: 'UserAccount',
      component: UserAccount
    },
    {
      path: '/UserProfile/:id',
      name: 'UserProfile',
      component: UserProfile
    },
    {
      path: '/Signup',
      name: 'Signup',
      component: Signup
    },
    {
      path: '/AllTrips',
      name: 'AllTrips',
      component: AllTrips
    },
  ]
})
