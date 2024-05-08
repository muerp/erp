<template>
  <el-row
    class="add-buttons"
    :class="{
      active: editorStore.curEditorItem && editorStore.curEditorItem.type === 'button',
    }"
    v-if="editorStore.buttons"
    @click="onTap"
  >
    <div v-for="(item, idx) in editorStore.buttons" :key="idx">
      <el-tooltip
        v-if="item.type < 60"
        :content="ButtonTypeConfig[item.type].tip"
        :disabled="!ButtonTypeConfig[item.type].tip"
      >
        <el-button
          :type="ButtonTypeConfig[item.type].type"
          :circle="!ButtonTypeConfig[item.type].label"
          :plain="!!ButtonTypeConfig[item.type].label"
          @click="onClick(item)"
        >
          <svg-icon :icon="ButtonTypeConfig[item.type].icon"></svg-icon>
          <span v-if="ButtonTypeConfig[item.type].label">
            {{ ButtonTypeConfig[item.type].label }}
          </span>
        </el-button>
      </el-tooltip>
      <el-dropdown
        v-else
        ref="dropdown"
        :hide-on-click="false"
        trigger="click"
        style="margin-right: 30px"
      >
        <el-button
          :type="ButtonTypeConfig[item.type].type"
          :circle="!ButtonTypeConfig[item.type].label"
          :plain="!!ButtonTypeConfig[item.type].label"
          @click="onClick(item)"
        >
          <svg-icon :icon="ButtonTypeConfig[item.type].icon"></svg-icon>
          <span v-if="ButtonTypeConfig[item.type].label">
            {{ ButtonTypeConfig[item.type].label }}
          </span>
        </el-button>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item
              v-for="(menu, idx) in editorStore.tables.headers"
              :key="idx"
              @click="onMenu(menu)"
            >
              <el-checkbox :checked="!menu.disabled" :label="menu.label"></el-checkbox>
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </el-row>
  <table-create-row v-model="addVisible"></table-create-row>
</template>
<script lang="ts" setup>
import { defineComponent, ref } from "vue";
import { ButtonType, ButtonTypeConfig } from "../../home/utils/constants";
import { editorStore } from "./editStore";
import TableCreateRow from "../../form/components/TableCreateRow.vue";
defineComponent({
  components: {
    TableCreateRow,
  },
});
const dropdown = ref();
const addVisible = ref(false);
const onTap = () => {
  if (editorStore.curEditorItem && editorStore.curEditorItem.data) {
    editorStore.curEditorItem.data.active = false;
  }
  editorStore.curEditorItem = {
    type: "button",
  };
};
const onClick = (item: any) => {
  if (item.type >= 60) {
    dropdown.value[0].handleOpen();
  } else if (item.type === ButtonType.add) {
    addVisible.value = true;
  }
};
const onMenu = (item: any) => {
  item.disabled = !item.disabled;
};
</script>
<style lang="scss">
.add-buttons {
  border: 1px solid transparent;
  border-top-color: #666;
  padding: 26px 0 0;
  cursor: pointer;
  &.active {
    border-color: #27ae4b;
  }
  .el-button {
    margin: 4px 6px;
    height: 28px;
    font-size: var(--mu-font-szie);
    .svg-icon {
      height: 14px;
    }
    &.is-circle {
      width: 28px;
    }
  }
  .el-button + .el-button {
    margin-left: 12px;
  }
  .el-dropdown-menu__item {
    padding: 0 10px;
  }
}
.el-popper.is-dark,
.el-popper.is-dark .el-popper__arrow:before {
  background: #1f1f1f;
  border-color: #636363;
  color: #ccc;
}
</style>
