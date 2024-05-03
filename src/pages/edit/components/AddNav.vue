<template>
  <mu-dragable class="add-tree" :init-width="200" :min-width="120">
    <el-tree
      :data="editorStore.trees"
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
import { editorStore } from "./editStore";
const defaultProps = {
  children: "children",
  label: "label",
};
const defaultExpandedKeys = ref([]);
onMounted(()=>{
  if (editorStore.trees) {
    defaultExpandedKeys.value = editorStore.trees.map((item: any) => item.id);
  }
})
const handleNodeClick = () => {

}
</script>
<style lang="scss">
.add-tree {
  min-height: 100%;
  padding-right: 6px;
  padding: 30px 10px 0;
}
</style>
