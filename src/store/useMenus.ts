import { NavItem } from './interface';

import { LoadingState, testMenus } from '@/pages/home/utils';
import { uuid } from '@/utils';
import { reactive } from 'vue'


export const menuStore = reactive<{
    menus: NavItem[]
    loadingState: LoadingState
}>({
    loadingState: LoadingState.normal,
    menus: [],
})

export const formateMenus = (menus: NavItem[], parent?: NavItem) => {
    menus.forEach((menu, idx) => {
        menu.index = (parent ? parent.index + '-' : '') + idx.toString();
        menu.id = uuid();
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

export const moveMenu = ({ item, parent, position }: { item: NavItem, parent: NavItem, position: string }) => {
    if (item.parent && item.parent.children) {
        const idx = item.parent.children.findIndex((r: { id: any; }) => r.id === item.id);
        if (idx !== -1) {
            item.parent.children.splice(idx, 1);
        }
    } else {
        const idx = menuStore.menus.findIndex(r => r.id === item.id);
        if (idx !== -1) {
            menuStore.menus.splice(idx, 1);
        }
    }
    if (position === 'center') {
        parent.expand = true;
        item.parent = parent;
        if (!parent.children) {
            parent.children = [];
        }
        parent.children?.push(item);
    } else {
        if (parent.parent) {
            const idx = parent.parent.children.findIndex((r: { id: any; }) => r.id === parent.id) + (position === 'top' ? 0 : 1);
            item.parent = parent.parent;
            parent.parent.children.splice(idx, 0, item);
        } else {
            const idx = menuStore.menus.findIndex(r => r.id === parent.id) + (position === 'top' ? 0 : 1);
            item.parent = parent.parent;
            menuStore.menus.splice(idx, 0, item);
        }
    }
}