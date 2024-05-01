import { testButtons, testSearch, testTables, testTree } from '@/pages/home/utils'
import { reactive } from 'vue'

export const editorStore = reactive<{
    searchs?: any[]
    trees?: any[]
    buttons?: any[]
    tables?: { headers: any }
    //
    curEditorItem?: any
}>({
    searchs: testSearch,
    trees: testTree,
    buttons: testButtons,
    tables: testTables,
})

export const updateSearchSort = (source: { item: any; index: any }, target: any) => {
    if (!editorStore.searchs) return;
    const targetIndex = ~~(target.index) + (target.position === 'left' ? 0 : 1);
    const sourceIndex = ~~(source.index);
    if (sourceIndex === targetIndex) return;
    console.log('updateSearchSort--', sourceIndex, targetIndex);

    editorStore.searchs.splice(sourceIndex, 1);
    if (targetIndex >= sourceIndex) {
        editorStore.searchs.splice(targetIndex-1, 0, source.item);
    } else {
        editorStore.searchs.splice(targetIndex, 0, source.item);
    }
}
export const updateSearchProperty = (item: any) => {
    console.log('-updateSearchProperty--', item);
}