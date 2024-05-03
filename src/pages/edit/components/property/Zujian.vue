<template>
  <div class="flex-1 mu-element">
    <div class="pl-1 pt-1">模块</div>
    <div class="pl-1 pt-1">
      <div
        class="zj-item d-flex overflow-hidden mt-2"
        :class="{ active: elementInfo.tree }"
      >
        <el-card class="zj-box" shadow="always" @click="onSelect('tree')">
          <template #header>左侧树</template>
          <span class="zj-box1"></span>
          <span class="zj-box1" style="margin-left: 12px"></span>
          <span class="zj-box1" style="margin-left: 12px"></span>
          <span class="zj-box1"></span>
          <span class="zj-box1" style="margin-left: 12px"></span>
          <span class="zj-box1" style="margin-left: 12px"></span>
        </el-card>
        <div class="flex-1 zj-exp">左侧为树结构，用于过滤，默认显示</div>
      </div>
      <div
        class="zj-item d-flex overflow-hidden mt-2"
        :class="{ active: elementInfo.search }"
      >
        <el-card class="zj-box" shadow="always" @click="onSelect('search')">
          <template #header>搜索模块</template>
          <el-row class="w-full">
            <span class="zj-box1" style="width: 30px"></span>
            <span class="zj-box1" style="margin-left: 6px; width: 30px"></span>
            <span class="zj-box1" style="margin-left: 6px; width: 32px"></span>
            <span class="zj-box1" style="width: 38px"></span>
            <span class="zj-box1" style="margin-left: 6px; width: 60px"></span>
            <span class="zj-box1" style="width: 60px"></span>
            <span class="zj-box1" style="margin-left: 6px; width: 38px"></span>
            <span class="zj-box1" style="width: 20px"></span>
            <span class="zj-box1" style="margin-left: 6px; width: 20px"></span>
            <svg-icon icon="search"></svg-icon>
          </el-row>
        </el-card>
        <div class="flex-1 zj-exp">
          搜索模块，可以自定义搜索类型，搜索参数，拖动可以交换位置，选中后可以设置属性参数。
        </div>
      </div>
      <div
        class="zj-item d-flex overflow-hidden mt-2"
        :class="{ active: elementInfo.button }"
      >
        <el-card class="zj-box" shadow="always" @click="onSelect('button')">
          <template #header>按钮组合</template>
          <el-row class="w-full">
            <span class="zj-box1" style="width: 30px"></span>
            <span class="zj-box1" style="margin-left: 6px; width: 30px"></span>
            <span class="zj-box1" style="margin-left: 6px; width: 32px"></span>
            <span class="zj-box1" style="width: 38px"></span>
            <span class="zj-box1" style="margin-left: 6px; width: 60px"></span>
            <span class="zj-box1" style="width: 60px"></span>
            <span class="zj-box1" style="margin-left: 6px; width: 38px"></span>
            <span class="zj-box1" style="width: 20px"></span>
            <span class="zj-box1" style="margin-left: 6px; width: 20px"></span>
          </el-row>
        </el-card>
        <div class="flex-1 zj-exp">
          用于新增、删除、导入、导出、搜索、刷新、列隐藏等功能、可自行选择添加功能
        </div>
      </div>
      <div
        class="zj-item d-flex overflow-hidden mt-2 active"
      >
        <el-card class="zj-box" shadow="always">
          <template #header>表格</template>
          <el-row class="w-full">
            <span class="zj-box1" style="width: 30px"></span>
            <span class="zj-box1" style="margin-left: 6px; width: 30px"></span>
            <span class="zj-box1" style="margin-left: 6px; width: 32px"></span>
            <span class="zj-box1" style="width: 30px"></span>
            <span class="zj-box1" style="margin-left: 6px; width: 30px"></span>
            <span class="zj-box1" style="margin-left: 6px; width: 32px"></span>
            <span class="zj-box1" style="width: 30px"></span>
            <span class="zj-box1" style="margin-left: 6px; width: 30px"></span>
            <span class="zj-box1" style="margin-left: 6px; width: 32px"></span>
            <span class="zj-box1" style="width: 30px"></span>
            <span class="zj-box1" style="margin-left: 6px; width: 30px"></span>
            <span class="zj-box1" style="margin-left: 6px; width: 32px"></span>
            <span class="zj-box1" style="width: 30px"></span>
            <span class="zj-box1" style="margin-left: 6px; width: 30px"></span>
            <span class="zj-box1" style="margin-left: 6px; width: 32px"></span>
          </el-row>
        </el-card>
        <div class="flex-1 zj-exp">
          表格数据，可自定义表格显示列类型、列操作按钮，自动生成json格式文档，接口根据该数据返回即可
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { inject, ref } from "vue";

const elementInfo = inject('elementInfo');
const onSelect = (key) => {
  elementInfo.value[key] = !elementInfo.value[key];
};
</script>
<style lang="scss">
.zj-box1 {
  display: block;
  height: 12px;
  background-color: #494949;
  border-radius: 4px;
  margin: 3px 0;
}
.mu-element {
  .el-card__header {
    padding: 2px 8px;
    color: #626262;
    pointer-events: none;
  }
  .el-card__body {
    padding: 3px 6px;
    pointer-events: none;
  }
}
.zj-exp {
  padding: 3px 8px;
  text-indent: 28px;
}
.zj-box {
  padding: 0;
  width: 120px;
  cursor: pointer;

  .svg-icon {
    width: 14px;
    margin-left: 6px;
    color: #878787;
  }
}
.zj-item {
  color: #999;
  &.active {
    color: #eee;
    .zj-box {
      border-color: #fff;
      background-color: #000000;
      .el-card__header {
        color: #b3b3b3;
      }
      .zj-box1 {
        background-color: #6b6b6b;
      }
    }
  }
}
</style>
