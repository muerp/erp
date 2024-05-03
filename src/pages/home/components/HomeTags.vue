<template>
  <div class="home-tags">
    <div class="tags-content">
      <div
        class="tag-item d-center"
        :class="{
          active: route.path === tag.path,
        }"
        v-for="(tag, idx) in store.tabs"
        :key="tag.title"
        @click="onClick($event, tag)"
      >
        {{ tag.title }}
        <el-button link @click="onDelete($event, tag)">
          <svg-icon icon="close" size="14" v-if="idx !== 0"></svg-icon>
        </el-button>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { useRoute, useRouter } from "vue-router";
import { store } from "../../../store/useNavStore";
const route = useRoute();
const router = useRouter();
const onDelete = (e: any, data: any) => {
  e.stopPropagation();
  const idx = store.tabs.findIndex((r) => r.path === data.path);
  if (idx !== -1) {
    store.tabs.splice(idx, 1);
    const newData = store.tabs[idx - 1] || store.tabs[idx];
    if (newData) {
      router.push({
        path: newData.path,
      });
    }
  }
};
const onClick = (e: any, data: any) => {
  e.preventDefault();
  store.setCurNav(data);
  router.push({
    path: data.path,
  });
};
</script>
<style lang="scss">
.home-tags {
  height: var(--tags-height);
  border-bottom: 1px solid var(--el-border-color-light);
  display: flex;
  align-items: center;
  padding: 0 10px;
  overflow: auto;
  width: 100%;
}
.tags-content {
  display: flex;
  align-items: center;
}
.tag-item {
  padding: 3px 10px;
  border: 1px solid #999;
  margin: 0 3px;
  border-radius: 4px;
  font-size: 11px;
  cursor: pointer;
  display: flex;
  transition: 0.25s;
  background-color: #000000;
  .el-button {
    overflow: hidden;
    color: #409eff;
    line-height: 0;
    border: none;
    padding: 0;
    margin: 0;
    margin-left: 3px;
    transition: all 0.25s;
    opacity: 0;
    max-width: 0;
  }
  &:hover {
    color: #409eff;
    border-color: #409eff;
    .el-button {
      opacity: 1;
      max-width: 20px;
    }
  }
}
.tag-item.active {
  background-color: #056bd1;
  border-color: #056bd1;
  .el-button {
    opacity: 1;
    max-width: 20px;
    color: #fff;
  }
  &:hover {
    .el-button {
      color: #409eff;
    }
  }
}
</style>
