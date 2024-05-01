<template>
  <mu-dragable
    class="property-dashboard"
    direction="left"
    :init-width="300"
    :min-width="300"
  >
    <div class="pl-1 pt-1">属性</div>
    <div v-if="editorStore.curEditorItem && editorStore.curEditorItem.type === 'search'">
      <el-form :model="form"> 
        <el-form-item label="标签">
            <el-input v-model="editorStore.curEditorItem.data.label" placeholder="搜索标签"></el-input>
        </el-form-item>
        <el-form-item label="宽度">
            <el-input v-model="editorStore.curEditorItem.data.width" placeholder="搜索框宽度">
                <template #suffix>
                    %
                </template>
            </el-input>
        </el-form-item>
      </el-form>
    </div>
  </mu-dragable>
</template>
<script lang="ts" setup>
import { ref, watch } from "vue";
import { SeartFrameType } from "../../home/utils";
import { editorStore } from "./editStore";

const form = ref({});
watch(
  () => editorStore.curEditorItem,
  () => {
    console.log("-curEditorItem---", editorStore.curEditorItem);
  }
);
</script>
<style lang="scss">
.property-dashboard {
  overflow: auto;
  background-color: #000;
  .el-input__suffix {
    line-height: 26px;
  }
  .el-form-item {
    margin-top: 10px;
  }
}
</style>
