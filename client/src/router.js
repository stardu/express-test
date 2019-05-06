import Vue from 'vue'
import Router from 'vue-router'
import login from './views/login.vue'
import register from './views/register'
import home from './views/home'
import form from './views/form'

Vue.use(Router)

export default new Router({
    mode: 'hash',
    base: process.env.BASE_URL,
    routes: [{
            path: '/',
            name: 'login',
            component: login
        },
        {
            path: '/register',
            name: 'register',
            component: register
        },
        {
            path: '/home',
            name: 'home',
            component: home,
            children: [{
                path: '/home/form',
                name: 'form',
                component: form
            }, ]
        },
    ]
})