import Vue from 'vue'
import VueRouter from 'vue-router';

import Homepage from './components/Homepage'
import ContactUs from './components/ContactUs'


Vue.use(VueRouter)

const routes = [
    {
        path:'/',
        name:"/",
        component: Homepage
    },
    {
        path:'/contact-us',
        name:"/contact-us",
        component: ContactUs
    }
];

export default new VueRouter({mode: 'history', routes})