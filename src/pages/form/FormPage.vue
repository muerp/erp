<template>
  <div class="page w-full h-full" 
        v-loading="loading"
        element-loading-text="加载中..."
        element-loading-background="rgba(0, 0, 0, 0.3)"
    >
    <el-row type="flex" class="no-wrap min-h-full">
      <form-tree v-if="tableStore.trees"></form-tree>
      <div class="flex-1 overflow-hidden d-column">
        <form-search v-if="tableStore.searchs"></form-search>
        <form-buttons v-if="tableStore.buttons"></form-buttons>
        <form-table v-if="tableStore.tables"></form-table>
      </div>
    </el-row>
  </div>
</template>
<script lang="ts" setup>
import { defineComponent, onMounted, ref } from "vue";
import { testButtons, testSearch, testTables, testTree } from "../home/utils/constants";
import FormSearch from "./components/FormSearch.vue";
import FormButtons from "./components/FormButtons.vue";
import FormTable from "./components/FormTable.vue";
import FormTree from "./components/FormTree.vue";
import {tableStore} from './useTable';
defineComponent({
  components: {
    FormSearch,
    FormButtons,
    FormTable,
    FormTree,
  },
});
const loading = ref(true);
onMounted(() => {
    setTimeout(() => {
        tableStore.searchs = testSearch;
        tableStore.trees = testTree;
        tableStore.buttons = testButtons;
        tableStore.tables = testTables;
        loading.value = false;
    }, 500);

});
</script>

<style lang="scss"></style>
