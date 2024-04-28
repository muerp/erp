<template>
  <div class="home-content">
    <router-view v-slot="{ Component, route }">
      <transition name="slide">
        <component :is="Component" :key="route.path"></component>
      </transition>
    </router-view>
  </div>
</template>
<style lang="scss">
.home-content {
  width: 100%;
  height: calc(100% - var(--header-height) - var(--tags-height));
  overflow: hidden;
}
.slide-enter-from,
.slide-leave-to {
  transform: translateX(20px);
  opacity: 0;
}
.slide-enter-to,
.slide-leave-from {
  opacity: 1;
}
.slide-enter-active {
  transition: all 0.7s ease;
}
.slide-leave-active {
  transition: all 0.3s cubic-bezier(1, 0.6, 0.6, 1);
}
</style>
