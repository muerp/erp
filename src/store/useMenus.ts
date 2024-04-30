import { NavItem } from './interface';

import { LoadingState, testMenus } from '@/pages/home/utils';
import { reactive } from 'vue'


export const menuStore = reactive<{
    menus: NavItem[]
    loadingState: LoadingState
}>({
    loadingState: LoadingState.normal,
    menus: [],
})

export const formateMenus = (menus: NavItem[], parent?: NavItem) => {
    menus.forEach((menu) => {
        if (parent) {
            menu.parent = parent;
        }
        if (menu.children) {
            formateMenus(menu.children, menu);
        }
    })
}

export const getAllMenus = () => {
    if (menuStore.loadingState === LoadingState.success || menuStore.loadingState === LoadingState.loading) return;
    menuStore.loadingState = LoadingState.loading;
    return new Promise(resolve => {
        setTimeout(() => {
            formateMenus(testMenus);
            testMenus[0].active = true;
            testMenus[0].expand = true;
            menuStore.menus = testMenus;
            menuStore.loadingState = LoadingState.success;
            resolve([]);
        }, 500);
    })
}