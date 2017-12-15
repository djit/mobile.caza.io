import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import SearchForm from '@/components/SearchForm'
import PropertyList from '@/components/PropertyList'
import PropertyDetails from '@/components/PropertyDetails'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/search',
      name: 'search',
      component: SearchForm,
    },
    {
      path: '/properties',
      name: 'properties',
      component: PropertyList,
    },
    {
      path: '/properties/:id',
      name: 'property',
      component: PropertyDetails,
    }
  ]
})
