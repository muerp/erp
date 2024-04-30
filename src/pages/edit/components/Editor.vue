<template>
  <div class="page w-full h-full">
    <el-row type="flex" style="height: 100%">
      <mu-dragable init-width="200" style="border-right: 1px solid #999" :min-width="160">
        <el-row align="cneter" draggable="true" justify="center" class="mt-1 mb-1">
          <el-text size="large" align="center">我的菜单</el-text>
        </el-row>
        <el-scrollbar>
          <mu-tree class="erp-loading"
            :list="menuStore.menus"
            v-loading="menuStore.loadingState === LoadingState.loading"
            element-loading-text="加载中..."
            element-loading-background="rgba(0, 0, 0, 0.3)"
            v-model="activeItem"
          >
            <template #default="{ data }">
              <div class="d-flex align-center left-inner">
                <svg-icon
                  v-if="data.children && data.children.length > 0"
                  class="tree-arrow"
                  icon="arrow-right"
                />
                <div class="d-center tree-dot" v-else></div>
                <svg-icon class="nav-icon" v-if="data.icon" :icon="data.icon"></svg-icon>
                <span :class="{ 'tree-empty': !data.title }">{{
                  data.title || "菜单名称"
                }}</span>
              </div>
            </template>
          </mu-tree>
        </el-scrollbar>
      </mu-dragable>
      <div class="flex-1"></div>
    </el-row>
  </div>
</template>
<script lang="ts" setup>
import { defineComponent, onMounted, ref } from "vue";
import { menuStore, getAllMenus } from "../../../store";
import { LoadingState } from "../../home/utils";
import MuTree from "./Tree.vue";
const activeItem = ref();
defineComponent({
  components: {
    MuTree,
  },
});
onMounted(() => {
  getAllMenus();
});
const onChangeItem = (item) => {
  
}
</script>

<style lang="scss">
.editor-header {
  height: 64px;
  border-bottom: 1px solid #999;
}
.tree-inner {
  .tree-empty {
    color: #999;
  }
  .nav-icon {
    margin: 0 4px 0 6px;
  }
}
.tree-arrow.svg-icon {
  width: 20px;
  height: 20px;
  transition: all 0.25s;
  padding: 3px;
  color: #999;
}
.tree-item.expand .tree-arrow {
  transform: rotate(90deg);
}
.tree-dot {
  width: 20px;
  height: 20px;
  &::after {
    content: "";
    width: 6px;
    height: 6px;
    background-color: #999;
    border-radius: 3px;
  }
}
.tree-item.active {
  background-color: #2f2f2f;
}
.erp-loading {
  .el-loading-spinner .circular {
    --el-loading-spinner-size: 32px
  }
}
</style>
