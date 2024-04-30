import { LoadingState, defaultMenus, testNavs } from './../pages/home/utils/constants';
import { reactive } from 'vue'
import { NavItem } from './interface';


export const store = reactive<{
    loadingState: LoadingState
    navs: NavItem[]
    tabs: NavItem[]
    curNav?: NavItem
    setCurNav: (nav: NavItem) => void
}>({
    loadingState: LoadingState.loading,
    navs: defaultMenus,
    tabs: [{ title: '首页', path: '/' }],
    curNav: undefined,
    setCurNav(nav: any) {
        this.curNav = nav;
    }
})

export const formateNavs = (menus: any[], parent: any, curPath: string) => {
    menus.forEach((menu, idx) => {
        menu.index = (parent ? parent.index + '-' : '') + (idx + 1).toString();
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
            formateNavs(menu.children, menu, curPath);
        }
    })
}

export const fetchNavsList = () => {
    store.loadingState = LoadingState.loading;
    return new Promise(resolve => {
        setTimeout(() => {
            formateNavs(testNavs, undefined, location.pathname);
            store.navs = testNavs;
            const expand: string[] = []
            if (store.curNav) {
                let parent = store.curNav.parent;
                const pIds = []
                while (parent) {
                  const idx = expand.findIndex((index: string) => index === parent.index);
                  if (idx === -1) {
                    pIds.unshift(parent.index);
                  }
                  parent = parent.parent;
                }
                expand.push(...pIds);
              }
              store.loadingState = LoadingState.success;
              resolve(expand);
        }, 500);
    })
}