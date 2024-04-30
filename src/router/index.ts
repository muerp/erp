import { getToken } from '../pages/auth/auth';
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
    // {
    //     name: 'EditorPage',
    //     path: '/edit',
    //     noAuth: true,
    //     meta: {
    //         title: '编辑页面',
    //     },
    //     component: () => import('../pages/edit/EditorPage.vue')
    // },
    {
        name: 'LoginPage',
        path: '/login',
        noAuth: true,
        meta: {
            title: '登陆',
        },
        component: () => import('../pages/auth/LoginPage.vue')
    },
    {
        name: 'HomePage',
        path: '/',
        meta: {
            title: '首页',
        },
        component: () => import('../pages/home/HomePage.vue'),
        children: [
            {
                name: 'IndexPage',
                path: '',
                meta: {
                    title: '首页',
                },
                component: () => import('../pages/home/IndexPage.vue'),
            },
            {
                name: 'FormPage',
                path: '/:nav/:p?',
                meta: {
                    title: '首页',
                },
                component: () => import('../pages/form/FormPage.vue'),
            },
            {
                name: 'EditorPage',
                path: '/edit',
                noAuth: true,
                meta: {
                    title: '菜单管理',
                },
                component: () => import('../pages/edit/EditorPage.vue')
            },
        ]
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
})

router.beforeEach((to: any, _, next) => {
    /* 路由发生变化修改页面title */

    // if (to.meta.title) {
    //     window.document.title = to.meta.title
    // }
    if (to.noAuth) {
        next();
        return;
    }
    const token = getToken();
    if (token) {
        if (to.name !== 'LoginPage') {
            next();
        } else {
            next({ path: '/' })
        }

    } else {
        if (to.name === 'LoginPage') {
            next();
        } else {
            next({ path: '/login' })
        }
    }

})
export default router
