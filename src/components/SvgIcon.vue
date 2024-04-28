<template>
  <svg class="svg-icon" aria-hidden="true" :style="{width: size? size+'px':'', height: size? size+'px':''}">
    <use :xlink:href="'#icon-' + icon"></use>
  </svg>
</template>

<script lange="ts" setup>
defineOptions({
  name: "SvgIcon",
});
defineProps({
  size: {
    type: [String, Number],
    default: ''
  },
  icon: {
    type: String,
    required: true,
  },
});
</script>

<style scoped lang="scss">
.svg-icon {
  width: 20px;
  height: 20px;
  overflow: hidden;
  vertical-align: -0.15em;

  use {
    fill: currentColor;
  }
}
</style>
