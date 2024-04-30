<template>
  <mu-dragable
    ref="dragable"
    class="home-navbar"
    :class="{
      'drag-collapse': isCollapse,
      loading: store.loadingState === LoadingState.loading,
    }"
    init-width="200"
    :min-width="200"
    :drag-enabled="!isCollapse"
  >
    <el-row class="home-h" align="center" justify="center">
      <transition name="logo" mode="out-in">
        <div class="d-center home-p" v-if="!isCollapse">
          <img class="logo" src="../../../assets/img/logo.png" alt="logo" />
          <el-text class="logo-name" v-if="!isCollapse">管理系统</el-text>
        </div>
        <div class="d-center home-p" v-else>
          <img class="logo" src="../../../assets/img/logo.png" alt="logo" />
        </div>
      </transition>
    </el-row>
    <el-scrollbar class="navbar-list">
      <el-menu
        ref="menuRef"
        :default-openeds="expands"
        :collapse="isCollapse"
        @open="handleOpen"
        @close="handleClose"
      >
        <mu-menu
          v-for="(menu, index) in store.navs"
          :key="index"
          :index="(index + 1).toString()"
          :menu="menu"
        ></mu-menu>
      </el-menu>
    </el-scrollbar>
  </mu-dragable>
</template>
<script lang="ts" setup>
import { defineComponent, nextTick, onMounted, watch } from "vue";
import { ref } from "vue";
import MuMenu from "./Menu.vue";
import { defaultMenus, LoadingState, testMenus } from "../utils/constants";
import { store, formateMenus, fetchNavsList } from "../../../store/useNavStore";
import { useRoute } from "vue-router";
const props = defineProps({
  isCollapse: { type: Boolean, default: false },
});

const emit = defineEmits(["update:isCollapse"]);
defineComponent({
  components: {
    MuMenu,
  },
});
const dragable = ref();
const menuRef = ref();
const expands = ref(["1"]);
const route = useRoute();
onMounted(() => {
  setTimeout(() => {
    fetchNavsList().then((ids) => {
      expands.value = ids;
      ids.forEach((id) => {
        menuRef.value.open(id);
      });
    });
  }, 500);
});
watch(
  () => props.isCollapse,
  () => {
    if (props.isCollapse) {
      dragable.value.$el.style.transition = "all .25s ease";
      setTimeout(() => {
        dragable.value.$el.style.maxWidth = "60px";
      });
    } else {
      dragable.value.$el.style.maxWidth = "1000px";
      setTimeout(() => {
        dragable.value.$el.style.transition = "none";
      }, 250);
      expands.value.forEach((element) => {
        menuRef.value.open(element);
      });
    }
  }
);
const handleOpen = (c: string) => {
  const idx = expands.value.findIndex((index: string) => index === c);
  if (idx === -1) {
    expands.value.push(c);
  }
};
const handleClose = (c: string) => {
  const idx = expands.value.findIndex((index: string) => index === c);
  if (idx !== -1) {
    expands.value.splice(idx, 1);
  }
};
</script>
<style lang="scss">
.logo-name {
  white-space: nowrap;
  overflow: hidden;
  margin: 0 10px;
  color: #eee;
}

.logo {
  width: 28px;
  margin-left: 6px;
}
.home-navbar {
  height: 100%;
  box-shadow: 0 1px 4px rgb(255, 255, 255, 0.7);
  // border-right: 1px solid var(--el-border-color-light);
  max-width: 1000px;
}
.home-h {
  flex-wrap: nowrap;
  height: 64px;
  position: relative;
}
.navbar-list {
  height: calc(100% - 64px);
  .el-scrollbar__view {
    padding-bottom: 40px;
  }
}
.el-menu {
  border-right: none;
}
.el-menu-vertical-demo.el-menu--collapse {
  width: 60px;
  min-height: 400px;
}
.home-p {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
}
.logo-enter-active,
.logo-leave-active {
  transition: all 0.25s ease;
}

.logo-enter-from,
.logo-leave-to {
  opacity: 0;
}
.loading {
  pointer-events: auto;
  cursor: not-allowed;
  .el-menu {
    pointer-events: none;
  }
}
</style>
