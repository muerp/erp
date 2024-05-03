<template>
     <div class="flex-1">
      <div class="pl-1 pt-1">属性</div>
      <div
        v-if="editorStore.curEditorItem && editorStore.curEditorItem.type === 'search'"
      >
        <el-form :model="form">
          <el-form-item label="标签">
            <el-input
              v-model="editorStore.curEditorItem.data.label"
              placeholder="搜索标签"
            ></el-input>
          </el-form-item>
          <el-form-item label="宽度">
            <el-slider
              :min="20"
              :max="100"
              v-model="editorStore.curEditorItem.data.width"
              show-input
              size="small"
            />
          </el-form-item>
          <el-form-item
            class="select-menus"
            label="选择菜单"
            v-if="editorStore.curEditorItem.data.type === SeartFrameType.select"
          >
            <mu-dragable class="flex-1 state-list" direction="bottom" :initHeight="200">
              <el-button
                text
                class="menu-add pos-absolute"
                @click="onAdd(editorStore.curEditorItem.data.menus)"
              >
                <svg-icon icon="add"></svg-icon>
              </el-button>
              <el-scrollbar>
                <mu-tree
                  :list="editorStore.curEditorItem.data.menus"
                  :disabled-center="true"
                  @node-move="onMove($event, editorStore.curEditorItem.data.menus)"
                >
                  <template #default="{ data, index }">
                    <el-form-item label="标签">
                      <el-input v-model="data.label" placeholder=""></el-input>
                    </el-form-item>
                    <el-form-item label="状态">
                      <el-input v-model="data.value" placeholder=""></el-input>
                    </el-form-item>
                    <el-button
                      text
                      @click="onDelete(editorStore.curEditorItem.data.menus, index)"
                    >
                      <svg-icon icon="trash"></svg-icon>
                    </el-button>
                  </template>
                  <template #drag-icon>
                    <svg-icon class="drag-icon" icon="drag"></svg-icon>
                  </template>
                </mu-tree>
              </el-scrollbar>
            </mu-dragable>
          </el-form-item>
        </el-form>
      </div>
    </div>
</template>
<script lang="ts" setup>
import { ref, watch } from "vue";
import { SeartFrameType } from "../../../home/utils";
import { editorStore } from "../editStore";

watch(
  () => editorStore.curEditorItem,
  () => {
    console.log("-curEditorItem---", editorStore.curEditorItem);
  }
);
const onMove = ({ sourceIndex, targetIndex, item, position }, list) => {
  list.splice(sourceIndex, 1);
  let idx = targetIndex + (position === "top" ? 0 : 1);
  idx = targetIndex <= sourceIndex ? idx - 1 : idx;
  list.splice(idx, 0, item);
};
const onAdd = (list) => {
  list.push({
    label: "",
    value: "",
  });
};
const onDelete = (list, index) => {
  list.splice(index, 1);
};
</script>
<style lang="scss">
.property-dashboard {
  overflow: auto;
  background-color: #000;
  border-left: 1px solid var(--el-border-color-light);
  .el-input__suffix {
    line-height: 26px;
  }
  .el-form-item {
    margin-top: 10px;
  }
  .el-slider__input {
    width: 90px;
  }
}

.state-list {
  border: 1px solid #999;
  background-color: #464646;
  &.drag-bottom {
    padding-bottom: 0;
  }
}
.select-menus {
  align-items: flex-start;
}
.mu-tree {
  .el-form-item {
    margin-top: 0;
  }
}
.menu-add.is-text {
  z-index: 1;
  left: -40px;
  top: 40px;
  position: absolute;
  width: 32px;
  height: 32px;
  background-color: #3d3d3d;
  box-shadow: 0 3px 0 rgba(12, 12, 12, 0.03);
}
</style>