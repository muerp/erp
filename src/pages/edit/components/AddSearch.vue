<template>
  <el-row class="add-search">
    <el-form :model="form">
      <el-row>
        <drag-frame
          :key="item.key"
          :item="item"
          v-model:active-item="targetItem"
          :index="idx.toString()"
          v-model:width="item.width"
          :class="{ active: item.active }"
          :check-frame="item.type < 99"
          v-for="(item, idx) in editorStore.searchs"
          @click="onSelect($event, item)"
          @drag-end="onDragEnd"
          @change-width="onUpdateWidth(item)"
        >
          <el-form-item :label="item.label">
            <el-input
              :readonly="true"
              v-if="item.type === 1"
              :placeholder="'请输入' + item.label"
            />
            <el-select v-else-if="item.type === 2" :placeholder="item.placeholder">
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
              type="date"
              placeholder="选择日期"
              clearable
            />
            <el-date-picker
              v-else-if="item.type === 4"
              :disabled="true"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            />
            <el-button class="search-btn" v-else-if="item.type === 99" type="primary">
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
        </drag-frame>
        <el-dropdown class="adf-c" trigger="click" placement="bottom-end">
          <el-button class="as-add" type="primary" circle>
            <svg-icon icon="add"></svg-icon>
          </el-button>
          <template #dropdown>
            <el-dropdown-item @click="onAdd(1)"> 输入 </el-dropdown-item>
            <el-dropdown-item @click="onAdd(2)"> 选择 </el-dropdown-item>
            <el-dropdown-item @click="onAdd(3)"> 日期 </el-dropdown-item>
            <el-dropdown-item @click="onAdd(4)"> 日期范围 </el-dropdown-item>
          </template>
        </el-dropdown>
      </el-row>
    </el-form>
  </el-row>
</template>
<script lang="ts" setup>
import { defineComponent, provide, ref, watch } from "vue";
import { editorStore, updateSearchProperty, updateSearchSort } from "./editStore";
import DragFrame from "./DragFrame.vue";
defineComponent({
  components: {
    DragFrame,
  },
});
const form = ref([]);
const fromList = ref({});
provide("fromList", fromList);
const targetItem = ref();
watch(
  () => editorStore.searchs,
  () => {
    form.value = editorStore.searchs.map(() => "");
  }
);
const onAdd = (tag: number) => {
  if (tag === 1) {
    editorStore.searchs.unshift({
      type: 1,
      label: "标签",
      width: 30,
      key: "params" + editorStore.searchs.length,
    });
  } else if (tag === 2) {
    editorStore.searchs.unshift({
      type: 2,
      label: "选择",
      placeholder: "请选择",
      width: 30,
      menus: [
        { value: 2, label: "正常" },
        { value: 1, label: "停用" },
      ],
      key: "params" + editorStore.searchs.length,
    });
  } else if (tag === 3) {
    editorStore.searchs.unshift({
      type: 3,
      label: "时间",
      width: 30,
      key: "params" + editorStore.searchs.length,
    });
  } else if (tag === 4) {
    editorStore.searchs.unshift({
      type: 4,
      label: "日期范围",
      width: 40,
      key: "params" + editorStore.searchs.length,
    });
  }
};
const onSelect = (_: any, item: any) => {
  if (item.type >= 99) return;
  if (editorStore.curEditorItem && editorStore.curEditorItem.data) {
    editorStore.curEditorItem.data.active = false;
  }
  editorStore.curEditorItem = { data: item, type: "search" };
  editorStore.curEditorItem.data.active = true;
};
const onDragEnd = (e: any) => {
  if (e && targetItem.value) {
    updateSearchSort(e, targetItem.value);
  }
};
const onUpdateWidth = (item: any) => {
  updateSearchProperty(item);
};
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
    font-size: var(--mu-font-szie);
    height: 26px;
  }
}
.el-form-item__label {
  height: 28px;
  line-height: 28px;
  font-size: var(--mu-font-szie);
}
.el-form-item__content {
  line-height: 28px;
}
.el-select__wrapper {
  min-height: 28px;
  font-size: var(--mu-font-szie);
}
.add-search {
  .el-select {
    // min-width: 180px;
    min-width: 0;
  }
}

.el-date-editor.el-input,
.el-date-editor.el-input__wrapper {
  height: 28px;
}
.search-btn {
  height: 28px;
  font-size: var(--mu-font-szie);
  color: #eee;
  .svg-icon {
    width: 15px;
    margin-right: 4px;
  }
}
.el-date-editor .el-range-input,
.el-date-editor .el-range-separator {
  font-size: var(--mu-font-szie);
}
.add-search {
  * {
    user-select: none;
  }
  .el-form-item {
    margin: 0;
    padding: 4px 10px;
    cursor: move;
    .el-input,
    .el-date-editor,
    .el-input.is-disabled .el-input__wrapper {
      pointer-events: none;
    }
    .el-range-editor.is-disabled input {
      background-color: transparent;
      pointer-events: none;
    }
    label {
      pointer-events: none;
    }
  }
  .el-form-item__label {
    cursor: move;
    user-select: none;
  }
  .el-button {
    pointer-events: none;
  }
  .el-date-editor.el-input,
  .el-date-editor.el-input__wrapper {
    width: 100%;
  }
  .adf-c {
    position: absolute;
    right: 0;
    top: 0;
  }
  .as-add {
    width: 28px;
    height: 28px;
    pointer-events: auto;
    // display: none;
    .svg-icon {
      width: 20px;
      height: 20px;
    }
  }
  &:hover {
    .as-add {
      display: flex;
    }
  }
}
</style>
