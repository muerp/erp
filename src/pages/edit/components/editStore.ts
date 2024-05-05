import { testButtons, testSearch, testTables, testTree } from '@/pages/home/utils'
import { reactive } from 'vue'


export const formatHeaders = (items: any[]) => {
    return items.map(item => {
        const n = {...item};
        n.children = [{type: 1000, parent: n}];
        if (n.type === 6) {
            for (const state in n.map) {
                n.map[state].state = state;
            }
        }
        return n;
    })
}
const tempHeaders = {...testTables};
tempHeaders.headers = formatHeaders(tempHeaders.headers);
export const editorStore: any = reactive<{
    searchs?: any[]
    trees?: any[]
    buttons?: any[]
    tables?: { headers: any[], [key:string]: any }
    curEditorItem?: any
    rows?: any[]
}>({
    searchs: testSearch,
    trees: testTree,
    buttons: testButtons,
    tables: tempHeaders,
    rows: [
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
        }
    ]
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