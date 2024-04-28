// store.js

import { reactive } from 'vue'

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