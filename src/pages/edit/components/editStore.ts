import { testButtons, testSearch, testTables, testTree } from '@/pages/home/utils'
import { reactive } from 'vue'

export const editorStore = reactive<{
    searchs?: any[]
    trees?: any[]
    buttons?: any[]
    tables?: { headers: any}
    //
    curEditorItem?: any
    
}>({
    searchs: testSearch,
    trees: testTree,
    buttons: testButtons,
    tables: testTables,
})