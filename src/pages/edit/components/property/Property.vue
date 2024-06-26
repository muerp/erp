<template>
  <div class="flex-1 d-column">
    <div class="pl-1 pt-1">属性</div>
    <div v-if="editorStore.curEditorItem && editorStore.curEditorItem.type === 'search'">
      <el-form :model="form">
        <el-form-item label="名称">
          <el-input
            v-model="editorStore.curEditorItem.data.key"
            placeholder="名称"
          ></el-input>
        </el-form-item>
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
                    <el-input
                      v-model="data.label"
                      placeholder=""
                      class="state-label"
                    ></el-input>
                  </el-form-item>
                  <el-form-item label="状态">
                    <el-input
                      v-model="data.value"
                      placeholder=""
                      class="state-value"
                    ></el-input>
                  </el-form-item>
                  <el-button
                    class="trash-delete"
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
    <div
      class="property-button"
      v-else-if="editorStore.curEditorItem && editorStore.curEditorItem.type === 'button'"
    >
      <el-checkbox
        v-model="item.enabled"
        v-for="item in bts"
        :key="item.type + '-s'"
        @change="onChangeButton(item)"
      >
        <el-button
          :type="ButtonTypeConfig[item.type].type"
          :circle="!ButtonTypeConfig[item.type].label"
          :plain="!!ButtonTypeConfig[item.type].label"
        >
          <svg-icon :icon="ButtonTypeConfig[item.type].icon"></svg-icon>
          <span v-if="ButtonTypeConfig[item.type].label">
            {{ ButtonTypeConfig[item.type].label }}
          </span>
        </el-button>
        <p class="p-text">{{ item.text }}</p>
      </el-checkbox>
    </div>
    <div
      class="property-table flex-1 overflow-auto"
      v-else-if="editorStore.curEditorItem && editorStore.curEditorItem.type === 'table'"
    >
      <el-row class="mt-1 mb-1 ml-2">
        <el-checkbox>多选框</el-checkbox>
      </el-row>
      <mu-tree
        :list="editorStore.tables.headers"
        :disabled-center="true"
        @node-move="onMove($event, editorStore.tables.headers)"
      >
        <template #drag-icon="{ data }">
          <svg-icon v-if="data.type !== 1000" class="drag-icon" icon="drag"></svg-icon>
        </template>
        <template #default="{ data }">
          <svg-icon
            class="tree-arrow"
            :class="{ hidden: !data.children || data.children.length === 0 }"
            icon="arrow-right"
          />
          <el-input class="table-label" v-if="data.type !== 1000" v-model="data.label">
          </el-input>
          <div v-else-if="data.parent" class="w-full">
            <el-form-item label="关键词">
              <el-input v-model="data.parent.key" />
            </el-form-item>
            <el-form-item label="宽度">
              <el-input v-model="data.parent.width" placeholder="自动设置" />
            </el-form-item>
            <el-form-item
              class="w-full d-flex align-top table-menus"
              label="下拉选择"
              v-if="data.parent.type === 1"
            >
              <code-editor
                :value="JSON.stringify(data.parent.menus)"
                lang="json"
                @change="onChangeProperty($event, data.parent, 'menus')"
              >
              </code-editor>
            </el-form-item>
            <el-form-item
              v-else-if="data.parent.type === 6"
              class="table-state w-full d-flex align-top"
              label="状态设置"
            >
              <el-button
                text
                class="menu-add pos-absolute"
                @click="onAddState(data.parent.map)"
              >
                <svg-icon icon="add"></svg-icon>
              </el-button>
              <div
                class="d-flex align-center"
                v-for="(state, idx) in data.parent.map"
                :key="idx + '-' + state.state"
              >
                <el-input
                  v-model="state.state"
                  style="width: 40px"
                  input-style="text-align:center;"
                  @blur="onInputMap(state, data.parent.map, idx)"
                />
                <el-input
                  class="select-state-color"
                  v-model="state.label"
                  :style="{
                    flex: 2,
                    color: state.color,
                    'background-color': state.color + '30',
                  }"
                ></el-input>
                <mu-color-picker
                  :validate-event="true"
                  :predefine="PredefineColors"
                  :model-value="state.color"
                  @active-change="onChangeProperty($event, state, 'color')"
                >
                  <template #default>
                    <div class="d-flex align-center color-select">
                      <el-tag :color="state.color" size="small" />
                      <svg-icon class="min-arrow" icon="arrow-right"></svg-icon>
                    </div>
                  </template>
                </mu-color-picker>
                <el-button link @click="onDeleteMap(data.parent.map, state.state)">
                  <svg-icon icon="trash" />
                </el-button>
              </div>
            </el-form-item>
            <div v-else-if="data.parent.type === 100">
              <el-form-item label="按钮样式">
                <el-button
                  link
                  class="button-type"
                  :class="{
                    active: data.parent.buttonType === 'text',
                  }"
                  @click="onChangeProperty('text', data.parent, 'buttonType')"
                >
                  link
                </el-button>
                <el-button
                  link
                  class="button-type"
                  :class="{
                    active: data.parent.buttonType === 'round',
                  }"
                  @click="onChangeProperty('round', data.parent, 'buttonType')"
                >
                  circle
                </el-button>
                <el-button
                  link
                  class="button-type"
                  :class="{
                    active: data.parent.buttonType === 'plain',
                  }"
                  @click="onChangeProperty('plain', data.parent, 'buttonType')"
                >
                  round
                </el-button>
              </el-form-item>
              <el-form-item class="btn-property">
                <el-checkbox
                  v-for="item in defaultOps"
                  :key="item.type + '-b'"
                  :checked="
                    data.parent.buttons.findIndex((r: any) => r.type === item.type) !== -1
                  "
                  @change="onChangeOps(item)"
                >
                  <el-button
                    :class="{
                      'opa-text': data.parent.buttonType === 'text',
                    }"
                    :type="ButtonTypeConfig[item.type].type"
                    :text="data.parent.buttonType === 'text'"
                    :round="data.parent.buttonType === 'round'"
                    :plain="data.parent.buttonType === 'plain'"
                  >
                    {{ ButtonTypeConfig[item.type].label }}
                  </el-button>
                </el-checkbox>
              </el-form-item>
            </div>
          </div>
        </template>
      </mu-tree>
    </div>
    <div
      v-else-if="
        editorStore.curEditorItem &&
        editorStore.curEditorItem.type === 'table-cell' &&
        editorStore.curEditorItem.data.key !== '_checkbox'
      "
      class="property-table flex-1 overflow-auto"
    >
      <el-form-item label="名称">
        <el-input v-model="editorStore.curEditorItem.data.label" />
      </el-form-item>
      <el-form-item label="关键词">
        <el-input v-model="editorStore.curEditorItem.data.key" />
      </el-form-item>
      <el-form-item label="宽度">
        <el-input v-model="editorStore.curEditorItem.data.width" placeholder="自动设置" />
      </el-form-item>
      <el-form-item
        class="w-full d-flex align-top table-menus"
        label="下拉选择"
        v-if="editorStore.curEditorItem.data.type === 1"
      >
        <code-editor
          :value="JSON.stringify(editorStore.curEditorItem.data.menus)"
          lang="json"
          @change="onChangeProperty($event, editorStore.curEditorItem.data, 'menus')"
        >
        </code-editor>
      </el-form-item>
      <el-form-item
        v-else-if="editorStore.curEditorItem.data.type === 6"
        class="table-state w-full d-flex align-top"
        label="状态设置"
      >
        <el-button
          text
          class="menu-add pos-absolute"
          @click="onAddState(editorStore.curEditorItem.data.map)"
        >
          <svg-icon icon="add"></svg-icon>
        </el-button>
        <div
          class="d-flex align-center"
          v-for="(state, idx) in editorStore.curEditorItem.data.map"
          :key="idx + '-' + state.state"
        >
          <el-input
            v-model="state.state"
            style="width: 40px"
            input-style="text-align:center;"
            @blur="onInputMap(state, editorStore.curEditorItem.data.map, idx)"
          />
          <el-input
            class="select-state-color"
            v-model="state.label"
            :style="{
              flex: 2,
              color: state.color,
              'background-color': state.color + '30',
            }"
          ></el-input>
          <mu-color-picker
            :validate-event="true"
            :predefine="PredefineColors"
            :model-value="state.color"
            @active-change="onChangeProperty($event, state, 'color')"
          >
            <template #default>
              <div class="d-flex align-center color-select">
                <el-tag :color="state.color" size="small" />
                <svg-icon class="min-arrow" icon="arrow-right"></svg-icon>
              </div>
            </template>
          </mu-color-picker>
          <el-button
            link
            @click="onDeleteMap(editorStore.curEditorItem.data.map, state.state)"
          >
            <svg-icon icon="trash" />
          </el-button>
        </div>
      </el-form-item>
      <div v-else-if="editorStore.curEditorItem.data.type === 100">
        <el-form-item label="按钮样式">
          <el-button
            link
            class="button-type"
            :class="{ active: editorStore.curEditorItem.data.buttonType === 'text' }"
            @click="
              onChangeProperty('text', editorStore.curEditorItem.data, 'buttonType')
            "
          >
            link
          </el-button>
          <el-button
            link
            class="button-type"
            :class="{ active: editorStore.curEditorItem.data.buttonType === 'round' }"
            @click="
              onChangeProperty('round', editorStore.curEditorItem.data, 'buttonType')
            "
          >
            circle
          </el-button>
          <el-button
            link
            class="button-type"
            :class="{ active: editorStore.curEditorItem.data.buttonType === 'plain' }"
            @click="
              onChangeProperty('plain', editorStore.curEditorItem.data, 'buttonType')
            "
          >
            round
          </el-button>
        </el-form-item>
        <el-form-item class="btn-property">
          <el-checkbox
            v-for="item in defaultOps"
            :key="item.type + '-b'"
            :checked="
              editorStore.curEditorItem.data.buttons.findIndex(
                (r: any) => r.type === item.type
              ) !== -1
            "
            @change="onChangeOps(item)"
          >
            <el-button
              :class="{
                'opa-text': editorStore.curEditorItem.data.buttonType === 'text',
              }"
              :type="ButtonTypeConfig[item.type].type"
              :text="editorStore.curEditorItem.data.buttonType === 'text'"
              :round="editorStore.curEditorItem.data.buttonType === 'round'"
              :plain="editorStore.curEditorItem.data.buttonType === 'plain'"
            >
              {{ ButtonTypeConfig[item.type].label }}
            </el-button>
          </el-checkbox>
        </el-form-item>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ElMessage } from "element-plus";
import { ref, watch } from "vue";
import {
  ButtonTypeConfig,
  SeartFrameType,
  PredefineColors,
  defaultOps,
} from "../../../home/utils";
import { editorStore } from "../editStore";
const bts = ref([
  { type: 1, enabled: true, text: "新建行" },
  { type: 2, enabled: true, text: "修改" },
  { type: 3, enabled: true, text: "多行删除" },
  { type: 4, enabled: true, text: "导入excel，json，txt文件" },
  { type: 5, enabled: true, text: "导出excel" },
  { type: 10, enabled: true, text: "搜索单元格" },
  { type: 11, enabled: true, text: "刷新当前页" },
  { type: 60, enabled: true, text: "列隐藏，由列自动生成" },
]);
const form = ref<any>({});
watch(
  () => editorStore.curEditorItem,
  () => {
    if (editorStore.curEditorItem.type === "button" && editorStore.buttons) {
      editorStore.buttons.forEach((btn: any) => {
        if (btn.type < 10) {
          bts.value[btn.type].enabled = true;
        } else if (btn.type === 10) {
          bts.value[5].enabled = true;
        } else if (btn.type === 11) {
          bts.value[6].enabled = true;
        } else if (btn.type === 60) {
          bts.value[7].enabled = true;
        }
      });
    }
  }
);
const onChangeButton = (item: any) => {
  if (!editorStore.buttons) {
    editorStore.buttons = [];
  }
  const idx = editorStore.buttons.findIndex((t: any) => t.type === item.type);
  if (idx !== -1) {
    editorStore.buttons.splice(idx, 1);
    if (editorStore.buttons.length === 0) {
      editorStore.buttons = undefined;
    }
  } else {
    editorStore.buttons.push({ type: item.type });
    editorStore.buttons.sort((r1: any, r2: any) => (r1.type > r2.type ? 1 : -1));
  }
};

const onMove = ({ sourceIndex, targetIndex, item, position }: any, list: any[]) => {
  if (!item.children || item.children.length === 0) return;
  let idx = targetIndex + (position === "bottom" ? 1 : 0);
  idx -= sourceIndex <= targetIndex ? 1 : 0;
  if (idx === sourceIndex) return;
  list.splice(sourceIndex, 1);
  list.splice(idx, 0, item);
};
const onAdd = (list: any[]) => {
  list.push({
    label: "",
    value: "",
  });
};
const onAddState = (list: any) => {
  const p = Math.max(...Object.keys(list).map(n => ~~n));
  const m = ~~p + 1;
  list[m] = {
    label: "状态",
    color: "#999",
    state: m,
  };
};
const onDeleteMap = (map: any, key: string) => {
  delete map[key];
};
const onInputMap = (v:any, map:any, old:any) => {
  if (v.state === "") return;
  if (map[v.state] && v.state !== old) {
    v.state = old;
    ElMessage({
      message: "状态值必须互不相同",
      type: "error",
      plain: true,
      duration: 2000,
    });
  } else if (v.state && v.state !== old) {
    map[v.state] = map[old];
    delete map[old];
  }
};
const onDelete = (list: any[], index: number) => {
  list.splice(index, 1);
};
const onChangeProperty = (value: any, data: any, key: string) => {
  data[key] = value;
};
const onChangeOps = (item: any) => {
  const idx = editorStore.curEditorItem.data.buttons.findIndex(
    (r:any) => r.type === item.type
  );
  if (idx !== -1) {
    editorStore.curEditorItem.data.buttons.splice(idx, 1);
  } else {
    editorStore.curEditorItem.data.buttons.push(item);
    editorStore.curEditorItem.data.buttons.sort((r1:any, r2:any) => (r1.type > r2.type ? 1 : -1));
  }
};
</script>
<style lang="scss">
.select-state-color {
  .el-input__inner {
    color: currentColor;
  }
  .el-input__wrapper {
    box-shadow: 0 0 0 1px currentColor inset;
  }
  input {
    text-align: center;
  }
}
.min-arrow.svg-icon {
  transform: rotate(90deg);
  width: 16px;
  height: 16px;
  margin-left: 5px;
}
.color-select {
  border: 1px solid #999;
  padding: 0 6px;
  border-radius: var(--el-input-border-radius, var(--el-border-radius-base));
  height: 28px;
  .el-tag--small {
    width: 16px;
    height: 16px;
    border: none;
  }
  .svg-icon {
    width: 12px;
    height: 12px;
  }
}
.color-drop {
  .el-dropdown__list {
    padding: 0 10px 16px;
  }
  .el-dropdown-menu__item {
    padding: 0 6px;
    &:hover {
      background-color: #333;
    }
  }
  .el-dropdown-menu__item.active {
    background-color: #444;
  }
  .drop-label {
    padding: 16px 8px 4px;
    color: #ccc;
    font-size: 12px;
  }
  .color-custom {
    padding: 8px 8px 4px;
    cursor: pointer;
  }
  .svg-icon {
    color: #fff;
  }
}

.table-menus {
  align-items: flex-start;
  margin-right: 0;
  margin-top: 10px !important;
  .el-form-item__content {
    height: 200px;
    position: relative;
  }
  .code-editor,
  .monaco-editor {
    width: 100% !important;
    height: 100% !important;
  }
  .monaco-editor {
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
  }

  .tree-item {
    padding-right: 0;
    .el-button {
      width: 28px;
      margin-left: 4px;
    }
  }
  .el-scrollbar {
    width: 100%;
  }
  .tree-content {
    padding: 3px 0;
  }
  .el-form-item__label {
    padding-right: 8px;
  }
}
.state-color {
  .el-tag--small {
    width: 20px;
  }
}
.color-label {
  margin-left: 10px;
}
.table-state {
  border: 1px solid #1f1f1f;
  padding: 10px 6px;
  border-radius: 4px;
  background-color: #1f1f1f;
  .el-input {
    margin: 2px 2px;
  }
  .el-dropdown {
    height: 28px;
    margin: 2px 2px;
  }
}
.property-table {
  padding: 10px 16px;
  .collapse-expand {
    .tree-item.active,
    .tree-item:hover {
      background-color: transparent;
    }
  }
  .el-form-item {
    margin-left: 0;
    color: #eee;
  }
  .el-input {
    height: 28px;
  }
  .align-top {
    align-items: flex-start;
  }
  .el-form-item__label {
    min-width: 60px;
    text-align: left;
  }
}
.table-label {
  .el-input__inner {
    color: #eee;
  }
}
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
  .tree-content {
    padding-left: 0;
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
  width: 24px;
  height: 24px;
  background-color: #3d3d3d;
  box-shadow: 0 3px 0 rgba(12, 12, 12, 0.03);
  .svg-icon {
    width: 16px;
    height: 16px;
  }
}
.property-button {
  padding: 10px 16px;
  .el-checkbox {
    width: 100%;
    height: auto;
    margin: 6px 0;
  }
  .el-button {
    pointer-events: none;
  }
  .el-checkbox__label {
    margin-left: 10px;
    display: flex;
    align-items: center;
  }
  .p-text {
    margin-left: 6px;
  }
}
.btn-property {
  .el-button {
    pointer-events: none;
    font-size: 13px;
    padding: 8px 15px;
    height: 24px;
  }
  .el-checkbox {
    margin: 10px 1rem;
  }
}
.button-type.is-link {
  padding: 4px 10px;
  &:hover {
    color: #ccc;
  }
  &.active {
    background-color: #3f3f3f;
    color: #ccc;
    &:hover {
      background-color: #2f2f2f;
    }
  }
}
.state-label {
  min-width: 60px;
}
.state-value {
  width: 40px;
  min-width: 40px;
  input {
    text-align: center;
  }
}
.trash-delete {
  padding: 0 6px;
}
</style>
