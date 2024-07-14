<template>
  <div class="page w-full h-full" :class="{ 'full-screen': isFullscreen }">
    <el-row type="flex" class="w-full no-wrap overflow-hidden" style="height: 100%">
      <mu-dragable
        :init-width="200"
        style="border-right: 1px solid #999"
        :min-width="160"
        v-show="showLeft"
      >
        <el-row align="middle" draggable="true" justify="center" class="mt-1 mb-1">
          <el-text size="small" align="center">我的菜单</el-text>
        </el-row>
        <el-scrollbar>
          <mu-tree
            class-name="erp-loading small-tree"
            :list="menuStore.menus"
            v-loading="menuStore.loadingState === LoadingState.loading"
            element-loading-text="加载中..."
            element-loading-background="rgba(0, 0, 0, 0.3)"
            v-model="activeItem"
            @node-move="onMoveNode"
          >
            <template #default="{ data }">
              <svg-icon
                v-if="data.children && data.children.length > 0"
                class="tree-arrow"
                icon="arrow-right"
              />
              <div class="d-center tree-dot" v-else></div>
              <svg-icon class="nav-icon" v-if="data.icon" :icon="data.icon"></svg-icon>
              <span :class="{ 'tree-empty': !data.title }">
                {{ data.title || "菜单名称" }}
              </span>
            </template>
            <template #drag-icon>
              <svg-icon class="drag-icon" icon="drag"></svg-icon>
            </template>
          </mu-tree>
        </el-scrollbar>
      </mu-dragable>
      <editor-content v-model:is-fullscreen="isFullscreen" @change-sidebar="onSidebar" />
    </el-row>
  </div>
</template>
<script lang="ts" setup>
import { defineComponent, onMounted, ref } from "vue";
import { menuStore, getAllMenus, moveMenu } from "../../../store";
import { LoadingState } from "../../home/utils";
import EditorContent from "./EditorContent.vue";
const activeItem = ref();
const showLeft = ref(true);
const isFullscreen = ref(false);
defineComponent({
  components: {
    EditorContent,
  },
});
onMounted(() => {
  getAllMenus();
});
const onMoveNode = (data: any) => {
  moveMenu(data);
};
const onSidebar = (show: any) => {
  showLeft.value = show;
};
</script>

<style lang="scss">
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
    --el-loading-spinner-size: 32px;
  }
}
.small-tree {
  font-size: 13px;
  .svg-icon {
    width: 16px;
    height: 16px;
  }
}
</style>
