<template>
  <el-sub-menu v-if="menu.children && menu.children.length > 0" :index="index.toString()">
    <template #title>
      <el-icon>
        <svg-icon :icon="menu.icon" :class="{ 'empty-icon': !menu.title }"></svg-icon>
      </el-icon>
      <span class="menu-title" :class="{ empty: !menu.title }">{{ menu.title }}</span>
    </template>
    <mu-menu
      v-for="(child, tdx) in menu.children"
      :key="index + '-' + tdx"
      :menu="child"
      :index="index+'-'+tdx"
      :isActive="route.path === child.path"
    ></mu-menu>
  </el-sub-menu>
  <el-menu-item
    v-else
    :index="index.toString()"
    :class="{ 'empty-menu': !menu.title, 'active':isActive }"
    @click="onNav"
  >
    <template #title>
      <el-icon>
        <svg-icon :icon="menu.icon" :class="{ 'empty-icon': !menu.title }"></svg-icon>
      </el-icon>
      <span class="menu-title" :class="{ empty: !menu.title }">{{ menu.title }} </span>
    </template>
  </el-menu-item>
</template>
<script lang="ts" setup>
import { defineComponent, defineOptions, computed, ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { store } from "../../../store/useNavStore";
defineOptions({
  name: "MuMenu"
});
const props = defineProps({
  menu: { type: Object, require: true },
  index: { type: [Number, String], require: true },
  isActive: {type: Boolean, default: false}
});
const route = useRoute();
const router = useRouter();

const onNav = () => {
  const idx = store.tabs.findIndex((r) => r.path === props.menu.path);
  if (idx === -1) {
    store.tabs.push(props.menu);
  }
  store.setCurNav(props.menu);
  router.push({
    path: props.menu.path,
  });
};
</script>
<style lang="scss">
.empty {
  flex: 1;
  height: 36%;
  border-radius: 4px;
  background-color: var(--el-empty-color);
}
.empty-menu {
  pointer-events: none;
}
.empty-icon {
  color: var(--el-empty-color);
}
.el-menu-item.is-active {
  color: var(--el-menu-text-color);
}
.el-menu-item.active {
  color: var(--el-menu-active-color);
}

</style>
