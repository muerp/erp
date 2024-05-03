<template>
  <mu-dragable class="form-tree" :init-width="200">
    <el-input
      v-model="searchValue"
      size="large"
      placeholder="Please Input"
      prefix-icon="Search"
    />
    <el-tree
        :data="tableStore.trees"
        :props="defaultProps"
        node-key="id"
        :default-expanded-keys="defaultExpandedKeys"
        @node-click="handleNodeClick"
        empty-text="数据为空"
    />
  </mu-dragable>
</template>
<script lang="ts" setup>
import { onMounted, ref } from "vue";
import {fetchTableData, tableStore} from '../useTable';
const defaultProps = {
  children: 'children',
  label: 'label',
}
const searchValue = ref('');
const defaultExpandedKeys = ref<any[]>([]);
onMounted(()=>{
  if (tableStore.trees) {
    defaultExpandedKeys.value = tableStore.trees.map(item => item.id);
  }
})
const handleNodeClick = () => {
    fetchTableData();
}
</script>
<style lang="scss">
.form-tree {
  width: 200px;
  min-height: 100%;
  padding-right: 6px;
}
.el-input__wrapper {
    height: 28px;
    font-size: var(--mu-font-szie);
}
.el-tree__empty-text {
    font-size: var(--mu-font-szie);
}
.el-tree {
    margin-top: 16px;
}
</style>
