<template>
  <el-row class="home-header" justify="space-between" align="center">
    <el-row align="center">
      <el-button link class="ml-1 expand-btn mr-1" @click="onExpand">
        <svg-icon :icon="open ? 'collapsed' : 'collapse'"></svg-icon>
      </el-button>
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }" @click="onNav({ path: '/' })">
          首页
        </el-breadcrumb-item>
        <el-breadcrumb-item
          :key="breadcrumb.path"
          v-for="breadcrumb in breadcrumbs"
          @click="onNav(breadcrumb)"
        >
          {{ breadcrumb.title }}
        </el-breadcrumb-item>
      </el-breadcrumb>
    </el-row>
    <el-row align="center">
      <el-button link class="mr-1">
        <svg-icon icon="search" size="24"></svg-icon>
      </el-button>
      <el-button link class="mr-1">
        <svg-icon icon="github" size="24"></svg-icon>
      </el-button>
      <el-switch v-model="themeSwitch" inline-prompt class="mr-2">
        <template #active-action>
          <svg-icon icon="sun"></svg-icon>
        </template>
        <template #inactive-action>
          <svg-icon icon="moon"></svg-icon>
        </template>
      </el-switch>
      <el-avatar :size="32" icon="User" />
    </el-row>
  </el-row>
</template>
<script lang="ts" setup>
import { defineComponent, onMounted, ref, watch } from "vue";
import { useRouter } from "vue-router";
import { store } from "../../../store/useNavStore";
defineOptions({
  name: "home-header",
});
const props = defineProps({
  isCollapse: { type: Boolean, default: false },
  breadcrumbs: { type: Array, default: [] },
});
const emit = defineEmits(["update:isCollapse"]);
const open = ref(false);
const themeSwitch = ref(false);
const theme = ref("dark");
const router = useRouter();
onMounted(() => {
  open.value = props.isCollapse;
});
watch(
  () => open.value,
  () => {
    emit("update:isCollapse", open.value);
  }
);
const onExpand = () => {
  open.value = !open.value;
};
const onNav = (menu) => {
  if (!menu.path) return;
  store.setCurNav(menu);
  router.push({
    path: menu.path,
  });
};
</script>

<style lang="scss">
.el-button + .el-button {
  margin-left: 0;
}
.home-header {
  height: var(--header-height);
  width: 100%;
  // box-shadow: 0 1px 4px rgb(255, 255, 255, 0.2);
  border-bottom: 1px solid var(--el-border-color-light);
  padding: 0 16px;
  .el-button.is-link {
    color: var(--el-text-color-primary);
  }
  .el-switch__core .el-switch__action {
    background-color: transparent;
  }
  .el-switch {
    .svg-icon {
      color: #eee;
    }
  }
  .el-switch.is-checked {
    .svg-icon {
      color: #fff;
    }
  }
}
</style>
