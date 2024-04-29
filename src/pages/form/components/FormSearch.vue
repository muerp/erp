<template>
  <el-row class="form-search">
    <el-form :model="form">
      <el-row>
        <el-form-item v-for="(item, idx) in tableStore.searchs" :key="idx" :label="item.label">
          <el-input
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
            v-else-if="item.type === 3"
            v-model="form[idx]"
            type="date"
            placeholder="选择日期"
            clearable
          />
          <el-date-picker
            v-else-if="item.type === 4"
            v-model="form[idx]"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          />
          <el-button
            class="search-btn"
            v-else-if="item.type === 99"
            type="primary"
            @click="onSubmit"
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
import {fetchTableData, tableStore} from '../useTable';

const form = ref([]);

watch(() => tableStore.searchs, ()=>{
  form.value = tableStore.searchs.map((item) => "");
})

const onSubmit = () => {
  const params = {};
  form.value.forEach((v, idx) => {
    if (v) {
      const item = tableStore.searchs[idx];
      if (item.type === SeartFrameType.date) {
        params[item.key] = new Date(v).getTime();
      } else if (item.type === SeartFrameType.dateRange) {
        params[item.key] = [new Date(v[0]).getTime(), new Date(v[1]).getTime()];
      } else {
        params[item.key] = v;
      }
    }
  });
  fetchTableData();
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
.form-search {
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
</style>
