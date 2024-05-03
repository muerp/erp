<template>
  <el-row class="page index-page" :gutter="16">
    <el-col :span="12">
      <el-card>
        <template #header>
          <el-text class="index-title">
            <img src="../../assets/img/logo.png" alt="" /> 管理系统
          </el-text>
        </template>

        <el-row>
          <el-text>系统陆续更新中... </el-text>
        </el-row>
        <el-row class="mt-2">
          <el-button class="mr-2" type="default" round> github </el-button>
          <el-button type="primary" round> 主页 </el-button>
        </el-row>
      </el-card>
    </el-col>
    <el-col :span="12" style="height: 100%">
      <el-card>
        <template #header>
          <el-text class="index-title"> 技术积累 </el-text>
        </template>
      </el-card>
    </el-col>
    <el-col :span="10" class="mt-2">
      <el-card>
        <template #header>
          <el-text class="index-title"> 更新日志 </el-text>
        </template>
        <div>
          <el-collapse>
            <el-collapse-item
              v-for="(version, idx) in versions"
              :title="'v' + version.version + ' - ' + version.time"
              :name="idx"
              :key="idx"
            >
              <ul>
                <li v-for="describe in version.describes">
                  {{ describe }}
                </li>
              </ul>
            </el-collapse-item>
          </el-collapse>
        </div>
      </el-card>
    </el-col>
    <el-col :span="8" class="mt-2">
      <el-card>
        <template #header>
          <el-text class="index-title"> 联系信息 </el-text>
        </template>
        <div>
          <el-row>
            <el-text size="small">官网：http://test.ccc</el-text>
          </el-row>
          <el-row>
            <el-text size="small"> QQ群： </el-text>
            <el-text
              class="qq-text"
              size="small"
              v-for="(qq, idx) in qqs"
              :key="idx"
              :tag="qq.isFull ? 'Del' : 'span'"
              :class="qq.isFull ? '' : 'qq-no-full'"
              :type="qq.isFull ? '' : 'info'"
              v-clipboard:copy="qq.isFull ? '' : qq.zz"
            >
              {{ qq.zz }}
            </el-text>
          </el-row>
        </div>
      </el-card>
    </el-col>
    <el-col :span="6" class="mt-2">
      <el-card>
        <template #header>
          <el-text class="index-title"> 支持 </el-text>
        </template>
      </el-card>
    </el-col>
  </el-row>
</template>
<script lang="ts" setup>
import { ref } from "vue";
const versions = ref([
  {
    version: "1.0,0",
    time: "2024-04-27",
    describes: ["MU管理系统发布", "MU管理系统发布"],
  },
]);
const qqs = ref([
  {
    zz: "1234567889",
    isFull: true,
  },
  {
    zz: "987654345",
    isFull: false,
  },
]);
</script>
<style lang="scss">
.index-page {
  padding: 2rem;
  min-height: auto;
}
.index-title {
  font-size: 1.6rem;
  color: #777;
  img {
    width: 42px;
  }
}
.el-collapse-item__header,
.el-collapse-item__wrap {
  border-bottom-color: #666;
}
.el-collapse {
  border-top-color: #666;
  border-bottom: none;
}
.el-collapse-item__header {
  color: #ccc;
}
.el-collapse-item__content {
  ul {
    margin: 0;
  }
  li {
    color: #ccc;
  }
}
.qq-text {
  margin: 0 4px;
}
.qq-no-full {
  cursor: pointer;
  transition: color 0.25s;
  &:hover {
    color: var(--mu-theme-color);
  }
}
</style>
