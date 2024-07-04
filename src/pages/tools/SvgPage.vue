<template>
  <div class="page svg-page w-full h-full">
    <el-upload
      class="upload-demo"
      drag
      :auto-upload="false"
      accept="image/svg+xml"
      :on-change="onChange"
      :show-file-list="false"
    >
      <el-icon class="el-icon--upload"><upload-filled /></el-icon>
      <div class="el-upload__text">Drop file here or <em>click to upload</em></div>
      <template #tip>
        <div class="el-upload__tip">svg files with a size less than 500kb</div>
      </template>
      <template #file="{ file }">
        {{ file.name }}
      </template>
    </el-upload>
    <div v-if="base64" class="d-flex">
        <img class="svg-img" :src="base64">
    </div>
    <el-button class="mt-2" type="primary" @click="onToBase64" :disabled="!base64"
      >转base64</el-button
    >
    <div class="svg-result mt-2" v-if="base64Result">
      <el-text v-clipboard:copy="base64Result">{{ base64Result }}</el-text>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref } from "vue";
import { svgToBase64 } from "../../utils";
const base64 = ref("");
const base64Result = ref("");
const onChange = async (f: any) => {
  base64.value = await svgToBase64(f.raw);
};
const onToBase64 = () => {
    base64Result.value = base64.value;
}
</script>
<style lang="scss">
.svg-page {
  padding: 16px;
  overflow: auto;
  .svg-img {
    padding: 10px;
    width: 80px;
  }
}
.svg-result {
  border: 1px solid #999;
  min-height: 20rem;
  border-radius: 4px;
  overflow: auto;
  word-break: break-all;
  padding: 10px;
}
</style>
