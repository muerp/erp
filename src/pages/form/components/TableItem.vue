<template>
  <el-select
    v-if="header.type === HeaderType.select"
    v-model="data[header.key]"
    placeholder=""
  >
    <el-option
      v-for="item in header.menus"
      :label="item.label"
      :value="item.value"
    ></el-option>
  </el-select>
  <span v-else-if="header.type === HeaderType.text">
    {{ data[header.key] }}
  </span>
  <el-switch
    v-else-if="header.type === HeaderType.switch"
    v-model="data[header.key]"
  ></el-switch>
  <span
    v-else-if="header.type === HeaderType.time"
    class="d-flex align-center table-icon"
  >
    <svg-icon icon="clock"></svg-icon
    >{{ moment(new Date(data[header.key])).format("YYYY-MM-DD HH:mm:ss") }}
  </span>
  <table-icon v-else-if="header.type === HeaderType.icon" :src="data[header.key].icon" :color="data[header.key].color">
  </table-icon>
  <div
    v-else-if="header.type === HeaderType.state && header.map[data[header.key]]"
    class="state-tag"
    :style="{
      'color':StateColors[header.map[data[header.key]].type].value,
      'background-color': StateColors[header.map[data[header.key]].type].value+'30'
    }"
    :disable-transitions="true"
  >
    {{ header.map[data[header.key]].label }}
  </div>
  <div class="table-opas w-full" v-else-if="header.type === HeaderType.opa">
    <el-button
      :class="{ 'opa-text': config.buttonType === 'text' }"
      v-for="item in header.buttons"
      :type="ButtonTypeConfig[item.type].type"
      :text="config.buttonType === 'text'"
      :round="config.buttonType === 'round'"
      :plain="config.buttonType === 'plain'"
    >
      {{ ButtonTypeConfig[item.type].label }}
    </el-button>
  </div>
</template>
<script lang="ts" setup>
import { defineComponent } from "vue";
import { HeaderType, ButtonTypeConfig, StateColors } from "../../home/utils/constants";
import TableIcon from "./TableIcon.vue";
import moment from "moment";
defineProps({
  data: { type: Object, require: true, default: {} },
  header: { type: Object, require: true, default: {} },
  config: { type: Object, require: true, default: {} },
});
defineComponent({
  components: {
    TableIcon,
  },
});
</script>
<style lang="scss">
.state-tag {
  border: 1px solid currentColor;
  display: inline-block;
  padding: 0 1rem;
  border-radius: 0.4rem;
  font-size: var(--mu-font-szie);
}
.el-select {
  min-width: 80px;
}
.table-icon {
  text-align: left;
  .svg-icon {
    min-width: 18px;
    display: inline-block;
    width: 18px;
    height: 18px;
    margin: 0 5px 0 0;
  }
}
.table-opas {
  .el-button {
    height: 24px;
    font-size: var(--mu-font-szie);
    margin: 0 3px;
  }
}
.opa-text {
  margin: 0;
  text-decoration: underline;
  padding: 3px 4px;
  &:hover {
    opacity: 0.7;
  }
  &.is-text:not(.is-disabled):active {
    background-color: transparent;
    color: #fff;
  }
}
</style>
