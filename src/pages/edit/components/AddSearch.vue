<template>
  <el-row class="add-search">
    <el-form :model="form">
      <el-row>
        <el-form-item
          v-for="(item, idx) in editorStore.searchs"
          :class="{active: item.active}"
          :key="idx"
          :label="item.label"
          @click="onSelect(item)"
        >
          <el-input
            :readonly="true"
            v-model="form[idx]"
            v-if="item.type === 1"
            :placeholder="item.placeholder"
          />
          <el-select
            v-else-if="item.type === 2"
            v-model="form[idx]"
            :placeholder="item.placeholder"
          >
            <el-option
              v-for="menu in item.menus"
              :key="menu.value"
              :label="menu.label"
              :value="menu.value"
            />
          </el-select>
          <el-date-picker
            :disabled="true"
            v-else-if="item.type === 3"
            v-model="form[idx]"
            type="date"
            placeholder="选择日期"
            clearable
          />
          <el-date-picker
            v-else-if="item.type === 4"
            v-model="form[idx]"
            :disabled="true"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          />
          <el-button
            class="search-btn"
            v-else-if="item.type === 99"
            type="primary"
          >
            <svg-icon icon="search"></svg-icon> 搜索
          </el-button>
          <el-button
            class="search-btn"
            v-else-if="item.type === 100"
            type="primary"
            @click="onReset"
          >
            <svg-icon icon="reset"></svg-icon> 重置
          </el-button>
        </el-form-item>
      </el-row>
    </el-form>
  </el-row>
</template>
<script lang="ts" setup>
import { defineProps, ref, watch } from "vue";
import { SeartFrameType } from "../../home/utils/constants";
import { editorStore } from "./editStore";

const form = ref([]);

watch(
  () => editorStore.searchs,
  () => {
    form.value = editorStore.searchs.map((item) => "");
  }
);
const onSelect = (item) => {
  if (editorStore.curEditorItem) {
    editorStore.curEditorItem.active = false;
  }
  editorStore.curEditorItem = item;
  editorStore.curEditorItem.active = true;
}
const onReset = () => {
  form.value = [];
};
</script>
<style lang="scss">
.el-form-item {
  margin: 4px 10px;
  align-items: center;
  .el-input__inner {
    color: #fff;
    font-size: 12px;
    height: 26px;
  }
}
.el-form-item__label {
  height: 28px;
  font-size: 12px;
}
.el-form-item__content {
  line-height: 28px;
}
.el-select__wrapper {
  min-height: 28px;
  font-size: 12px;
}
.add-search {
  .el-select {
    min-width: 180px;
  }
}

.el-date-editor.el-input,
.el-date-editor.el-input__wrapper {
  height: 28px;
}
.search-btn {
  height: 28px;
  font-size: 12px;
  color: #eee;
  .svg-icon {
    width: 15px;
    margin-right: 4px;
  }
}
.el-date-editor .el-range-input,
.el-date-editor .el-range-separator {
  font-size: 12px;
}
.add-search {
  .el-form-item {
    margin: 0;
    padding: 4px 10px;
    border: 1px solid transparent;
    cursor: move;
    .el-input, .el-date-editor, .el-input.is-disabled .el-input__wrapper {
      pointer-events: none;
    }
    .el-range-editor.is-disabled input {
      background-color: transparent;
      pointer-events: none;
    }
    &.active {
      border: 1px solid var(--mu-theme-color);
    }
  }
  .el-form-item__label {
    cursor: move;
    user-select: none;
  }
}
</style>
