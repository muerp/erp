<template>
  <div
    class="flex-1 editor-inner d-column overflow-hidden"
  >
    <el-row class="editor-header align-center" justify="space-between">
      <el-row class="align-center">
        <sidebar-icon
          v-model="showLeft"
          class="mr-2 ml-1"
          @update:model-value="handleSidebar"
        />
      </el-row>
      <el-row align="middle">
        <el-button link @click="onFull">
          <svg-icon :icon="isFullscreen ? 'no-full' : 'full'"></svg-icon>
        </el-button>
        <sidebar-icon v-model="showRight" direction="right" class="mr-2 ml-1" />
      </el-row>
    </el-row>
    <el-row class="no-wrap h-full flex-1 overflow-hidden">
      <el-row class="no-wrap w-full h-full flex-1 overflow-hidden pos-relative">
        <el-row class="table-scroll overflow-auto w-full h-full">
          <el-row class="w-full">
            <add-nav v-if="elementInfo.tree"></add-nav>
            <div class="flex-1 overflow-hidden d-column pt-1 pl-1 pr-1">
              <add-search v-if="elementInfo.search"></add-search>
              <add-buttons v-if="elementInfo.button"></add-buttons>
              <add-table v-if="elementInfo.table"></add-table>
            </div>
          </el-row>
        </el-row>
      </el-row>
      <property-dashboard
        :style="{ display: showRight ? 'flex' : 'none' }"
      ></property-dashboard>
    </el-row>
  </div>
</template>
<script lang="ts" , setup>
import { defineComponent, provide, ref } from "vue";
import AddButtons from "./AddButtons.vue";
import AddSearch from "./AddSearch.vue";
import AddTable from "./AddTable.vue";
import AddNav from "./AddNav.vue";
import PropertyDashboard from "./property/PropertyDashboard.vue";
import SidebarIcon from "./SidebarIcon.vue";

defineComponent({
  components: {
    AddButtons,
    AddSearch,
    AddNav,
    AddTable,
    PropertyDashboard,
    SidebarIcon,
  },
});
const props = defineProps({
  isFullscreen: { type: Boolean, default: false },
});
const emit = defineEmits(["change-sidebar", 'update:isFullscreen']);
const onFull = () => {
  emit('update:isFullscreen', !props.isFullscreen)
}
const elementInfo = ref({
  tree: false,
  search: true,
  button: true,
  table: true,
});
provide("elementInfo", elementInfo);
const showLeft = ref(true);
const showRight = ref(true);

const handleSidebar = () => {
  emit("change-sidebar", showLeft.value);
};
</script>
<style lang="scss">
.editor-inner {
  position: relative;
  .el-scrollbar__view {
    min-height: 100%;
  }
}
.editor-header {
  height: 32px;
  border-bottom: 1px solid #999;
  padding: 0 10px;
  .el-checkbox {
    margin-right: 10px;
  }
}
.module-button {
  margin-left: 10px;
  // position: absolute;
  // left: 10px;
  // top: 0;
}
.table-scroll {
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
}
.full-screen {
  position: fixed;
  background-color: #181818;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 9;
}
</style>
