// store.js
import { defaultMenus } from '@/pages/home/utils'
import { reactive } from 'vue'

export const store = reactive({
  navs: defaultMenus,
  tabs: [{title: '首页', path:'/'}],
  curNav: undefined,
  setCurNav(nav: any) {
    this.curNav = nav;
  }
})

export const formateMenus = (menus: any[], parent: any, curPath: string) => {

    menus.forEach(menu => {
        if (curPath === menu.path) {
            store.setCurNav(menu);
            if (store.tabs.findIndex(r => r.path === menu.path) === -1) {
                store.tabs.push(menu);
            }
        }
        if (parent) {
            menu.parent = parent;
        } 
        if (menu.children) {
            formateMenus(menu.children, menu, curPath);
        }
    })
}