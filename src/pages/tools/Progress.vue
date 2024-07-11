<template>
  <div class="progress-bar">
    <div class="progress-bg">
      <div class="progress-percent" :style="{'width': percent+'%'}"></div>
    </div>
    <div class="progress-text d-center" v-if="text">
      {{text}}
    </div>
  </div>
</template>

<script>
export default {
  name: "ProgressBar",
  props: {
    percent: {type: [Number, String], default: 0},
    text: {type: String, default: ''}
  }
}
</script>

<style scoped>

</style>
