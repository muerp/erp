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
  <table-icon v-else-if="header.type === HeaderType.icon" :src="data[header.key]">
  </table-icon>
  <el-tag v-else-if="header.type === HeaderType.state" :type="header.map[data[header.key]].type"  :disable-transitions="true">
    {{ header.map[data[header.key]].label }}
  </el-tag>
  <div class="table-opas w-full" v-else-if="header.type === HeaderType.opa">
    <el-button :class="{'opa-text': config.buttonType==='text'}" v-for="item in header.buttons" :type="ButtonTypeConfig[item.type].type" :text="config.buttonType==='text'" :round="config.buttonType==='round'" :plain="config.buttonType==='plain'">
        {{ ButtonTypeConfig[item.type].label }}
    </el-button>
  </div>
</template>
<script lang="ts" setup>
import { defineComponent } from "vue";
import { HeaderType, ButtonTypeConfig } from "../../home/utils/constants";
import TableIcon from "./TableIcon.vue";
import moment from "moment";
defineProps({
  data: { type: Object, require: true },
  header: { type: Object, require: true },
  config: { type: Object, require: true },
});
defineComponent({
  components: {
    TableIcon,
  },
});
</script>
<style lang="scss">
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
        font-size: 12px;
        margin: 0 6px;
    }
    .opa-text {
        margin: 0;
        text-decoration: underline;
        padding: 3px 10px;
        &:hover {
            opacity: 0.7;
        }
        &.is-text:not(.is-disabled):active {
            background-color: transparent;
            color: #fff;
        }
    }
}
</style>
