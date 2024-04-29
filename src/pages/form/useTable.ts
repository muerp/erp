// store.js

import { reactive } from 'vue'
import { LoadingState } from '../home/utils';

export const tableStore = reactive({
    isLoading: true,
    // 查
    trees: undefined,
    // 查
    searchs: undefined,
    // 增、删、改
    buttons: undefined,
    //tables
    tables: undefined
})

export const tableDataStore = reactive<{ 
    datas: any[], 
    loadingState: LoadingState,
    curPage: number,
    pageSize: number,
    totalPage: number
}>({
    loadingState: LoadingState.success,
    datas: [],
    curPage: 1,
    pageSize: 20,
    totalPage: 1000
});

export const fetchTableData = () => {
    if (tableDataStore.loadingState === LoadingState.loading) return;
    tableDataStore.loadingState = LoadingState.loading;
    setTimeout(() => {
        tableDataStore.datas = [
            {
                key1: 1,
                key2: "显示文本",
                key3: false,
                key4: Date.now(),
                key5: {
                    icon: "tab",
                    color: 'red'
                },
                key6: 1,
                key7: "",
                key100: "",
            },
        ];
        tableDataStore.loadingState = LoadingState.success;
    }, 500);
}