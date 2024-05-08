<template>
  <mu-dragable
    class="property-dashboard d-flex"
    direction="left"
    :init-width="400"
    :min-width="400"
  >
    <div class="property-nav">
      <el-tooltip content="组件" placement="right">
        <el-button text :class="{ active: curTab === 0 }" @click="onChangeTab(0)">
          <svg-icon icon="buju"></svg-icon>
        </el-button>
      </el-tooltip>
      <el-tooltip content="属性" placement="right">
        <el-button text :class="{ active: curTab === 1 }" @click="onChangeTab(1)">
          <svg-icon icon="props"></svg-icon>
        </el-button>
      </el-tooltip>
      <el-tooltip content="数据" placement="right">
        <el-button text :class="{ active: curTab === 2 }" @click="onChangeTab(2)">
          <svg-icon icon="json"></svg-icon>
        </el-button>
      </el-tooltip>
      <el-tooltip content="代码" placement="right">
        <el-button text :class="{ active: curTab === 3 }" @click="onChangeTab(3)">
          <svg-icon icon="net"></svg-icon>
        </el-button>
      </el-tooltip>
    </div>
    <mu-zujian v-if="curTab === 0"></mu-zujian>
    <mu-property v-if="curTab === 1"> </mu-property>
    
  </mu-dragable>
</template>
<script lang="ts" setup>
import { defineComponent, ref } from "vue";
import MuProperty from "./Property.vue";
import MuZujian from "./Zujian.vue";
import MuJson from "./Json.vue";
import MuMet from "./Net.vue";
defineComponent({
  components: {
    MuProperty,
    MuZujian,
    MuJson,
    MuMet,
  },
});
const curTab = ref(1);
const onChangeTab = (tab: any) => {
  curTab.value = tab;
};
</script>
<style lang="scss">
.property-nav {
  padding: 10px 0;
  width: 54px;
  border-right: 1px solid #333;
  .svg-icon {
    width: 24px;
    height: 24px;
  }
  .el-button {
    height: 40px;
  }
  .active {
    background-color: rgb(48, 48, 48);
    color: #eee;
  }
}
</style>
