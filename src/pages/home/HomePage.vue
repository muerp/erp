<template>
  <el-row class="no-wrap w-full h-full">
    <home-navbar v-model:isCollapse="isCollapse" />
    <div class="flex-1 overflow-hidden">
      <home-header v-model:isCollapse="isCollapse" :breadcrumbs="breadcrumbs" />
      <home-tags />
      <home-content />
    </div>
  </el-row>
</template>
<script lang="ts" setup>
import { defineComponent, ref, watch } from "vue";

import HomeHeader from "./components/HomeHeader.vue";
import HomeNavbar from "./components/HomeNavbar.vue";
import HomeContent from "./components/HomeContent.vue";
import HomeTags from "./components/HomeTags.vue";
import { store } from "../../store/useNavStore";
defineComponent({
  components: {
    HomeHeader,
    HomeNavbar,
    HomeContent,
    HomeTags
  },
});
const isCollapse = ref(false);
const breadcrumbs = ref([]);

watch(()=>store.curNav, ()=> {
  window.document.title = store.curNav.title;
  const c = [];
  if (store.curNav.path !== '/') {
    c.push(store.curNav)
  }
  let p = store.curNav.parent;
  while(p) {
    c.push(p);
    p = p.parent;
  }
  breadcrumbs.value = c.reverse();
})

</script>
